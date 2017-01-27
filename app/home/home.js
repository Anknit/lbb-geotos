angular.module('geotos.home', [])
    .controller('homeCtrl', ['$scope', '$rootScope', 'flickerImages', function ($scope, $rootScope, flickerImages) {
        $scope.appState = 'idle';
        $scope.rows= 12;
        $scope.page = 1;
        $scope.photosArr = [];
        $scope.currentLat = 0;
        $scope.currentLong = 0;
        $scope.totalResult = 0;
        $scope.$on('newPinPoint', function (event, data) {
            $scope.currentLat = data.data.lat();
            $scope.currentLong = data.data.lng();
            $scope.page = 1;
            $scope.photosArr = [];
            getFlickerImages();
        });
        
        $scope.nextPage = function () {
            $scope.page = $scope.page + 1;
            getFlickerImages();
        }
        
        function getFlickerImages() {
            $scope.appState = 'requested';
            flickerImages.getImagesFromLocation({
                lat: $scope.currentLat,
                long: $scope.currentLong,
                rows: $scope.rows,
                page: $scope.page
            }).then(function (response) {
                $scope.appState = 'idle';
                if (response.stat === "ok") {
                    $scope.photosArr = $scope.photosArr.concat(response.photos.photo);
                    $scope.totalResult = response.photos.total;
                } else {
                    alert(response.message);
                }
            });
        }
}])
    .service('flickerImages', ['$http', 'appConstant', function ($http, appConstant) {
        this.getImagesFromLocation = function (data) {
            var apikey = appConstant.flickerApiKey,
                apiBase = appConstant.imageServerBase,
                lat = data.lat,
                long = data.long,
                rows = data.rows,
                page = data.page;
            return $http.get(apiBase + '?method=flickr.photos.search&api_key=' + apikey + '&lat=' + lat + '&lon=' + long + '&format=json&nojsoncallback=1&per_page=' + rows + '&page=' + page, {}).then(function (response) {
                return response.data;
            }, function (error) {
                alert('Error in getting images');
            });
        };
}])
    .directive('showOnLoad', [function () {
        return {
            link: function (scope, elem, attr) {
                elem[0].onload = function () {
                    this.classList.add('loaded');
                }
            }
        }
}]);