const fs = require('fs');
let text = fs.readFileSync('backend/src/services/rag.service.js', 'utf8');
text = text.replace(/chunk\.answer \+ "[\s\S]*?"/, 'chunk.answer + "\\n\\n```" + chunk.code_lang + "\\n" + chunk.code + "\\n```"');
fs.writeFileSync('backend/src/services/rag.service.js', text);
