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
            }, 
            updatebluePrint: function(name, author, bprint,callback){
                $.ajax({
                        type: 'PUT',
                        url: Url+`${author}`+"/"+`${name}`,
                        contentType: 'application/json',
                        data: JSON.stringify(bprint),
                        success: function(resp){
                            callback();
                        }
                    });   
            },
            newbluePrint: function(newbp,callback){
                $.ajax({
                        type: 'POST',
                        url: Url,
                        contentType: 'application/json',
                        data: JSON.stringify(newbp),
                        success: function(resp){
                            callback();
                        }
                    });                
                
                
                
            }, 
            
            deletebluePrint: function(name, author,callback){
                    $.ajax({
                        type: 'DELETE',
                        url: Url+`${author}`+"/"+`${name}`,
                        success: function(resp){
                            callback();
                        }
                    });  
                
                
            }
            
            
        };
        
        
})();
