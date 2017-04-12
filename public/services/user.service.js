app.factory('userService', function($http){

  var factory = {};

  factory.signup = function(user) {
    return $http.post('/user/signup', user);
  }

  factory.login = function(user) {
    return $http.post('/user/login', user);
  }




  return factory;

});
