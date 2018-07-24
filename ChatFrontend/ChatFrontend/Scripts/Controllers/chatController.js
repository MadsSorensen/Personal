app.controller('chat', function ($scope, $rootScope, signalRFactory) {
    $scope.factoryInit = false;
    $scope.entry = "";
    $scope.enter = function (event) {
        if (event.which === 13) {
            $scope.submit();
        }
    }
    $scope.submit = function () {
        console.log($scope.entry);
        signalRFactory.send($scope.entry);
    }
    $rootScope.logout = function () {
        localStorage.removeItem('access_token');
        $rootScope.isLoggedIn = false;
    }
    $rootScope.$watch('isLoggedIn', function (val) {
        if (!$scope.factoryInit && val === true) {
            signalRFactory.init();
        }
    });
});