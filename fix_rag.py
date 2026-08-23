with open('backend/src/services/rag.service.js', 'r') as f:
    text = f.read()

text = text.replace(
    'markdown: chunk.answer,',
    'markdown: chunk.answer + "\\n\\n```" + chunk.code_lang + "\\n" + chunk.code + "\\n```",'
)

with open('backend/src/services/rag.service.js', 'w') as f:
    f.write(text)
