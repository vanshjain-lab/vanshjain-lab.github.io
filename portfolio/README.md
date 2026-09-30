# Portfolio

A modern, responsive portfolio built with plain HTML, CSS and JavaScript. No build step needed.

## Customise it

1. **`index.html`** – replace "Your Name", the role, projects, skills, experience and contact links.
2. **`style.css`** – change colours in the `:root` block at the top (`--accent` is the main brand colour).
3. **`script.js`** – you shouldn't need to edit this.
4. Add your résumé as `resume.pdf` in the same folder (or remove the link).

## Host it on GitHub Pages

1. Create a new repository on GitHub. For a personal site, name it `your-username.github.io`.
2. Upload all the files in this folder (`index.html`, `style.css`, `script.js`, `README.md`).
   Or from a terminal:
   ```bash
   git init
   git add .
   git commit -m "Add portfolio"
   git branch -M main
   git remote add origin https://github.com/your-username/your-username.github.io.git
   git push -u origin main
   ```
3. Open the repository on GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select **main** and **/ (root)**, then click **Save**.
5. Wait a minute or two. Your site will be live at `https://your-username.github.io`.

If you named the repository something else (like `portfolio`), the site will be at
`https://your-username.github.io/portfolio/`. The links in this project are relative, so it works either way.
