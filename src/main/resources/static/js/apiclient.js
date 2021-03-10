var apidata = (function () {
        
        var Url = 'http://localhost:8080/blueprints/';
        
        
        return{
            getBlueprintsByAuthor: function(author, callback) {
                $.get(Url+author, function(resp){
                    callback(resp);
                });
                
            },
            getBlueprintsByNameAndAuthor: function(name, author, callback) {
                $.get(Url+author+"/"+name,function(resp){
                    callback(resp);
                    
                });
                
                
            }
            
        };
        
        
})();
