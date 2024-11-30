# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

--- Project Details ---

1. Project setup and installation instructions.

- First, you need to download the project from the provided Git URL.
- Then, open the project in VS Code and run the command "npm i" in the terminal. This will download all the necessary Node modules and packages required for the project.
- After the installation, you need to start the JSON server for the user mock API first.
- Then, to start the project, run the command "npm run dev" in the terminal. This will launch the project.

2. Description of the project structure.

- The application pages for this project are located in the pages folder.
- The images and SVGs used in the project are located in the assets folder.
- Some components used in the pages are located in the components folder.
- I created a redux folder for state management to handle data and manage API calls using middleware.
- Create some HOC functions to reuse common logic across components.
- In the public folder, there is a locales folder containing a collection of multiple language files used in the project. These files are integrated with i18n.js to handle internationalization within the project.

3. Explanation of implemented features.

- In the Dashboard page, display cards to represent data and show a chat to present information.
- The Project page displays project data in a table format and allows performing CRUD operations on the project data. It also includes options for filtering the project table.
- The Estimates page displays estimates data with CRUD operations. It also includes functionality for "Add New Estimate" and "Edit Estimate," as outlined in the provided document.

4. Instructions for running the mock API.

- First in VSCode of project terminal install "npm install -g json-server"
- For use mock API in terminal write "json-server --watch db.json --port 5000" for start json server.

5. Notes on design choices and any other relevant information.

- I have some confusion regarding the Estimates page UI design as per the Figma file provided.
- I think the Figma design for the Estimates table, which shows data in a table format, does not match with the Estimates add and edit form. I have some confusion regarding that page.
- However, I need to perform CRUD operations on the Estimates data and implement the functionality for "Add New Estimate" and "Edit Estimate," as mentioned in the document.
