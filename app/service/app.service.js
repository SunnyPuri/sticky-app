app.service('api', ['$http',function($http){
    
    var url = window.location.href;
    var arr = url.split("/");
    
    
    this.note = function(){
        var result = "app/data/notes.json";
        return $http.get(result);
    }
    
}]);