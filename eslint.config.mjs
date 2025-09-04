// eslint.config.mjs
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
    {
        ignores: ['.nuxt/**', '.output/**'],
        rules: {
            // Esta es la que añadimos antes para silenciar el warning del nuxt.config.*
            'import/no-unused-modules': 'off',
            // ❌ No pongas 'typo/typo' aquí; ese plugin no está instalado
        },
    },
    // Opcional: nuxt.config.* no se “importa”, por eso lo silenciamos también
    {
        files: ['nuxt.config.*'],
        rules: { 'import/no-unused-modules': 'off' },
    },
])
