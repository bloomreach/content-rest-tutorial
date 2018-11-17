'use strict';

var contentRestApp = angular.module('contentRestApp', [ 'ngRoute', 'ngResource' ]);

contentRestApp.constant('apiPrefix', 'http://localhost:8080/myproject/api/');

contentRestApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl : 'document-list.html',
    controller : 'DocumentsController'
  }).otherwise('/');
});

contentRestApp.factory('DocumentsService', function($resource, apiPrefix) {
  return {
    getList : function() {
      return $resource(apiPrefix + 'documents/', {}).get();
    }
  }
});

contentRestApp.controller('DocumentsController', function($scope, DocumentsService, apiPrefix) {

  DocumentsService.getList().$promise.then(function(response) {
    $scope.documents = response;
  });

});