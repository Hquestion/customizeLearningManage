angular.module('MetronicApp').controller('TodoController', function($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function() {   
        App.initAjax(); // initialize core components        
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = false;
    // $rootScope.settings.layout.pageBodySolid = true;
    // $rootScope.settings.layout.pageSidebarClosed = false;
});