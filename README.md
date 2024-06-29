# water-jug-challenge

This project is bootstrapped by [aurelia/new](https://github.com/aurelia/new).

## Start dev web server

    npm start

## Build the app in production mode

    npm run build

It builds all files to dist folder. To deploy to production server, copy all the `dist/*` files to production root folder.

For example
```
dist/index.html
dist/foo.12345.js
```
Copy to production root folder
```
root_folder/index.html
root_folder/foo.12345.js
```

## Unit Tests

    npm run test

Run unit tests in watch mode.

    npm run test:watch


## Analyze webpack bundle

    npm run analyze

## Jug Water Challenge Solution
    This implementation of the Jug Water Challenge using a BFS approach efficiently finds all possible solutions to measure a specific amount of water using two jugs. The BfsService class encapsulates the logic and provides an easy-to-use interface for finding solutions.