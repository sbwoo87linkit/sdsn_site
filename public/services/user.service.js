app.factory('userService', function($http){

  var factory = {};

  factory.signup = function(user) {
    console.log(user);
    return $http.post('/user/signup', user);
  }

  factory.login = function(user) {
    return $http.post('/user/login', user);
  }

  factory.list = function() {
    return $http.get('/user/list');
  }




  return factory;

});
