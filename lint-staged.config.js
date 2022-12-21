module.exports = {
  '**/*.{js,jsx}': ['npm run format:verify', 'eslint'],
  '**/*.{ts,tsx}': ['npm run format:verify', 'eslint', () => 'tsc --noEmit'],
}
