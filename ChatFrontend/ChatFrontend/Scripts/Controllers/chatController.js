app.controller('chat', function ($scope) {
    $scope.init = false;
    $scope.enter = function (event) {
        if (event.which === 13) {
            $scope.submit();
            $scope.entry = "";
        }
    }
    $scope.$on("loginEvent", function () {
        $scope.init = true;
    });
});