angular.module('geotos', ['geotos.home', 'ngRoute'])
    .constant('appConstant', {
        imageServerBase: 'https://api.flickr.com/services/rest/',
        flickerApiKey: 'b8e6e813f6ad97df5138f3f389b73702'
    })
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'homeCtrl',
                templateUrl: 'app/home/home.html'
            })
            .when('/search/:searchParams', {
                controller: 'searchCtrl',
                templateUrl: 'app/search/search.html'
            })
            .otherwise({
                templateUrl: 'app/404.html'
            });
    })
    .run(['$rootScope', '$window', function ($rootScope, $window) {
        $rootScope.marker;
        $window.initGMAp = function () {
            var mapOptions = {
                zoom: 10,
                center: new google.maps.LatLng(28.5472545, 77.3253248),
                mapTypeId: google.maps.MapTypeId.TERRAIN
            }

            $rootScope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

            $rootScope.map.addListener('click', function (e) {
                placeMarkerAndPanTo(e.latLng, $rootScope.map);
                $rootScope.$broadcast('newPinPoint', {
                    data: e.latLng
                });
            });
        }

        function placeMarkerAndPanTo(latLng, map) {
            if($rootScope.marker) {
                $rootScope.marker.setMap(null);
                delete $rootScope.marker;
            }
            $rootScope.marker = new google.maps.Marker({
                position: latLng,
                map: map
            });
            map.panTo(latLng);
        }
}]);