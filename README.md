# react-movie-db
A react app showing a list of movies currently in theater, powered by The Movie Database API

## About

This app use [create-react-app](https://github.com/facebook/create-react-app).  
Don't hesitate to check their documentation if needed.

## Install

````
npm install
````

### Configure environment variable

Copy `src/environments/config.js.sample` to a new `src/environment/config.ts` file.  
Then set `MOVIE_DB_API_KEY` with your The Movie Database key.

[More information](https://developers.themoviedb.org/3/getting-started/authentication) on getting a key.

## Local development

````
npm run start
````

## Test

````
npm run test
````

## Build

````
npm run build
````

## Deploy on github

If you use a github repo for this project the deploy script use the [gh-pages](https://www.npmjs.com/package/gh-pages) package.  
Making it seamless to deploy on github pages.

````
npm run deploy
````

## Live version

[https://enterthusiast.github.io/react-movie-db/](https://enterthusiast.github.io/react-movie-db/)

## TODO

### features
- More Movie DB functionnalities (Search, Authentification, TV, People, Discover, etc)
- Color on percentage for easier reading
- Better trailer integration instead of jumping to youtube
- Denser layout on big screen
- Picture of cast members
- A full detail view, with information about crew members, full cast, etc

### code
- Split the code into more components (Movie Info, Overview, Cast, etc)
- Add a Router and make it easier to share a page or a movie details url
- Cache API configuration in local storage
- Less display logic in components
- Test with React Context
- More mocking to remove dependencies between tests
- More tests, improve coverage

## Code design choices

App.js supervises and centralizes the state and data logic of the whole app.  
movieService.js allows hte application to communicate with The Movie DB.  
Finally the components display the information and use small bits of display logic; mostly for error recovery or filtering.

## Troubleshot

I found some inconsistencies in page totals throughout the database.  
Jumping to the last page give a response with a different page total than the one given on the first page for example.