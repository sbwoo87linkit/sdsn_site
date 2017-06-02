/**
 * Created by mac on 15/04/2017.
 */
app.controller('ko.join.new.ctrl', function ($scope, $state, $stateParams, userService, toastr) {

    $scope.data = {
        name:'테스트 name',
        organization: '테스트 기관',
        title: '팀장',
        mobilephone: '0105555555',
        officephone:'0234445555',
        email: 'sdsn_korea@korea.ac.kr',
        password: 'admin1234'
    }

    $scope.save = function () {

        // console.log($scope.data);

        if (!$scope.data.name) {
            $scope.message = "이름을 추가해 주세요."
            $('#myModal').modal('show');
            return;
        }
        if (!$scope.data.organization) {
            $scope.message = "소속을 추가해 주세요."
            $('#myModal').modal('show');
            return;
        }
        if (!$scope.data.email) {
            $scope.message = "이메일을 추가해 주세요."
            $('#myModal').modal('show');
            return;
        }
        if (!validateEmail($scope.data.email)) {
            $scope.message = "이메일이 올바르지 않습니다."
            $('#myModal').modal('show');
            return;
        }

        userService.signup($scope.data).then(
            function (data) {
                // console.log(data);
                // window.history.back();
                $scope.message = "등록되었습니다."
                $('#myModal').modal('show');
                $scope.status = 'success';

            },
            function (err) {
                //console.log(err);
                if (err.status === 409) {
                    $scope.message = "이메일이 중복되었습니다."
                    $('#myModal').modal('show');
                }
                // window.history.back();
            }
        )

        $('#myModal').on('hidden.bs.modal', function (e) {
            // do something...
            console.log('event - hidden.bs.modal')
            if ($scope.status === 'success') {
                $state.go('ko.home')
            }
        })
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

})