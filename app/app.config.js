var userRegistrationApp = angular.module('userRegistrationApp',['ngMessages','ui.router']);
userRegistrationApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/userRegistration');

    $stateProvider
        .state('registration', {
            url: '/userRegistration',
            templateUrl: 'templates/user-registration.html',
            controller: 'UserRegistrationCtrl'
        })
        .state('usersList', {
            url: '/usersList',
            templateUrl: 'templates/user-list.html',
            controller:'UserList'
        })
});

userRegistrationApp
    .controller('UserRegistrationCtrl',['$scope','$http','$timeout',function userRegistration($scope, $http, $timeout){

        $scope.testingTypes = ['Web','API','Mobile'];
        $scope.saveData = function() {
            $http.post('http://localhost:8080/user-registration/addUser', this.newTodo)
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

userRegistrationApp
    .controller('UserList',['$scope','$http',function userList($scope,$http){
        $scope.getData = function() {
           var viewValue = $scope.search;
            return $http.get('http://localhost:8080/user-registration/emailId/'+viewValue+'').then(
                function(response) {
                    $scope.users = response.data;
                }, function(errResponse) {
                    console.error('Error while fetching data');
                });
        };
    }]);

userRegistrationApp
    .directive('userExist', function($http, $q) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.userExist = function(modelValue, viewValue) {
                return $http.get('http://localhost:8080/user-registration/emailId/'+viewValue+'')
                    .then(
                        function(response) {
                            console.log(response.data);
                            if (response.data.length >= 1) {
                                scope.backendError  = "Email Already Exists";
                                return $q.reject();
                            } else {
                                scope.backendError = "";
                            }
                            return true;
                        }
                    );
            };
        }
    };
});

