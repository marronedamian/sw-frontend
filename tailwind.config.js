
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'starwars-yellow': '#FFE81F',
                'starwars-black': '#000000',
                'starwars-gray': '#333333',
                'starwars-light-gray': '#a3a3a3',
                'starwars-blue': '#00A2FF',
            },
            fontFamily: {
                'star-wars': ['"Star Wars"', 'sans-serif'],
            },
            backgroundImage: {
                'stars': "url('/stars-bg.jpg')",
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: 0 },
                    '100%': { transform: 'translateY(0)', opacity: 1 },
                },
            },
        },
    },
    plugins: [],
}