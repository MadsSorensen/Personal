app.controller('main', function ($scope, $templateCache, $http, $rootScope) {
    $scope.$watch( function () {
            return $http.pendingRequests.length;
    }, function (item) {
        if (item > 0) {
        } else {

        }
        });
    $rootScope.appName = "TestApp";
    $scope.login = true;
    $rootScope.isLoggedIn = localStorage.getItem('access_token') != undefined;
    //Login
    $scope.loginInfo = {};
    $scope.isLoginFail = false;
    $scope.loginError = "";
    //Login END
    //Signup
    $scope.isRegistered = false;
    $scope.registerInfo = {};
    $scope.register = function (isLogin) {
        $scope.login = isLogin;
    };

    //Login
    $scope.loginFunc = function () {
        var data =  'username=' + $scope.loginInfo.username;
        data += '&password=' + $scope.loginInfo.password;
        data += '&grant_type=password';
        console.log(data);
        $http({
            url: 'http://api.bronr.dk/authtoken',
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: data,
        })
            .then(function (response) {
                console.log(response);
                localStorage.setItem("access_token", response.data.access_token);
                $rootScope.isLoggedIn = true;
            }).catch(function (response) {
                $scope.isLoginFail = true;
                $scope.loginError = response.data.error_description;
        })
    }
    //Login END
    //Signup
    $scope.signupFunc = function () {
        var data = $scope.registerInfo;
        $http({
            url: 'http://api.bronr.dk/api/account/signup',
            method: 'POST',
            contentType: 'application/json',
            headers: { 'content-type': 'application/json' },
            data: data,
        })
            .then(function (response) {
                if (response.status == 200) {
                    $scope.login = true;
                    $scope.isRegistered = true;
                }
                console.log(response);
            }).catch(function (response) {

            })
    }
});