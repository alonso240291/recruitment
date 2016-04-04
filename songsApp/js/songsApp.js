angular.module('songsApp', [])
.controller('songsController', function($scope, $http) {

	$scope.getSongs = function(x) {
    	$http.get("http://localhost:3000/songs?q="+x).then(function (response) {
      		$scope.songsData = response.data;
  		});
  	};
    $scope.submit = function() {
        if ($scope.text) {
         	console.log('Searchng '+ $scope.text);
         	$scope.getSongs($scope.text);
        }else{
        	$scope.getSongs("");
        }
    };
	$scope.getSongs('');
  
  
})
.config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(spotify):/);
    }
])
.filter('capitalize', function() {
  return function(input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
   }
});
