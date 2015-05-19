'use strict';

angular.module('leaguegenApp')
    .controller('EquipController', function ($scope, Equip, Grup, Partit, Jugador, EquipSearch) {
        $scope.equips = [];
        $scope.grups = Grup.query();
        $scope.partits = Partit.query();
        $scope.jugadors = Jugador.query();
        $scope.loadAll = function() {
            Equip.query(function(result) {
               $scope.equips = result;
            });
        };
        $scope.loadAll();

        $scope.showUpdate = function (id) {
            Equip.get({id: id}, function(result) {
                $scope.equip = result;
                $('#saveEquipModal').modal('show');
            });
        };

        $scope.save = function () {
            if ($scope.equip.id != null) {
                Equip.update($scope.equip,
                    function () {
                        $scope.refresh();
                    });
            } else {
                Equip.save($scope.equip,
                    function () {
                        $scope.refresh();
                    });
            }
        };

        $scope.delete = function (id) {
            Equip.get({id: id}, function(result) {
                $scope.equip = result;
                $('#deleteEquipConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Equip.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteEquipConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.search = function () {
            EquipSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.equips = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $('#saveEquipModal').modal('hide');
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.equip = {nom: null, gols_favor: null, gols_contra: null, pj: null, pg: null, pe: null, pp: null, data_alta: null, pagat: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
