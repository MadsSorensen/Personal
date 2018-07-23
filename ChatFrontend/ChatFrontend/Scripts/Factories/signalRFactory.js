app.factory('signalRFactory', ['$rootScope', function ($rootScope) {
    //var domainUrl = 'api.bronr.dk';
    var domainUrl = 'http://localhost:49689/signalr';
    var token = localStorage.getItem('access_token');
    var chat;
    return {
        init: function () {
            $.connection.hub.qs = { 'access_token': token  };
            $.connection.hub.url = domainUrl;
            chat = $.connection.chatHub;
            $.connection.hub.start({withCredentials: false}).done(function () {
                chat.server.register(localStorage.getItem('username'));
            });

            chat.client.recieveRegistration = function (message) {

            }
        },
        send: function () {
            chat.server.register($rootScope.appName);
        }
    }
}]);