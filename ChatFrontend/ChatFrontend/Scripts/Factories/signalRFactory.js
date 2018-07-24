app.factory('signalRFactory', ['$rootScope', function ($rootScope) {
    //var domainUrl = 'api.bronr.dk/signalr';
    var domainUrl = 'http://localhost:49689/signalr';
    var token;
    var chat;
    return {
        init: function () {
            token = localStorage.getItem('access_token');
            $.connection.hub.qs = { 'access_token': token  };
            $.connection.hub.url = domainUrl;
            chat = $.connection.chatHub;
            $.connection.hub.start({withCredentials: false}).done(function () {
                chat.server.register(localStorage.getItem('username'));
            });

            chat.client.recieveRegistration = function (message) {
                alert(message);
            }
            chat.client.notAuthenticated = function () {
                alert("You're not authenticated");
                $rootScope.logout();
                $rootScope.$apply();
            }
        },
        send: function (message) {
            chat.server.register(message);
        }
    }
}]);