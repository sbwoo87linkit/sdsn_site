app.controller('ko.board.ctrl', function ($scope, $stateParams, boardService, toastr) {

    $scope.goBack = function () {
        window.history.back();
    }

    $scope.viewTitle = "";
    // console.log("ko.board.ctrl ", $stateParams)

})

app.controller('ko.board.list.ctrl', function ($scope, $rootScope, $window, $stateParams, boardService, toastr, $log, menuService) {

    // console.log(menuService.get($stateParams).boardType);

    $scope.boardType = menuService.get($stateParams).boardType;
    $rootScope.menu = menuService.get($stateParams).menu;
    $scope.viewTitle = menuService.get($stateParams).boardTitle;

    $scope.data = { "searchText" : ""};

    $scope.pagination = {
        maxSize:  5,
        totalItems:  0,
        currentPage:  1,
        itemsPerPage:  10,

    };

    $scope.load = function (page) {
        $scope.currentPage = page;
        boardService.load($stateParams.articleType, $scope.pagination.currentPage, $scope.pagination.itemsPerPage, $scope.data.searchText).then(
            function (results) {
                $scope.items = results.data.docs;
                $scope.pagination.totalItems = results.data.totalcount;
            },
            function (err) {
                console.log(err);
            }
        );
    }

    // initial load & reset
    $scope.load($scope.currentPage);

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.pagination.currentPage);
        $scope.load($scope.pagination.currentPage);
    };

    $scope.search = function () {
        $scope.pagination.currentPage = 1;
        $scope.load($scope.pagination.currentPage);
    }

    $scope.reset = function () {
        $scope.pagination.currentPage = 1;
        $scope.data.searchText = "";
        $scope.load($scope.pagination.currentPage);
    }

    $scope.delete = function () {
        // alert('delete')
        // console.log($scope.data.selectedItem)

        boardService.delete($scope.data.selectedItem.sid).then(
            function (result) {
                // window.history.back();
                $scope.load($scope.currentPage);
            }, function (err) {
                alert(err);
            }
        )
    }


})

app.controller('ko.board.view.ctrl', function ($scope, $rootScope, $window, $stateParams, boardService, menuService, toastr) {

    // if ($stateParams.articleType === 'un-sdsn') $scope.viewTitle = "UN SDSN 소식";
    // if ($stateParams.articleType === 'korea-sdsn') $scope.viewTitle = "Korea SDSN 소개";

    // $rootScope.menu = $window.localStorage.getItem('menu');
    // $scope.viewTitle = $window.localStorage.getItem('boardTitle');

    $rootScope.menu = menuService.get($stateParams).menu;
    $scope.viewTitle = menuService.get($stateParams).boardTitle;


    $scope.delete = function () {

        boardService.delete($stateParams.articleId).then(
            function (result) {
                window.history.back();
            }, function (err) {
                alert(err);
            }
        )
    }

    boardService.get($stateParams.articleId).then(
        function (result) {
            console.log(result);
            $scope.item = result.data[0];
        }, function (err) {
            alert(err);
        }
    )

})
app.controller('ko.board.create.ctrl', function ($scope, $window, $rootScope, $stateParams, $http, boardService, menuService, toastr) {

    $rootScope.menu = menuService.get($stateParams).menu;
    $scope.viewTitle = menuService.get($stateParams).boardTitle;


    $scope.data = {
        "articleType": $stateParams.articleType,
        "image": "article2.jpg",
        "title": "[" + $stateParams.articleType + "] Board 테스트 Title",
        "content": "첫번째줄 테스트 글내용 입니다.\n두번째줄 테스트 글내용 입니다.\n3번째줄 테스트 글내용 입니다.\n4번째줄 테스트 글내용 입니다.\n5번째줄 테스트 글내용 입니다.",
        "date": new Date(),
        "images" : [],
        "files": []
    }

    $scope.deleteImage = function (index) {
        $scope.data.images.splice(index, 1)
    }
    $scope.imageChanged = function (element) {

        $scope.isUploading = true;
        $scope.$apply(function (scope) {
            var file = element.files[0];
            var fd = new FormData();
            fd.append('file', file);
            $http.post('/api/files/', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (res) {
                console.log(res.data);
                $scope.data.images.push({url: "/files/" + res.data});
                $scope.isUploading = false;
            }, function (err) {
                console.log("error", err)
            });
        });
    };

    $scope.deleteFile = function (index) {
        $scope.data.files.splice(index, 1)
    }
    $scope.fileChanged = function (element) {

        $scope.isUploading = true;
        $scope.$apply(function (scope) {
            var file = element.files[0];
            var fd = new FormData();
            fd.append('file', file);
            $http.post('/api/files/', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (res) {
                console.log(res.data);
                $scope.data.files.push({url: "/files/" + res.data});
                $scope.isUploading = false;
            }, function (err) {
                console.log("error", err)
            });
        });
    };

    $scope.save = function () {

        if (!$scope.data.title) {
            toastr.error("제목을 추가해 주세요");
            return;
        }
        // if (!$scope.data.content) {
        //     toastr.error("내용을 추가해 주세요");
        //     return;
        // }

        if ($stateParams.articleType === 'notice' || $stateParams.articleType === 'news') {
            if ($scope.data.images.length === 0) {
                toastr.error("이미지 파일을 추가해 주세요");
                return;
            }
        }

        boardService.post($scope.data).then(
            function () {
                window.history.back();
            },
            function (err) {
                alert(err);
                window.history.back();
            }
        )

    }
    $scope.goBack = function () {
        window.history.back();
    }

})
app.controller('ko.board.edit.ctrl', function ($scope, $rootScope, $window, $http, $stateParams, boardService, menuService, toastr) {


    $rootScope.menu = menuService.get($stateParams).menu;
    $scope.viewTitle = menuService.get($stateParams).boardTitle;


    $scope.goBack = function () {
        window.history.back();
    }

    // $scope.deleteFile = function (index) {
    //     $scope.data.files.splice(index, 1)
    // }
    // $scope.file_changed = function (element) {
    //
    //     $scope.$apply(function (scope) {
    //         var file = element.files[0];
    //         var reader = new FileReader();
    //         var fd = new FormData();
    //         fd.append('file', file);
    //         // $http.post($rootScope.baseUrl + '/api/photos/', fd, {   //  '/api/photos/'
    //         $http.post('/api/files/', fd, {   //  '/api/photos/'
    //             transformRequest: angular.identity,
    //             headers: {'Content-Type': undefined}
    //         }).then(function (res) {
    //             $scope.data.files.push({url: "/files/" + res.data});
    //             // $scope.data.file = "/photos/" + res.data;
    //             // console.log(res);
    //         }, function (err) {
    //             console.log("error", err)
    //         });
    //     });
    // };

    $scope.deleteImage = function (index) {
        $scope.data.images.splice(index, 1)
    }
    $scope.imageChanged = function (element) {

        $scope.$apply(function (scope) {
            var file = element.files[0];
            var fd = new FormData();
            fd.append('file', file);
            $http.post('/api/files/', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (res) {
                $scope.data.images.push({url: "/files/" + res.data});
            }, function (err) {
                console.log("error", err)
            });
        });
    };

    $scope.deleteFile = function (index) {
        $scope.data.files.splice(index, 1)
    }
    $scope.fileChanged = function (element) {

        $scope.$apply(function (scope) {
            var file = element.files[0];
            var fd = new FormData();
            fd.append('file', file);
            $http.post('/api/files/', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (res) {
                $scope.data.files.push({url: "/files/" + res.data});
            }, function (err) {
                console.log("error", err)
            });
        });
    };

    $scope.save = function () {

        if (!$scope.data.title) {
            toastr.error("제목을 추가해 주세요");
            return;
        }
        // if (!$scope.data.content) {
        //     toastr.error("내용을 추가해 주세요");
        //     return;
        // }

        if ($stateParams.articleType === 'notice' || $stateParams.articleType === 'news') {
            if ($scope.data.images.length === 0) {
                toastr.error("이미지 파일을 추가해 주세요");
                return;
            }
        }

        boardService.update($stateParams.articleId, $scope.data).then(
            function () {
                window.history.back();
            },
            function (err) {
                alert(JSON.stringify(err));
                window.history.back();
            }
        )

    }


    boardService.get($stateParams.articleId).then(
        function (result) {
            console.log(result);
            $scope.data = result.data[0];
        }, function (err) {
            alert(err);
        }
    )

})

app.controller('ko.login.ctrl', function ($scope, $window, $rootScope, $stateParams, userService, toastr) {

    $scope.data = {
        email:"sdsn_korea@korea.ac.kr",
        password:"admin1234"
    }

    $scope.login = function () {

        if (!$scope.data.email) {
            toastr.error("이메일을 입력해 주세요");
            return;
        }
        if (!$scope.data.password) {
            toastr.error("암호를 입력해 주세요");
            return;
        }

        userService.login($scope.data).then(
            function (result) {
                var token = result.data.id_token;
                var payload = JSON.parse(atob(token.split('.')[1]));
                $rootScope.user = payload;
                $window.localStorage.setItem('token', JSON.stringify(payload));


                //console.log(playload);
                window.history.back();

            },
            function (err) {
                alert(JSON.stringify(err));
                window.history.back();
            }
        )

    }

    $scope.logout = function () {
        $window.localStorage.removeItem('token');
        $rootScope.user = null;
        console.log("rootScope.user : " + $rootScope.user);
        // toastr.success("You have log-out.");
    }

    $scope.signup = function () {

        if (!$scope.data.email) {
            toastr.error("이메일을 입력해 주세요");
            return;
        }
        if (!$scope.data.password) {
            toastr.error("암호를 입력해 주세요");
            return;
        }

        userService.signup($scope.data).then(
            function () {
                window.history.back();
            },
            function (err) {
                alert(JSON.stringify(err));
                window.history.back();
            }
        )

    }


    // boardService.get($stateParams.articleId).then(
    //     function (result) {
    //         console.log(result);
    //         $scope.item = result.data[0];
    //     }, function (err) {
    //         alert(err);
    //     }
    // )

})


