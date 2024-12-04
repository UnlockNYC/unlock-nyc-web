<img src="https://cdn.glitch.me/dee07edd-bb63-4ffa-a606-d074a910b9c4%2FunlockSmall.png?v=1633719693017" alt="unlock nyc logo">

**welcome!** Unlock NYC builds digital tools to make the apartment search process transparent, fair, and free from discrimination for all New Yorkers. 

🤖🏡 This project hosts our main website.

---

### platforms

- **front-end/CMS:** we use [Tina](https://tina.io/) to edit content in Markdown files. Any changes in Tina are automatically committed to this repo.

- **deployment/hosting:** we use [Netlify](https://netlify.com) to serve the website over the net - it's automatically set up to trigger a build whenever anything in this repo changes.

- **static site generator:** this site is built with [11ty](https://www.11ty.dev/)!

- **images/content CDN:** we use [Digital Ocean Spaces](https://www.digitalocean.com/products/spaces) as object storage.

- **functions:** we use Netlify functions to authenticate advocates who have logins and are reporting on behalf of others, and to connect the Tina CMS Media Manager to Digital Ocean. 

### project structure

- in the`_includes` folder, you'll find all the site's template files, written in [Nunjucks](https://mozilla.github.io/nunjucks/).  When 11ty runs, it uses these files to generate HTML pages and stores them in a folder called `build.` You won't see the `build` folder in this repo! It's generated every time 11ty runs, and hidden via the `.gitignore` file.

- the rest of the `.md` files hold the content and metadata, either pulled from various places (for example, the `bios` collection holds content that gets displayed on the About page, via the `about.njk` template) or simply from the root folder. 11ty takes any Markdown file and turns it into a folder with a corresponding `index.html`. For example, `press.md` turns into a folder (`/press`) with an index (`/press/index.html`) inside it, so that the URL `https://weunlock.nyc/press` works.

- the `public/styles` folder holds `site.css` - other css files are inside the `_includes` folder, so that they can be pulled onto specific pages via Nunjuck templates.

- `.eleventy.js` is the 11ty configuration file - it sets the output folder to `build`, and allows for the `styles` and `scripts` folders to be bundled into the output folder too so we can use them.

- `tina/config.ts` is the Tina configuration file, for building out the schema of the CMS.
 
### installation & contributing

- to work on the site locally, download the code and in the root folder run:
  ```
  npm install
  npx tinacms dev -c "npx @11ty/eleventy --serve"
  ```
  This should give you both Tina CMS and the 11ty site on a `localhost`.

- **remember**  to run `git pull` before trying to push code to a new branch on the github!

- also remember, any `push` to the `main` branch on the github will trigger a Netlify deploy and change the site. to preview first, upload to another branch and make a pull request.

- note: the deploy previews & checks in Github rarely pass, even when the project builds locally and in Netlify

- having issues with TinaCMS build? check out their [Discord](https://discord.com/invite/tina-835168149439643678), it can be helpful!

### documentation you might want to read

- [Tina documentation](https://tina.io/docs/) - for configuring the CMS

- [11ty documentation](https://www.11ty.dev/docs/config/) - there's so much here, if you go digging! 

### fun tools you might need

🛠 feel free to add to this list!

### 🤖✊thanks!
