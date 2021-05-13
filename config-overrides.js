const {alias} = require('react-app-rewire-alias');

module.exports = override = (config) => {
    alias({
        "@views":'src/views',
        "@store":'src/store',
        "@utils":'src/utils',
        "@public":"public",
        "@root":"src/"
    })(config);

    return config;
}