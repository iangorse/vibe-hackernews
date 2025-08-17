# Vibe Hacker News

A modern, responsive Hacker News client for viewing and exploring top stories and comments.

## Features
- Top stories from Hacker News
- View top comment for each story
- Expand to view all comments and nested replies
- Material UI for beautiful, responsive design
- Multiple color themes (Classic, Fresh, Lavender, Dark)
- Theme selection via AppBar menu, with persistent setting
- Caching to respect Hacker News API limits
- Ready for deployment to GitHub Pages

## Getting Started
1. **Install dependencies:**
	```sh
	npm install
	```
2. **Run locally:**
	```sh
	npm run dev
	```
3. **Build for production:**
	```sh
	npm run build
	```
4. **Deploy to GitHub Pages:**
	```sh
	npm run deploy
	```

## Customization
- Change color themes in `src/theme.js`
- Add more settings or features in `src/App.jsx`

## License
MIT
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
