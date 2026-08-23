const axios = require('axios');
const vectorService = require('./vector.service');
const config = require('../config');

class RagService {
  async processQuery({ query, scope }) {
    if (!query || query.trim() === '') {
      throw new Error('Query string cannot be empty');
    }

    const topChunks = vectorService.searchSimilar(query, scope, 2);
    const primaryChunk = topChunks[0];

    // Build Verified Citations
    const citations = topChunks.map(chunk => ({
      title: `${chunk.library_name} • ${chunk.title}`,
      score: `${(chunk.cosine_score * 100).toFixed(1)}% Match`,
      url: chunk.source_url,
      markdown: chunk.answer + "\n\n```" + chunk.code_lang + "\n" + chunk.code + "\n```",
      chunk_id: chunk.id
    }));

    let headline = primaryChunk.headline;
    let answer = primaryChunk.answer;
    let code = primaryChunk.code;
    let code_lang = primaryChunk.code_lang;

    // Call live Gemini API if key is present in environment config
    const geminiKey = config.ai.geminiApiKey;
    if (geminiKey && geminiKey.length > 5) {
      try {
        const contextText = topChunks.map(c => `Source: ${c.library_name} (${c.title})\nContent:\n${c.answer}\nCode Sample:\n${c.code}`).join('\n\n');
        
        const systemPrompt = `You are DocuPulse AI, an expert technical copilot. 
Answer the user's question strictly based ONLY on the provided scraped documentation context. 
If the context does not contain the answer, reply with the best accurate default documentation info, but highlight that it is not in the context.
Return your response STRICTLY as a valid JSON object matching this schema:
{
  "headline": "A short 4-8 word title summarizing the query",
  "answer": "A detailed explanation of the solution based strictly on the context, formatted in clean markdown",
  "code": "The complete, correct code block or commands",
  "code_lang": "The programming language of the code (e.g. javascript, typescript, python, bash)"
}
Return only the raw JSON. Do not wrap it in markdown code block markers.`;

        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiKey}`,
          {
            contents: [
              {
                parts: [
                  { text: `${systemPrompt}\n\n[CONTEXT]\n${contextText}\n\n[USER QUESTION]\n${query}` }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.2,
              responseMimeType: "application/json"
            }
          },
          { timeout: 15000 }
        );

        const geminiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (geminiText) {
          const parsed = JSON.parse(geminiText.trim());
          if (parsed.headline) headline = parsed.headline;
          if (parsed.answer) answer = parsed.answer;
          if (parsed.code) code = parsed.code;
          if (parsed.code_lang) code_lang = parsed.code_lang;
        }
      } catch (err) {
        console.error('[RagService] Gemini Live API call failed, using local fallback:', err.message);
      }
    }

    return {
      status: 'success',
      query,
      headline,
      answer,
      code_lang,
      code,
      citations,
      confidence_score: primaryChunk.cosine_score,
      source_library: primaryChunk.library
    };
  }
}

module.exports = new RagService();
