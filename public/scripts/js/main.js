var app = angular.module('app', []);

app.directive('tweetDirective', function() {
  return {
    restrict: 'A',
    templateUrl: './templates/tweets.ejs',
    transclude: true
  }
});

app.factory('httpFactory', function($http) {

    

    // return this.getTweets();
      // $http({
      //   method: 'GET',
      //   url: '/api/getTweets'
      // }).then(function sucess(res) {
      //   console.log('heres ya data bitch!', res.data);
      //   return res.data;
      // }, function error(res) {
      //   console.error('ya got an error bitch!', res.error);
      //   // return res.error;
      // });
    // }
});

app.controller('MainController', ['$scope', '$http', function($scope, $http) {
  $scope.siteTitle = 'Tweet Sniffer';

  $scope.getTweets = function() {
    $http({
        method: 'GET',
        url: '/api/getTweets'
      }).then(function success(res) {
        // console.log('heres ya data bitch!', res.data);
        return $scope.siteData = res.data;
      }, function error(res) {
        console.error('ya got an error bitch!', res.error);
        return $scope.siteData = res.error;
      });
  };

  $scope.getTweets();

  console.log($scope.siteData);
}]);

