# Vod-task

The project used [react-redux-saga-boilerplate](https://github.com/gilbarbara/react-redux-saga-boilerplate) to start with.

[Demo](https://cleoreo.github.io/vod-task/)

## How to start
    
    clone the project, and then run
    
    npm install
    npm start
    
    
## Project Structure
    assets
    build
    config
        |- config.js        // Api config is stored in here
        |- env.js
        |- paths.js
        |- webpack.confic.js
        |- webpackDevServer.js
    cypress
    node_modules
    src
    |- actions              // redux actions stored in here
    |- api                  // api call stored in here
        |- Fixtures         // store expexted api result json here, used for development
        |- Api.js           // real api call function stored in here
        |- index.js         // file to be imported when need to call api
    |- components
    |- constants
    |- modules
    |- reducers             // redux reducers stored in here
    |- routes               // store containers of each pages
        |-index.js          // routes paths is stored in here              
    |- sagas                // sagas stored in here
    |- store                // redux store
        |- index.js         // persist config can be changed in here
    |- vendor               // modernizer
    tools                   // build tools
    package.json


### Remarks

