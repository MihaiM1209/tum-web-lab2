# Lab 4 - Static Site Generator & Git CMS

NEDispatch landing page migrated to a JAMstack workflow with a Static Site Generator and Git-based CMS.

## Stack

- SSG: Eleventy (11ty)
- Git CMS: Decap CMS
- CSS framework from Lab 3: TailwindCSS (CDN) plus existing custom CSS
- Deployment target: Netlify (`_site` publish directory)

## Project Structure

- `src/index.njk` - landing page template
- `src/_data/site.json` - structured editable site content
- `admin/index.html` - Decap CMS entry page
- `admin/config.yml` - CMS schema and editable fields
- `netlify.toml` - build/publish config
- `_site/` - generated static output from Eleventy

## Run Locally

```bash
npm install
npm run start
```

Local URLs:

- Site: `http://localhost:8080`
- CMS: `http://localhost:8080/admin`

## Build

```bash
npm run build
```

This generates the static site into `_site`.

## CMS Editing

Most page content is editable via Decap CMS, including:

- SEO metadata (title, description, social tags)
- Brand text and favicon path
- Navigation labels
- Section labels and titles
- Hero, about, services, testimonials, trust strip, gallery, FAQ
- Contact details and contact form placeholders/button text
- CTA strip, sticky CTA, mascot text, footer

Content source edited by CMS:

- `src/_data/site.json`

## Lab 4 Requirement Coverage

- Landing page migrated to SSG: Yes (Eleventy)
- Git-based CMS integrated: Yes (Decap CMS)
- Lab 3 CSS framework integrated: Yes (TailwindCSS CDN in template)
- As much content as possible editable via CMS: Yes (expanded schema and template bindings)
- Live deployment: Configured for Netlify via `netlify.toml`
- Decent git history: Multiple incremental commits across labs and lab4 migration

## Live Demo

- Netlify URL: add your deployed link here
