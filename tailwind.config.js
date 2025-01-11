module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // This is correct for App Routes
    "./components/**/*.{js,ts,jsx,tsx}", // Optional, in case you have a components directory
    "./ui/**/*.{js,ts,jsx,tsx}", // UI components folder content
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#001A6E",
        // "dark-blue": "#303c6c",
        "hover-color": "#003B8C",
        "active-color": "#4d60ae",
        // "hover-color": "#074799",
        "hover-color-2": "#D4EBF8",
        "icon-color": "#E38E49",
      },
    },
  },
  plugins: [],
};
