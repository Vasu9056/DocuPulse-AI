/**
 * Vector Search & Semantic Similarity Service
 */
const { VECTOR_STORE } = require('../data/knowledgeBase');

class VectorService {
  constructor() {
    this.store = VECTOR_STORE;
  }

  /**
   * Search for top-K similar chunks based on cosine / keyword score and scope filtering
   */
  searchSimilar(query, scope = 'all', topK = 2) {
    const lowerQuery = (query || '').toLowerCase().trim();

    let candidates = this.store;

    let scored = candidates.map(chunk => {
      let score = 0.50;

      // Check keyword overlap
      const queryWords = lowerQuery.split(' ');
      if (chunk.similarity_keywords) {
        chunk.similarity_keywords.forEach(kw => {
          if (lowerQuery.includes(kw.toLowerCase()) || queryWords.includes(kw.toLowerCase())) {
            score += 0.15;
          }
        });
      }

      queryWords.forEach(word => {
        if (word.length > 2 && chunk.title.toLowerCase().includes(word)) {
          score += 0.10;
        }
      });

      // Exact library name match in query
      if (lowerQuery.includes(chunk.library) || lowerQuery.includes(chunk.library_name.toLowerCase())) {
        score += 0.25;
      }

      // Scope match boost
      if (scope && scope !== 'all') {
        if (chunk.library === scope) {
          score += 0.50; // Strong boost for explicitly selected Target Doc
        } else {
          score -= 0.30; // Deprioritize other docs when user selected a specific doc
        }
      }

      return {
        ...chunk,
        cosine_score: Math.min(0.996, Math.max(0.12, score))
      };
    });

    // Sort descending by calculated cosine score
    scored.sort((a, b) => b.cosine_score - a.cosine_score);

    return scored.slice(0, topK);
  }
}

module.exports = new VectorService();
