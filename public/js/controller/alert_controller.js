'use strict';

function alertController($scope) {    

	$scope.alerts = [];

	$scope.addAlert = function(alert_type, alert) {
		$scope.alerts.push({type: alert_type , msg: alert});
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

    $scope.clearAlerts = function() {
        $scope.alerts = [];
    };
}