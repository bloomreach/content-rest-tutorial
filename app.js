'use strict';

var hippoRestApp = angular.module('hippoRestApp', [ 'ngRoute', 'ngResource', 'ngSanitize' ]);

hippoRestApp.constant('apiPrefix', 'http://localhost:8080/site/api/');

hippoRestApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl : 'document-list.html',
    controller : 'DocumentsController'
  }).when('/:uuid', {
    templateUrl : 'detail.html',
    controller : 'DocumentsController'
  }).otherwise('/');
});

hippoRestApp.factory('DocumentsService', function($resource, apiPrefix) {
  return {
    getList : function() {
      return $resource(apiPrefix + 'documents/', {}).get();
    },
    getDocumentById : function(uuid) {
      return $resource(apiPrefix + 'documents/' + uuid).get();
    }
  }
});

hippoRestApp.controller('DocumentsController', function($scope, $routeParams, DocumentsService, apiPrefix) {

  if (!$routeParams.uuid) {
    DocumentsService.getList().$promise.then(function(response) {
      $scope.documents = response;
    });
  } else {
    DocumentsService.getDocumentById($routeParams.uuid).$promise.then(function(response) {
      $scope.document = response;

      // resolve internal links
      $scope.content = $scope.resolveLinks(response);

      // TODO
      // resolve images

    });
  }

  $scope.resolveLinks = function(response) {
    var someElement = document.createElement('div');
    someElement.innerHTML = response.items['myhippoproject:content'].content;
    var links = someElement.querySelectorAll('a[data-hippo-link]');
    for (var index = 0; index < links.length; index++) {
      if (response.items['myhippoproject:content'].links[links[index].getAttribute('data-hippo-link')]) {
        var uuid = response.items['myhippoproject:content'].links[links[index].getAttribute('data-hippo-link')].id;
        links[index].href = '#/' + uuid;
      }
    }
    return someElement.innerHTML;
  };

});