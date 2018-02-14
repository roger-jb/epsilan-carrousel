var app = angular.module('epsilanCarousel', ['ui.bootstrap'])
  .controller('CarouselCtrl', ['$scope', '$http', '$interval',
    function ($scope, $http, $interval) {
      var config = {
        time: { // in seconde
          refresh: 3600,
          interval: 3
        },
        server:{
          slidesRepository: '/slides'
        }
      };
      // initializing the time Interval
      $scope.myInterval = config.time.interval*1000;

      // Initializing  slide array
      $scope.slides = [];
      var loadSlides = function () {
        $http.get(config.server.slidesRepository)
          .then(function (response) {
            var data = response.data;
            var el = document.createElement('html');
            el.innerHTML = data;
            var ahref = el.getElementsByTagName('a');
            var hrefs = [];

            for (var i = 1; i < ahref.length - 1; i++) {
              if (!ahref[i].href.match(/\.gitkeep$/)) {
                hrefs.push({image: ahref[i].href});
              }
            }
            $scope.slides = hrefs;
          });
      };

      $scope.reloadSlides = function () {
        $interval(loadSlides, config.time.refresh*1000);
      };
      loadSlides();
      $scope.reloadSlides();
    }]);

