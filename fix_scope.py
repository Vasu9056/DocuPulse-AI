with open('backend/src/services/vector.service.js', 'r') as f:
    text = f.read()

# Replace the scoring penalty block with nothing
old_penalty_block = """      // Scope match boost
      if (scope && scope !== 'all') {
        const normalizedScope = scope.replace('lib_', '');
        if (chunk.library === normalizedScope) {
          score += 0.50; // Strong boost for explicitly selected Target Doc
        } else {
          score -= 0.30; // Deprioritize other docs when user selected a specific doc
        }
      }"""
text = text.replace(old_penalty_block, "")

# Add strict filtering before mapping
old_candidates_line = "    let candidates = this.store;"
new_candidates_line = """    let candidates = this.store;
    
    // Strict Scope Filtering
    if (scope && scope !== 'all') {
      const normalizedScope = scope.replace('lib_', '');
      candidates = candidates.filter(chunk => chunk.library === normalizedScope);
    }"""
text = text.replace(old_candidates_line, new_candidates_line)

with open('backend/src/services/vector.service.js', 'w') as f:
    f.write(text)
