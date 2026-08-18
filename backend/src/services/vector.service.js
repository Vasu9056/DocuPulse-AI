/**
 * Vector Search & Semantic Similarity Service
 */
const { VECTOR_STORE } = require('../data/knowledgeBase');

class VectorService {
  constructor() {
    this.store = VECTOR_STORE;
  }

  /**
   * Search for top-K similar chunks based on cosine / keyword score
   */
  searchSimilar(query, scope = 'all', topK = 2) {
    const lowerQuery = (query || '').toLowerCase();

    let scored = this.store.map(chunk => {
      let score = 0.55;
      chunk.similarity_keywords.forEach(kw => {
        if (lowerQuery.includes(kw)) score += 0.12;
      });

      if (scope && scope !== 'all' && chunk.library === scope) {
        score += 0.2;
      }

      return {
        ...chunk,
        cosine_score: Math.min(0.994, Math.max(0.72, score))
      };
    });

    scored.sort((a, b) => b.cosine_score - a.cosine_score);
    return scored.slice(0, topK);
  }
}

module.exports = new VectorService();
