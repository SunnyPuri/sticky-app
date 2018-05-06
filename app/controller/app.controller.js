app.controller('mainController',['$scope','api', function($scope,api){
    
    let length = 0;
    
    $scope.title = '';
    $scope.description = '';
    $scope.notes = [];
    $scope.hideMe = false;
    
    $scope.togglePanel = false;
    
    var noteColor = ['#fff','#ff8a80','#80d8ff','#ffd180'];
    

    api.note().then(function(response){
        $scope.notes = response.data;
        length = $scope.notes.length;
    });


    $scope.addNote = function(){
        $scope.hideMe = false;
        
        if($scope.title != '' || $scope.description != ''){

            var data = {_id: length ,'title': $scope.title, 'description': $scope.description,'color': $scope.currentSkin, 'date': new Date(), 'edit': false};
            

            $scope.notes.unshift(data);
            length++;
        }
        
        $scope.title = '';
        $scope.description = '';
        
    }
    
    
    $scope.currentSkin = '#fff';

    $scope.skinList = ['#fff','#ff8a80','#80d8ff','#ffd180'];

    $scope.skinSwitch = function (color) {
        $scope.currentSkin = color;
    }
    
    
    $scope.currentFilterSkin = [];

    $scope.filterSkinList = [
        {
            color: '#fff'
        },
        {
            color: '#ff8a80'
        },
        {
            color: '#80d8ff'
        },
        {
            color: '#ffd180'
        }
    ];

    $scope.filterSkinSwitch = function (color) {
        if($scope.currentFilterSkin.indexOf(color)!=-1){
            $scope.currentFilterSkin.splice($scope.currentFilterSkin.indexOf(color),1);
        }else{
            $scope.currentFilterSkin.push(color);    
        }
    }
    
    
    $scope.editSkinSwitch = function (color, id) {

        let data = $scope.notes.filter(function(note){
            return note._id == id;
        })[0];
        data.color = color;
    }
    
    
    
    $scope.deleteNote = function(id){

        $scope.notes = $scope.notes.filter(function(note){
            return note._id != id;
        });
    }
    
    $scope.copyNote = function(id){

        let data = $scope.notes.filter(function(note){
            return note._id == id;
        })[0];
        let copy = {};
        copy._id = length;
        copy.title = data.title;
        copy.description = data.description;
        copy.color = data.color;
        copy.date = new Date();
        $scope.notes.unshift(copy);
        length++;
    }
    
    $scope.search = '';
    
    $scope.searchNote = function (row) {
        return (angular.lowercase(row.title).indexOf(angular.lowercase($scope.search.replace(/^\s+|\s+$/g, '')) || '') !== -1 ||
                angular.lowercase(row.description).indexOf(angular.lowercase($scope.search.replace(/^\s+|\s+$/g, '')) || '') !== -1);
    };

    
}]);
