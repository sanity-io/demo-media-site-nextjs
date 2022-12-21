module.exports = {
  '**/*.{js,jsx}': [
    'prettier --list-different --ignore-path .gitignore .',
    'eslint',
  ],
  '**/*.{ts,tsx}': [
    'prettier --list-different --ignore-path .gitignore .',
    'eslint',
    () => 'tsc --noEmit',
  ],
}
