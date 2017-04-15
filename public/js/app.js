var interceptor = function($q, $location) {
	return {
		request: function (config) {
			// console.log(config)
			return config
		},

		response: function (result) {
			// console.log(result)
			return result
		},

		responseError: function (rejection) {
			console.log('Failed with', rejection.status, 'status')
			if (rejection.status == 401 || rejection.status == 403) {
				$location.url('/login')
			}
			return $q.reject(rejection)
		}
	}
}


// var app = angular.module('app', ['ui.router', 'ngAnimate', 'toastr', 'angular-confirm']);
// var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'satellizer', 'toastr','ngAnimate', 'ui.bootstrap.datetimepicker', 'naif.base64', 'angularModalService']);

var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'satellizer', 'toastr','ngAnimate', 'ui.bootstrap.datetimepicker']);

app.filter('filename', function () {
    return function (str) {
    	var str = str.replace(str.substring(str.lastIndexOf('-'),str.lastIndexOf('.')), '')
        return str.replace('/files/', '');
    };
});

app.config(function ($httpProvider, toastrConfig) {
	$httpProvider.interceptors.push(interceptor);
	// angular.extend(toastrConfig, {
	// 	autoDismiss: false,
	// 	containerId: 'toast-container',
	// 	maxOpened: 0,
	// 	newestOnTop: true,
	// 	timeOut:0,
	// 	extendedTimeOut:0,
	// 	positionClass: 'toast-top-right',
	// 	preventDuplicates: false,
	// 	preventOpenDuplicates: false,
	// 	target: 'body'
	// });
})

app.config(function ($stateProvider, $urlRouterProvider, $authProvider) {

	// $urlRouterProvider.otherwise("/login");
	$urlRouterProvider.otherwise("/ko/home");

	//region auth
	$stateProvider

	// .state('/', {
	//     url: "/",
	//     template:'<h1>home</h1>'
	//     // templateUrl: "pages/auth/login/view.html",
	//     // controller: "authlogin",
	// })

		.state('en', {
			abstract: true,
			url: "/en",
			templateUrl: "pages.ko/ko.html",
		})

		.state('en.home', {
			url: "/home",
			templateUrl: "pages.ko/home/home.html",
			controller: "ko.home.ctrl"
		})





		.state('ko', {
			abstract: true,
			url: "/ko",
			templateUrl: "pages.ko/ko.html",

		})

		.state('ko.home', {
			url: "/home",
			templateUrl: "pages.ko/home/home.html",
			controller: "ko.home.ctrl"

		})

		.state('ko.login', {
			url: "/login",
			templateUrl: "pages.ko/auth/login.html",
			controller: 'ko.login.ctrl'
		})

        .state('ko.signup', {
            url: "/signup",
            templateUrl: "pages.ko/auth/signup.html",
            controller: 'ko.signup.ctrl'
        })

        // .state('ko.login', {
		//     url: "/login",
		//     templateUrl: "pages.ko/login/login.html",
		//     controller: 'ko.login.ctrl'
		// })

		.state('ko.about', {
			abstract : true,
			url: "/about",
			templateUrl: "pages.ko/about/about.html"
		})
		.state('ko.about.greeting', {
			url: "/greeting",
			templateUrl: "pages.ko/about/about.greeting.html"
		})
        .state('ko.about.ceo_history', {
            url: "/ceo_history",
            templateUrl: "pages.ko/about/about.ceo_history.html"
        })

		.state('ko.about.sdsnkorea', {
			url: "/sdsnkorea",
			templateUrl: "pages.ko/about/about.sdsnkorea.html",
			controller: function ($scope) {
			}
		})
		.state('ko.about.unsdsn', {
			url: "/unsdsn",
			templateUrl: "pages.ko/about/about.unsdsn.html",
			controller: function ($scope) {
			}
		})
		.state('ko.about.sdgs', {
			url: "/sdgs",
			templateUrl: "pages.ko/about/about.sdgs.html",
			controller: function ($scope) {
			}
		})
        .state('ko.about.organization', {
            url: "/organization",
            templateUrl: "pages.ko/about/about.organization.html",
            controller: function ($scope) {
            }
        })
		.state('ko.about.cicontact', {
			url: "/cicontact",
			templateUrl: "pages.ko/about/about.cicontact.html",
			controller: function ($scope) {
			}
		})


		.state('ko.cowork', {
			url: "/network",
			templateUrl: "pages.ko/network/cowork.html"
		})
		.state('ko.cowork.member', {
			url: "/member",
			templateUrl: "pages.ko/network/cowork.member.html",
			controller: function ($scope) {
			}
		})
		.state('ko.cowork.partner', {
			url: "/partner",
			templateUrl: "pages.ko/network/cowork.partner.html",
			controller: function ($scope) {
			}
		})


		.state('ko.initiatives', {
			url: "/initiatives",
			templateUrl: "pages.ko/initiatives/initiatives.html"
		})
		.state('ko.initiatives.ddpp_leds', {
			url: "/ddpp_leds",
			templateUrl: "pages.ko/initiatives/initiatives.ddpp_leds.html",
			controller: function ($scope) {
			}
		})
		.state('ko.initiatives.proposal', {
			url: "/proposal",
			templateUrl: "pages.ko/initiatives/initiatives.proposal.html",
			controller: function ($scope) {
			}
		})
		.state('ko.initiatives.sdg_academy', {
			url: "/sdg_academy",
			templateUrl: "pages.ko/initiatives/initiatives.sdg_academy.html",
			controller: function ($scope) {
			}
		})
		.state('ko.initiatives.sdsn_youth', {
			url: "/sdsn_youth",
			templateUrl: "pages.ko/initiatives/initiatives.sdsn_youth.html",
			controller: function ($scope) {
			}
		})
		.state('ko.initiatives.sustainable_development', {
			url: "/sustainable_development",
			templateUrl: "pages.ko/initiatives/initiatives.sustainable_development.html",
			controller: function ($scope) {
			}
		})
		.state('ko.initiatives.thematic_network', {
			url: "/thematic_network",
			templateUrl: "pages.ko/initiatives/initiatives.thematic_network.html",
			controller: function ($scope) {
			}
		})

		/** test router << **/
		// .state('ko.bookmark', {
		//     url: "/bookmark",
		//     template : "<div ui-view></div>",
		//     // templateUrl: "pages.ko/initiatives/initiatives.thematic_network.html",
		//     controller: function ($scope) {
		//     }
		// })
		// .state('ko.bookmark.list', {
		//     url: "/list",
		//     template : "<h1>bookbmark LIST</h1>",
		//     // templateUrl: "pages.ko/initiatives/initiatives.thematic_network.html",
		//     controller: function ($scope) {
		//     }
		// })
		/** test router >> **/



		.state('ko.board', {
			url: "/board",
			templateUrl: "pages.ko/board/board.html",
			controller: "ko.board.ctrl"
		})
		.state('ko.board.list', {
			url: "/:articleType",
			templateUrl: "pages.ko/board/list.html",
			controller: "ko.board.list.ctrl",
			// params : {boardType: 'board'}
		})
		.state('ko.board.create', {
			url: "/:articleType/create",
			templateUrl: "pages.ko/board/create.html",
			controller: "ko.board.create.ctrl"
		})
		.state('ko.board.view', {
			url: "/:articleType/view/:articleId",
			templateUrl: "pages.ko/board/view.html",
			controller: "ko.board.view.ctrl"
		})
		.state('ko.board.edit', {
			url: "/:articleType/edit/:articleId",
			templateUrl: "pages.ko/board/edit.html",
			controller: "ko.board.edit.ctrl"
		})


		// .state('ko.news', {
		//     url: "/news",
		//     templateUrl: "pages.ko/news/news.html",
		//     controller: "ko.board.ctrl"
		// })
		// .state('ko.news.list', {
		//     url: "/:articleType",
		//     templateUrl: "pages.ko/board/list.html",
		//     controller: "ko.board.list.ctrl",
		//     params : {boardType: 'news'}
		// })
		// .state('ko.news.create', {
		//     url: "/:articleType/create",
		//     templateUrl: "pages.ko/board/create.html",
		//     controller: "ko.board.create.ctrl"
		// })
		// .state('ko.news.view', {
		//     url: "/:articleType/view/:articleId",
		//     templateUrl: "pages.ko/board/view.html",
		//     controller: "ko.board.view.ctrl"
		// })
		// .state('ko.news.edit', {
		//     url: "/:articleType/edit/:articleId",
		//     templateUrl: "pages.ko/board/edit.html",
		//     controller: "ko.board.edit.ctrl"
		// })



		// .state('ko.resources', {
		//     url: "/resources",
		//     templateUrl: "pages.ko/resources/resources.html",
		//     controller: "ko.board.ctrl"
		// })
		// .state('ko.resources.list', {
		//     url: "/:articleType",
		//     templateUrl: "pages.ko/board/list.html",
		//     controller: "ko.board.list.ctrl",
		//     params : {boardType: 'resources'}
		// })
		// .state('ko.resources.create', {
		//     url: "/:articleType/create",
		//     templateUrl: "pages.ko/board/create.html",
		//     controller: "ko.board.create.ctrl"
		// })
		// .state('ko.resources.view', {
		//     url: "/:articleType/view/:articleId",
		//     templateUrl: "pages.ko/board/view.html",
		//     controller: "ko.board.view.ctrl"
		// })
		// .state('ko.resources.edit', {
		//     url: "/:articleType/edit/:articleId",
		//     templateUrl: "pages.ko/board/edit.html",
		//     controller: "ko.board.edit.ctrl"
		// })





		// .state('ko.resources', {
		//     url: "/resources",
		//     templateUrl: "pages.ko/resources/resources.html"
		// })
		// .state('ko.resources.issues', {
		//     url: "/issues",
		//     templateUrl: "pages.ko/resources/resources.issues.html",
		//     // controller: "resourcesissuesCtrl"
		//     // controller: function($scope) {
		//     // }
		// })
		// .state('ko.resources.publics', {
		//     url: "/publics",
		//     templateUrl: "pages.ko/resources/resources.publics.html",
		//     controller: function ($scope) {
		//     }
		// })
		// .state('ko.resources.event_docs', {
		//     url: "/event_docs",
		//     templateUrl: "pages.ko/resources/resources.event_docs.html",
		//     controller: function ($scope) {
		//     }
		// })

		.state('ko.join', {
			url: "/join",
			templateUrl: "pages.ko/join/join.html"
		})
		.state('ko.join.info', {
			url: "/info",
			templateUrl: "pages.ko/join/join.info.html",
			controller: function ($scope) {

				// console.log('join us')

				$scope.sendMail =  function() {
					console.log('SEND MAIL')

                    var link = "mailto:sbwoo87@gmail.com"
                            + "?cc=sbwoo87@gmail.com"
                            + "&subject=" + escape("This is my subject")
                            + "&body=" + escape(document.getElementById('myText').value)
                        ;

                    window.location.href = link;



				}

			}
		})





























		.state('login', {
			url: "/login",
			templateUrl: "pages/auth/login/view.html",
			controller: "authlogin",
		})

		.state('signup', {
			url: "/signup",
			templateUrl: "pages/auth/signup/view.html",
			controller: "authsignup",
		})
	//endregion


	$authProvider.httpInterceptor = function ($auth) {
		return true;
	};
	$authProvider.withCredentials = false;
	$authProvider.tokenRoot = null;
	$authProvider.baseUrl = '/';
	$authProvider.loginUrl = 'sessions/create';  //'/users/login';
	$authProvider.signupUrl = '/users';
	$authProvider.unlinkUrl = '/auth/unlink/';
	$authProvider.tokenName = 'id_token';
	$authProvider.tokenPrefix = 'satellizer';
	$authProvider.tokenHeader = 'Authorization';
	$authProvider.tokenType = 'Bearer';
	$authProvider.storageType = 'localStorage';


	/**
	 * Helper auth functions
	 */
	var skipIfLoggedIn = function ($q, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.reject();
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	};

	var loginRequired = function ($q, $location, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.resolve();
		} else {
			$location.path('/login');
		}
		return deferred.promise;
	};


});













// For Component users, it should look like this:
// var app = angular.module('app', [require('angular-ui-router')]);
app.run(function ($rootScope, $state, $stateParams, $http, $window, $auth) {

	$rootScope.user = JSON.parse($window.localStorage.getItem('token'))
	// console.log($rootScope.user)

	$rootScope.$stateParams = $stateParams
	$rootScope.$state = $state


	Date.prototype.yyyymmdd = function()
	{
			var yyyy = this.getFullYear().toString();
			var mm = (this.getMonth() + 1).toString();
			var dd = this.getDate().toString();
			return  yyyy + '-' + (mm[1] ? mm : '0'+mm[0]) + '-' + (dd[1] ? dd : '0'+dd[0]);
	}


	$rootScope.$on('$stateChangeStart',
		function (event, toState) {
			// var requiredLogin = false;

			// requiredLogin: true, requiredAdmin: true}
			if (toState.data && toState.data.requiredLogin && toState.data.requiredAdmin) {
				// console.log(" >>>>>>>>>>>>>>> requiredAdmin ... but not admin ... got logoin")
				// console.log($rootScope.user)

				if ( $rootScope.user && $rootScope.user.role != 'admin') {
					// Required !!!!!!
					event.preventDefault();
					$state.go('login');
				}
			}

			// console.log("###############  ", toState.data.requiredLogin)
			// if (toState.data && toState.data.requiredLogin) {
			// 	//$location.path();
			// 	console.log($location.path())
			// 	$rootScope.redirectUrl = $location.path()
			// 	requiredLogin = true;
			// }
            //
			// // if yes and if this user is not logged in, redirect him to login page
			// if (requiredLogin && !$auth.isAuthenticated()) {
			// 	event.preventDefault();
			// 	$state.go('app.login');
			// }


		});

    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });








})

app.directive('fileUpload', function () {
	return {
		scope: true,        //create a new scope
		link: function (scope, el, attrs) {
			el.bind('change', function (event) {
				var files = event.target.files;
				//iterate files since 'multiple' may be specified on the element
				for (var i = 0;i<files.length;i++) {
					//emit event upward
					scope.$emit("fileSelected", { file: files[i] });
				}
			});
		}
	};
});


app.directive('uiSrefActiveIf', ['$state', function($state) {
	return {
		restrict: "A",
		controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
			var state = $attrs.uiSrefActiveIf;

			function update() {
				if ( $state.includes(state) || $state.is(state) ) {
					$element.addClass("active");
				} else {
					$element.removeClass("active");
				}
			}

			$scope.$on('$stateChangeSuccess', update);
			update();
		}]
	};
}])

app.controller('ModalController', function($scope, close) {

    $scope.close = function(result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

});