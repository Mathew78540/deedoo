'use strict';

angular.module('deedoo').controller('loginController', function ($scope, $state, $filter, $firebase, config) {

    var ref     = new Firebase(config.firebaseUrl+'MEMBERS'),
        members = $firebase(ref).$asArray();

    /*
     * Show StatusBar
     */
    StatusBar.show();

    /*
     * Connect the USER
     */
    $scope.connect = function () {

        members.$loaded().then(function (result) {

            for (var i = 0; i < result.length; i++) {

                if (members[i].mail == $scope.data.email && members[i].password == $filter('hash')($scope.data.password+config.sold)) {
                    config.user = members[i]; // Save User
                    config.logged = true;
                    $state.go((config.user.type == 'parent') ? 'newTask': '');
                }

            }

        });

    };


});