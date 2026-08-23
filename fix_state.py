import re

with open('frontend/src/App.jsx', 'r') as f:
    text = f.read()

# Replace useState for isAppActive
text = text.replace(
    'const [isAppActive, setIsAppActive] = useState(false);',
    'const [isAppActive, setIsAppActive] = useState(() => localStorage.getItem("isAppActive") === "true");'
)

# Replace useState for activeView
text = text.replace(
    "const [activeView, setActiveView] = useState('copilot');",
    'const [activeView, setActiveView] = useState(() => localStorage.getItem("activeView") || "copilot");'
)

# Insert useEffects right after the declarations
injection = """
  useEffect(() => {
    localStorage.setItem("isAppActive", isAppActive);
  }, [isAppActive]);

  useEffect(() => {
    localStorage.setItem("activeView", activeView);
  }, [activeView]);
"""
# Find the end of useState block to inject
pattern = r'(const \[diffCards, setDiffCards\] = useState\(\[\]\);)'
text = re.sub(pattern, r'\1\n' + injection, text)

with open('frontend/src/App.jsx', 'w') as f:
    f.write(text)
