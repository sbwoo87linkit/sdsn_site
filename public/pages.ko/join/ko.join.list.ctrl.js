app.controller('ko.join.list.ctrl', function ($scope, $stateParams, userService, toastr) {

    userService.list().then(
        function (result) {
            // console.log(result);
            $scope.users = result.data
        },
        function (err) {
            alert(err);
            window.history.back();
        }
    )


})