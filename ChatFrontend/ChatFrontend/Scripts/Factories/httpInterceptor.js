$provide.factory('httpIntercepter', function ($q, dependency1, dependency2) {
    return {
        'request': function (config) {
            console.log(config);
            return config;
        },
        'requestError': function (rejection) {
            console.log("wtf");
        }
    }
}