export default [
    {
        files: ["assets/js/**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                setTimeout: "readonly",
                jQuery: "readonly",
                $: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "semi": ["error", "always"],
            "quotes": ["error", "single"]
        }
    }
];