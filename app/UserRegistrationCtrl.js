angular.module('userRegistrationApp',['ngMessages','ui.router'])
    .controller('UserRegistrationCtrl',['$scope','$http','$timeout',function userRegistration($scope, $http, $timeout){
        var self = this;
        $scope.saveData = function() {
            $http.post('http://localhost:8080/user-registration', this.newTodo)
                .then(function(response) {
                    $scope.newTodo = {};
                    $scope.successTextAlert = "Some content";
                    $scope.showSuccessAlert = true;
                    $timeout(function ()
                    {
                        $scope.$apply(function()
                        {
                            $scope.showSuccessAlert = false;
                        });
                    }, 2000);
                });
            $scope.userForm.$setPristine();
            $scope.userForm.$setUntouched();
            $scope.userForm.$submitted = false;

        };
        // switch flag
        $scope.switchBool = function (value) {
            $scope[value] = !$scope[value];
        };

    }]);