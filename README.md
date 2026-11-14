# Tala Cafe

A frontend-only Filipino cafe website built with React 18, Vite, and plain CSS. It features a peso-priced local menu, illustrated food artwork, interactive 3D cards, reviews, a gallery lightbox, and a client-side reservation form.

## Run locally

1. Install the **Node.js LTS** version from [nodejs.org](https://nodejs.org/). On Windows, you can also run `winget install OpenJS.NodeJS.LTS` in PowerShell.
2. Close and reopen PowerShell (or VS Code) so it picks up the Node.js PATH entry.
3. Check that Node.js and npm are available:

   ```powershell
   node -v
   npm -v
   ```

   If either command is still “not recognized,” restart your computer after installation or reinstall Node.js and ensure it is added to PATH.

4. In PowerShell, go to the project folder and install dependencies:

   ```powershell
   cd "C:\Users\Neil\OneDrive\Desktop\3d"
   npm install
   ```

5. Start the development server:

   ```powershell
   npm.cmd run dev
   ```

   Open the local URL printed by Vite, usually `http://localhost:5173/`. Press **Ctrl+C** in PowerShell to stop the server.

   If PowerShell says `npm.ps1 cannot be loaded because running scripts is disabled`, use `npm.cmd` instead of `npm` for these commands. For example, run `npm.cmd install` and `npm.cmd run dev`. This avoids changing PowerShell's execution policy.

## Build

Run `npm.cmd run build` to create the static site in `dist`. To inspect the production build locally, run `npm.cmd run preview`.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Accept the detected Vite settings (`npm run build` and `dist`).
4. Select **Deploy**. The included `vercel.json` also configures these settings.
