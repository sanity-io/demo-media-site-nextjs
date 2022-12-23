module.exports = {
  '**/*.{js,jsx}': ['prettier --list-different', 'eslint'],
  '**/*.{ts,tsx}': [
    'prettier --list-different',
    'eslint',
    () => 'tsc --noEmit',
  ],
}
