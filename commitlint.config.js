module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nueva funcionalidad
        'fix', // Corrección de bug
        'docs', // Documentación
        'style', // Formateo, sin cambios de código
        'refactor', // Refactoring de código
        'chore', // Mantenimiento
        'ci', // Cambios en CI/CD
        'build', // Cambios en build
        'revert', // Revertir cambios
      ],
    ],
    'subject-case': [2, 'never', ['upper-case']],
    'subject-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 200],
  },
};
