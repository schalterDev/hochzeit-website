# Hochzeit Website
This project is devolped with the [**webpack-simple-starter**](https://github.com/SinanMtl/webpack-simple-starter)

## Getting Started
Be sure you have a up to date [node.js](https://nodejs.org/en/download/package-manager/) version

And of course you need [npm](https://docs.npmjs.com/getting-started/installing-node) installed

First, install the modules that the project needs.
```bash
$ npm install
```

Now, let's start developing.
```bash
$ npm run dev
```

Finally development process done. Let's export for production.
```bash
$ npm run build
```
and start the server
```bash
$ server/node index.js
```

That's it!. Files are ready to under the `dist/` directory for production.
The node.js server is linking to this files

## Data Directories
Geschenke sind in   `server/data/geschenke.json` gespeichert   
Kuchen sind in      `server/data/kuchen.json`    gespeichert   
Nachtische sind in  `server/data/nachtische.json` gespeichert   
Salate sind in      `server/data/salate.json`    gespeichert   

## What's in this project?

### Directories
There are four main directories in project. This directories like below:
```
build/		# Webpack configurations
config/		# Dev and prod configurations
dist/       # Files for production
server/     # node.js server
src/ 		# Project development files
|_ scripts/	# Javascript files
|_ styles/	# Style files (scss)
static/		# Static files (Like fonts, images)
```

### Used Frameworks
- Bootstrap and depended javascript frameworks like jquery. (Client)
- Babel.js for ES6 compile
- Sass for CSS

Also, this project is supporting hot reload

## License
This project is under the MIT license.
