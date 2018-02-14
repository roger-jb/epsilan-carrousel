var app = angular.module('edeipCarousel', ['ui.bootstrap'])
  .controller('CarouselCtrl', ['$scope', '$http', '$interval',
    function ($scope, $http, $interval) {
      var config = {
        time: { // in seconde
          refresh: 3600,
          interval: 3
        },
        server:{
          // protocol: 'http',
          // name:'127.0.0.1',
          // port: '8080',
          // basePath: '',
          slidesRepository: '/slides'
        }
      };
// initializing the time Interval
      $scope.myInterval = config.time.interval*1000;

      // Initializing  slide array
      $scope.slides = [];
      var loadSlides = function () {
        $http.get(/*config.server.protocol+'://'+config.server.name+':'+config.server.port+config.server.basePath+*/config.server.slidesRepository)
          .then(function (response) {
            var data = response.data;
            var el = document.createElement('html');
            el.innerHTML = data;
            var ahref = el.getElementsByTagName('a');
            var hrefs = [];

            for (var i = 1; i < ahref.length - 1; i++) {
              hrefs.push({image: ahref[i].href});
            }
            $scope.slides = hrefs;
          });
      };

      $scope.reloadSlides = function () {
        $interval(loadSlides, config.time.refresh*1000);
      };
      loadSlides();
      $scope.reloadSlides();
    }]); // Controller Ends here

