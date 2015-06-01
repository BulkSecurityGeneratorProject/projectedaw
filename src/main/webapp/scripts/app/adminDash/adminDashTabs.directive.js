'use strict';

angular.module('leaguegenApp')
    .directive('admindashtabs', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/admin-dash-tabs.html',
            link: function (scope, element) {
                new CBPFWTabs( document.getElementById( 'tabs2' ) );
            }
        }
    });


