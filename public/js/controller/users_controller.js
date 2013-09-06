'use strict';

var uid = 1;

function usersController($scope, $http) {

  $http({
    method: 'GET',
    url: '/api_users/atelier_users'
  }).success(function (data, status, headers, config) {
    $scope.users = data.users;      
    $scope.addAlert('success', data.users.length + ' utilizadores');
  }).error(function (data, status, headers, config) {
    $scope.addAlert('error', 'error - ' + status);
  });

  $scope.newuser = {};
  $scope.clearAlerts();
  
  $scope.save = function() {
      
      if($scope.newuser.id == null) {
        $scope.newuser.id = uid++;
        $scope.users.push($scope.newuser);

        $http({
          method: 'POST',
          url: '/api_users/add_user',
          data: $scope.newuser
        })
        .success(function (data, status, headers, config) {
          $scope.addAlert('success', 'ok - ' + status);
        })
        .error(function (data, status, headers, config) {
          $scope.addAlert('error', 'error - ' + status);
        });
      }
      else {

        for(var i in $scope.users) {
          if($scope.users[i].id == $scope.newuser.id) {
              $scope.users[i] = $scope.newuser;
              
              $http({
                method: 'POST',
                url: '/api_users/update_user',
                data: $scope.newuser
              })
              .success(function (data, status, headers, config) {
                $scope.addAlert('success', 'ok - ' + status);
              })
              .error(function (data, status, headers, config) {
                $scope.addAlert('error', 'error - ' + status);
              });
          }
        }         
      }
      $scope.newuser = {};
  }

  $scope.delete = function (id) {
      for (var i in $scope.users) {
          if ($scope.users[i].id == id) {
            //console.log($scope.users[i]);
            $http({
              method: 'POST',
              url: '/api_users/delete_user',
              data: {id: id}
            })
            .success(function (data, status, headers, config) {
              $scope.addAlert('success', 'ok - ' + status);
            })
            .error(function (data, status, headers, config) {
              $scope.addAlert('error', 'error - ' + status);
            });

            $scope.users.splice(i, 1);
            $scope.newuser = {};
          }
      }

  }

  $scope.edit = function (id) {
      for(var i in $scope.users) {
          if($scope.users[i].id == id) {
              $scope.newuser = angular.copy($scope.users[i]);
          }
      }
  }

  $scope.users_fields = function(items) {
    var result = {};
    var fields_to_show = ['id', 'user_login','user_email'];
    angular.forEach(items, function(value, key) {
        if (fields_to_show.indexOf(key) > -1) {
            result[key] = value;
        }
    });
    return result;
  }

}