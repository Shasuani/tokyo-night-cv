# Tokyo Night CV

An explorable CV. Instead of scrolling a page, you walk a character through a small neon-lit city where each building opens a section of the CV — experience, skills, education.

Built with Three.js and plain JavaScript, no framework.

> **Note:** the repository ships with **sample CV data** in `scripts/cv-data.js`
> (a fictional "Alex Chen"). Replace that file's contents with your own details
> before using this as your actual CV — the rendering is driven entirely from it.

## Built with

* Three.js — scene, lighting and camera
* Vanilla JavaScript, HTML and CSS
* A small Node server for local development

## Running it locally

```bash
npm install
node server.js
```

Then open the printed local URL.

## Structure

| File | Purpose |
| --- | --- |
| `scripts/scene.js` | Scene, lighting and renderer setup |
| `scripts/buildings.js` | City geometry, each building mapped to a CV section |
| `scripts/character.js` | Player movement and collision |
| `scripts/cv-data.js` | **CV content — replace with your own** |
| `scripts/main.js` | Bootstrapping and the animation loop |
