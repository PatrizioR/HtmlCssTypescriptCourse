module.exports = {
    content: [
        "./**/*.html",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require('@tailwindcss/line-clamp'),
        require("tailwind-scrollbar")
    ],
}
