/**
 * Created by mac on 18/02/2017.
 */
app.controller('ko.home.ctrl', function ($scope, boardService) {



  $scope.myInterval = 3000;
  $scope.noWrapSlides = false;
  $scope.active = 0;


  $scope.load = function (page) {
    $scope.currentPage = page;
    boardService.load('korea-sdsn', 1, 5, '').then(
        function (results) {
          // console.log(results);

          $scope.slides = results.data;
          // slide가 int type id를 필요로 함
          var id = 0;
          $scope.slides.forEach(function (slide) {
            slide.id = id;
            id++;
          })
        },
        function (err) {
          console.log(err);
        }
    );

    boardService.load('notice', 1, 5, '').then(
        function (results) {
          console.log(results);
          $scope.notices = results.data;

        },
        function (err) {
          console.log(err);
        }
    );

      boardService.load('issue', 1, 4, '').then(
          function (results) {
              console.log(results);
              $scope.issues = results.data;

          },
          function (err) {
              console.log(err);
          }
      );

      boardService.load('public', 1, 4, '').then(
          function (results) {
              console.log(results);
              $scope.publics = results.data;

          },
          function (err) {
              console.log(err);
          }
      );

      boardService.load('event-docs', 1, 4, '').then(
          function (results) {
              console.log(results);
              $scope.eventdocs = results.data;

          },
          function (err) {
              console.log(err);
          }
      );
  }

  // initial load & reset
  $scope.load($scope.currentPage);


  // var slides = $scope.slides = [];
  // var currIndex = 0;
  //
  // $scope.addSlide = function() {
  //   var newWidth = 600 + slides.length + 1;
  //   slides.push({
  //     image: '//unsplash.it/' + newWidth + '/300',
  //     text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
  //     id: currIndex++
  //   });
  // };
  //
  // $scope.randomize = function() {
  //   var indexes = generateIndexesArray();
  //   assignNewIndexesToSlides(indexes);
  // };
  //
  // for (var i = 0; i < 4; i++) {
  //   $scope.addSlide();
  // }
  //
  // console.log($scope.slides);
  //
  // // Randomize logic below
  //
  // function assignNewIndexesToSlides(indexes) {
  //   for (var i = 0, l = slides.length; i < l; i++) {
  //     slides[i].id = indexes.pop();
  //   }
  // }
  //
  // function generateIndexesArray() {
  //   var indexes = [];
  //   for (var i = 0; i < currIndex; ++i) {
  //     indexes[i] = i;
  //   }
  //   return shuffle(indexes);
  // }
  //
  // // http://stackoverflow.com/questions/962802#962890
  // function shuffle(array) {
  //   var tmp, current, top = array.length;
  //
  //   if (top) {
  //     while (--top) {
  //       current = Math.floor(Math.random() * (top + 1));
  //       tmp = array[current];
  //       array[current] = array[top];
  //       array[top] = tmp;
  //     }
  //   }
  //
  //   return array;
  // }

    // Instantiate the Bootstrap carousel
    $('.multi-item-carousel').carousel({
        // interval: 5000
        interval: false
    });

// for every slide in carousel, copy the next slide's item in the slide.
// Do the same for the next, next item.
    $('.multi-item-carousel .item').each(function(){
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        if (next.next().length>0) {
            next.next().children(':first-child').clone().appendTo($(this));
        } else {
            $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
        }
    });



    $('#media').carousel({
        // pause: true,
        interval: 50000,
        // interval: false,
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

})
