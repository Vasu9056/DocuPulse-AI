/**
 * RAG Controller
 */
const ragService = require('../services/rag.service');
const vectorService = require('../services/vector.service');

exports.handleRagQuery = async (req, res, next) => {
  try {
    const { query, scope } = req.body;
    const result = await ragService.processQuery({ query, scope });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Failed to process RAG query' });
  }
};

exports.handleVectorSearch = async (req, res, next) => {
  try {
    const { query } = req.body;
    const results = vectorService.searchSimilar(query, 'all', 2).map(chunk => ({
      chunk_id: chunk.id,
      title: chunk.title,
      url: chunk.source_url,
      cosine_score: chunk.cosine_score.toFixed(3),
      preview: chunk.markdown.substring(0, 140) + '...'
    }));

    res.json({ status: 'success', results });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Failed to inspect vector chunks' });
  }
};
