angular.module('geotos.home', [])
    .controller('homeCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $scope.photosArr = []
        $scope.$on('newPinPoint', function (event, data) {
            console.log(data);
//            var key = 'f481b4761bf7b6b31f3719f86fdc7fb1';
            var lat = data.data.lat();
            var long = data.data.lng();
            var key = 'b8e6e813f6ad97df5138f3f389b73702';
            var sig = '345c025e3152e9ce';
            $http.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+key+'&lat='+lat+'&lon='+long+'&format=json&nojsoncallback=1', {}).then(function (response) {
                console.log(response);
                if(response.data.stat === "ok") {
                    $scope.photosArr = response.data.photos.photo;
                } else {
                    alert(response.data.message);
                }
            }, function (error) {
                alert('Error in getting images');
            });
        });
}]);