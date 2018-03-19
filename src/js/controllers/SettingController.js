angular.module('MetronicApp').controller('SettingController', function ($rootScope, $scope, $http, $timeout, $modal, httpService, schoolId, userId) {
    $scope.courseCategoryList = [];
    $scope.alertVisible = false;
    $scope.message = '';

    httpService.get('api/BasicSetInfoI/GetListCourseCategory', {
        schoolFID: schoolId
    }).then(function (res) {
        $scope.courseCategoryList = res;
    });

    $scope.data = {
        cateName: '',
        selected: ''
    }

    httpService.get('api/UserBaseInfo/GetListTeacherInfo', {
        SchoolFID: schoolId
    }).then(function (res) {
        $scope.teacherList = res;
    });

    $scope.addCourseCate = function () {
        $scope.addCategoryDialog = $modal.open({
            templateUrl: 'addCourseCate',
            scope: $scope,
            controller: 'courseCateCtrl'
        });
    };

    $scope.closeAlert = function() {
        $scope.alertVisible = false;
        this.message = '';
    }
});

angular.module('MetronicApp').controller('courseCateCtrl', function ($scope, $http, httpService, userId, schoolId, userName) {
    $scope.doSave = function () {
        $scope.courseCategoryList.push({
            CourseCategoryName: $scope.data.cateName,
            Creater: userName,
            FlnkID: userId,
            HeadTeacher: $scope.data.selected.FlnkID,
            IsDelete: false,
            Modifier: userName,
            SchoolFID: schoolId,
            SetFID: "1",
            SortCode: this.courseCategoryList.length + 1
        });
        httpService.post('api/BasicSetInfoI/SaveListCourseCategory', $scope.courseCategoryList).then(function(res){
            $scope.addCategoryDialog.close();
            $scope.message = '添加课程类别成功！';
            $scope.alertVisible = true;
        }, function(){
            $scope.addCategoryDialog.close();
            $scope.courseCategoryList.splice(-1, 1);
            $scope.$parent.message = '添加课程类别失败！';
            $scope.$parent.alertVisible = true;
        })
    }
});