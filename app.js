'use strict';

var hippoRestApp = angular.module('hippoRestApp', [ 'ngRoute', 'ngResource' ]);

hippoRestApp.constant('apiPrefix', 'http://localhost:8080/site/api/');

hippoRestApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl : 'document-list.html',
    controller : 'DocumentsController'
  }).otherwise('/');
});

hippoRestApp.factory('DocumentsService', function($resource, apiPrefix) {
  return {
    getList : function() {
      return $resource(apiPrefix + 'documents/', {}).get();
    }
  }
});

hippoRestApp.controller('DocumentsController', function($scope, DocumentsService, apiPrefix) {

  DocumentsService.getList().$promise.then(function(response) {
    $scope.documents = response;
  });

});