import re

with open('frontend/src/App.jsx', 'r') as f:
    text = f.read()

# Pattern to remove the entire right panel
pattern = r'<div className="inspector-panel">.*?<h3 className="inspector-title" >Vector embedding &amp; chunking</h3>.*?</div>\s*</div>'

# We just want to remove the specific inspector-panel for vector embeddings.
# Let's find it safely.
start_str = '<div className="inspector-panel">\n                  <h3 className="inspector-title" >Vector embedding &amp; chunking</h3>'
end_str = '</div>\n              </div>\n            </div>\n\n          </div>'

if start_str in text:
    # Just cut it out manually using string splitting if regex is tricky due to newlines
    part1, rest = text.split(start_str, 1)
    # find the next </div>\n              </div>
    part2 = rest.split('</div>\n              </div>\n            </div>', 1)[1]
    
    new_text = part1 + '</div>\n            </div>' + part2
    with open('frontend/src/App.jsx', 'w') as f:
        f.write(new_text)
    print("Removed vector embedding panel.")
else:
    print("Could not find the exact string.")
