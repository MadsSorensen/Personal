app.controller('chat', function ($scope, $rootScope, signalRFactory) {
    signalRFactory.init();
    $scope.enter = function (event) {
        if (event.which === 13) {
            $scope.submit();
            $scope.entry = "";
        }
    }
    $scope.submit = function () {
        signalRFactory.send();
    }
    $scope.logout = function () {
        localStorage.removeItem('access_token');
        $rootScope.isLoggedIn = false;
    }
});