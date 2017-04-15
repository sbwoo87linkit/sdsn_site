/**
 * Created by mac on 18/02/2017.
 */
app.controller('ko.home.ctrl', function ($scope, boardService) {

  $scope.slides = [
    {
      "id": 0,
      "image": "images/article1.jpg",
      "text": "[리질리언스 읽기] ",
      "content": "OJERI의 전진형 교수가 월간 환경과 조경에 기고하였던 연재 [리질리언스 읽기]의 첫 꼭지입니다. 전진형 교수는 설계의 대상이 되는 곳이 지속가능할 수 있도록 하는 연구를 하고 있다. 생태계의 리질리언스(회복성) 개념을 조경에 적용하고자 한다. OJERI의 새싹연구를 2015년부터 수행해오고 있다.",
      "date": "2012.02.23"
    },
    {
      "id": 1,
      "image": "images/article2.jpg",
      "text": "[리질리언스 읽기] 21세기 패러다임의 변화, 지속가능성을 넘어 리질리언스로",
      "content": "OJERI의 전진형 교수가 월간 환경과 조경에 기고하였던 연재 [리질리언스 읽기]의 첫 꼭지입니다. 전진형 교수는 설계의 대상이 되는 곳이 지속가능할 수 있도록 하는 연구를 하고 있다. 생태계의 리질리언스(회복성) 개념을 조경에 적용하고자 한다. OJERI의 새싹연구를 2015년부터 수행해오고 있다.",
      "date": "2012.02.23"
    },
    {
      "id": 2,
      "image": "images/article3.jpg",
      "text": "[리질리언스 읽기] 21세기 패러다임의 변화, 지속가능성을 넘어 리질리언스로",
      "content": "OJERI의 전진형 교수가 월간 환경과 조경에 기고하였던 연재 [리질리언스 읽기]의 첫 꼭지입니다. 전진형 교수는 설계의 대상이 되는 곳이 지속가능할 수 있도록 하는 연구를 하고 있다. 생태계의 리질리언스(회복성) 개념을 조경에 적용하고자 한다. OJERI의 새싹연구를 2015년부터 수행해오고 있다.",
      "date": "2012.02.23"
    },
    // {
    //   "image":"article4.jpg",
    //   "title":"[리질리언스 읽기] 21세기 패러다임의 변화, 지속가능성을 넘어 리질리언스로",
    //   "content": "OJERI의 전진형 교수가 월간 환경과 조경에 기고하였던 연재 [리질리언스 읽기]의 첫 꼭지입니다. 전진형 교수는 설계의 대상이 되는 곳이 지속가능할 수 있도록 하는 연구를 하고 있다. 생태계의 리질리언스(회복성) 개념을 조경에 적용하고자 한다. OJERI의 새싹연구를 2015년부터 수행해오고 있다.",
    //   "date":"2012.02.23"
    // },
    // {
    //   "image":"article5.jpg",
    //   "title":"[리질리언스 읽기] 21세기 패러다임의 변화, 지속가능성을 넘어 리질리언스로",
    //   "content": "OJERI의 전진형 교수가 월간 환경과 조경에 기고하였던 연재 [리질리언스 읽기]의 첫 꼭지입니다. 전진형 교수는 설계의 대상이 되는 곳이 지속가능할 수 있도록 하는 연구를 하고 있다. 생태계의 리질리언스(회복성) 개념을 조경에 적용하고자 한다. OJERI의 새싹연구를 2015년부터 수행해오고 있다.",
    //   "date":"2012.02.23"
    // },
    // {
    //   "image":"article1.jpg",
    //   "title":"[리질리언스 읽기] 21세기 패러다임의 변화, 지속가능성을 넘어 리질리언스로",
    //   "content": "OJERI의 전진형 교수가 월간 환경과 조경에 기고하였던 연재 [리질리언스 읽기]의 첫 꼭지입니다. 전진형 교수는 설계의 대상이 되는 곳이 지속가능할 수 있도록 하는 연구를 하고 있다. 생태계의 리질리언스(회복성) 개념을 조경에 적용하고자 한다. OJERI의 새싹연구를 2015년부터 수행해오고 있다.",
    //   "date":"2012.02.23"
    // },
    // {
    //   "image":"article2.jpg",
    //   "title":"[리질리언스 읽기] 21세기 패러다임의 변화, 지속가능성을 넘어 리질리언스로",
    //   "content": "OJERI의 전진형 교수가 월간 환경과 조경에 기고하였던 연재 [리질리언스 읽기]의 첫 꼭지입니다. 전진형 교수는 설계의 대상이 되는 곳이 지속가능할 수 있도록 하는 연구를 하고 있다. 생태계의 리질리언스(회복성) 개념을 조경에 적용하고자 한다. OJERI의 새싹연구를 2015년부터 수행해오고 있다.",
    //   "date":"2012.02.23"
    // },
  ]

  $scope.myInterval = 3000;
  $scope.noWrapSlides = false;
  $scope.active = 0;


  $scope.load = function (page) {
    $scope.currentPage = page;
    boardService.load('notice', 1, 5, '').then(
        function (results) {
          // console.log(results);

          $scope.slides = results.data.docs;
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

    boardService.load('news', 1, 3, '').then(
        function (results) {
          console.log(results);
          $scope.news = results.data.docs;

        },
        function (err) {
          console.log(err);
        }
    );

      boardService.load('issue', 1, 4, '').then(
          function (results) {
              console.log(results);
              $scope.issues = results.data.docs;

          },
          function (err) {
              console.log(err);
          }
      );

      boardService.load('public', 1, 4, '').then(
          function (results) {
              console.log(results);
              $scope.publics = results.data.docs;

          },
          function (err) {
              console.log(err);
          }
      );

      boardService.load('event-docs', 1, 4, '').then(
          function (results) {
              console.log(results);
              $scope.eventdocs = results.data.docs;

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
        // interval: 5000,
        interval: false,
    });

})
