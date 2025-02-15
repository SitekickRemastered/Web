# Sitekick Remastered Website

Welcome to the repository for [Sitekick Remastered](https://sitekickremastered.com/)'s website! 

This website is made using [Docusaurus 3.7](https://docusaurus.io/).

## Software Needed
1. Git
1. [Node 22.13.0 or later](https://nodejs.org/en/download)
1. [VSCode](https://code.visualstudio.com/) (Recommended)

## Setting up your environment
1. Clone ```https://github.com/SitekickRemastered/Web.git``` 
1. Navigate into the `/Web/` directory
1. Run `npm i` to install dependencies
1. Use `npm start` to start the site
    - The site should run locally on http://localhost:3000/

## Note for Wiki Editors
If you're editing the wiki, the only folder you need is `/docs/`.

Each folder within `/docs/` will generate a category for the wiki, and inside you should have a `_category_.json` file. `_category_.json` only needs the following:
```json
{
  "label": "Chipendium", // The text that will appear on the sidebar of the wiki
  "position": 3          // The position in the sidebar the category will have
}
```

From there, you can create pages through an `.mdx` file.

`.mdx` is essentially markdown with a few more added features; specifically the ability to write JSX within the markdown files and render React components. You don't need JSX to create pages, but if you choose to create some components, please put them into `/src/components/Wiki/`.

You can read more about `.mdx` files on the [Docusaurus docs](https://docusaurus.io/docs/markdown-features/react).
