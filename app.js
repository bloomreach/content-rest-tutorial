'use strict';

var contentRestApp = angular.module('contentRestApp', [ 'ngRoute', 'ngResource', 'ngSanitize' ]);

contentRestApp.constant('apiPrefix', 'http://localhost:8080/myproject/api/');

contentRestApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl : 'document-list.html',
    controller : 'DocumentsController'
  }).when('/:uuid', {
    templateUrl : 'detail.html',
    controller : 'DocumentsController'
  }).otherwise('/');
});

contentRestApp.factory('DocumentsService', function($resource, apiPrefix) {
  return {
    getList : function() {
      return $resource(apiPrefix + 'documents/', {}).get();
    },
    getDocumentById : function(uuid) {
      return $resource(apiPrefix + 'documents/' + uuid).get();
    }
  }
});

contentRestApp.controller('DocumentsController', function($scope, $routeParams, DocumentsService, apiPrefix) {

  if (!$routeParams.uuid) {
    DocumentsService.getList().$promise.then(function(response) {
      $scope.documents = response;
    });
  } else {
    DocumentsService.getDocumentById($routeParams.uuid).$promise.then(function(response) {
      $scope.document = response;
    });
  }

});