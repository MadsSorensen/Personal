var app = angular.module('chat', []);
app.controller('main', function ($scope) {
    $scope.entry = "";
    $scope.appName = "Angular chat";
    $scope.messages = [];
    $scope.name = prompt("What is your name");
    var chat = $.connection.chatHub;
    console.log("starting connection!");
    $.connection.hub.start().done(function () {
        $scope.submit = function () {
            chat.server.send($scope.name, $scope.entry);
        }
    });
    chat.client.recieveMessage = function (name, message) {
        console.log(message);
        var htmlMessage = generateMessage(name, message);
        $scope.messages.push(htmlMessage);
        $scope.$apply();
    }
    function generateMessage(name, message) {
        var object = { name: name, message: message };
        console.log(object);
        return object;
    };
});