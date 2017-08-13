angular.module('userRegistrationApp',['ngMessages','ui.router'])
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
