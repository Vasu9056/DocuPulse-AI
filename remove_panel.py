with open('frontend/src/App.jsx', 'r') as f:
    text = f.read()

import re
# Regex to remove the entire card containing "Vector embedding &amp; chunking"
text = re.sub(r'<div className="card" >\s*<h3 className="inspector-title" >Vector embedding &amp; chunking</h3>.*?</select></div>\s*<div className="field">.*?</div>\s*<div className="field">.*?</div>\s*<div className="field" >.*?</div>\s*</div>', '', text, flags=re.DOTALL)

with open('frontend/src/App.jsx', 'w') as f:
    f.write(text)
