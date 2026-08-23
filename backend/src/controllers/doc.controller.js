const { DOC_LIBRARIES } = require('../data/knowledgeBase');

exports.getDocStores = (req, res, next) => {
  res.json({
    status: 'success',
    total_chunks: 18420,
    libraries: DOC_LIBRARIES
  });
};
