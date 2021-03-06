'use strict';


/*
 *  Controller of tab-guards.html 
 *  --> Page for: BABYSITTER | List of guard accepted/waiting/finished
*/ 



angular.module('deedoo').controller('guardsController', function ($rootScope, $scope, $state, $firebase, config) {

    /*
     * Must be connect
     */
    if (!config.logged) {
        $state.go('connect');
        return;
    }

    /*
     * Firebase
     */
    var ref     = new Firebase(config.firebaseUrl + 'ROOM'),
        rooms   = $firebase(ref).$asArray();

   
    $scope.babysitter = config.user;

    rooms.$watch(function() {
        rooms.$loaded().then(function (result) {
            $rootScope.guards = [];
            for (var i = 0; i < result.length; i++) {

                if (rooms[i].id_babysitter == $scope.babysitter.$id) {

                    $rootScope.guards.push({
                        'id_room'         : rooms[i].$id,
                        'id_parent'       : rooms[i].id_parent,
                        'status'          : rooms[i].status,
                        'date'            : rooms[i].date,
                        'time_beginning'  : rooms[i].time_beginning,
                        'time_ending'     : rooms[i].time_ending,
                        'children'        : rooms[i].children,
                        'parent_lastname' : rooms[i].lastname_parent,
                        'parent_firstname': rooms[i].firstname_parent
                    });

                }

            }
        });
    });

    $scope.confirmGuard = function (idRoom, booleen) {
        if (booleen) {
            $state.go('tab.working', {idRoom: idRoom});
        }
        else {
            var refRoom  = new Firebase(config.firebaseUrl + 'ROOM/' + idRoom);
            var syncRoom = $firebase(refRoom);
            $state.go('informationGuard', {idGuard: idRoom});
        }

    };

});