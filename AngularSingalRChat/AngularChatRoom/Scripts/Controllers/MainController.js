var app = angular.module('chat', []);
app.controller('main', function ($scope) {
    $scope.entry = "";
    $scope.appName = "Bronr chat";
    $scope.messages = [];
    $scope.name = prompt("What is your name");
    $scope.enter = function (event) {
        if (event.which === 13) {
            console.log(event);
            $scope.submit();
            $scope.entry = "";
        }
    }
    var chat = $.connection.chatHub;
    chat.client.recieveMessage = function (name, message) {
        var htmlMessage = generateMessage(name, message);
        $scope.messages.push(htmlMessage);
        $scope.$apply();
    }
    chat.client.newClient = function (name) {
        var htmlMessage = clientChange(name, true);
        $scope.messages.push(htmlMessage);
        console.log($scope.messages);
        $scope.$apply();
    }
    chat.client.clientLeft = function (name) {
        var htmlMessage = clientChange(name, false);
        $scope.messages.push(htmlMessage);
        console.log($scope.messages);
        $scope.$apply();
    }
    console.log("starting connection!");
    $.connection.hub.start().done(function () {
        chat.server.register($scope.name);
        $scope.submit = function () {
            chat.server.send($scope.name, $scope.entry);
        }
    });
    function generateMessage(name, message) {
        var object = { time: getCurrentTime(), name: name, message: message, isChat: true };
        console.log(object);
        return object;
    };

    function clientChange(name, isNew) {
        var object = { time: getCurrentTime(), name: "", message: name + " has " + (isNew ? "joined" :"left") + "!", isChat: false };
        return object;
    }

    function getCurrentTime() {
        return moment().format("YYYY/MM/DD HH:mm:ss");
    }
});