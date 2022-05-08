/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        '@vue/eslint-config-prettier',
        '@vue/eslint-config-typescript',
    ],
    env: {
        'vue/setup-compiler-macros': true,
    },
};
