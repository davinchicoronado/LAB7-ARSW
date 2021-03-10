/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var app = (function(){
    
    var author;
    var appdata;
    var nameBlueprint;
    var c;
    var ctx;
    var Url;
    var flag;
    
    var getBlueprints= function(authorName, value){ 
        author = authorName;
        appdata = [];
        flag = value;
        
        if(flag){
            Url = "js/apiclient.js";
        } 
        else{
            Url = "js/apimock.js";
        }
        
        
        $.getScript(Url, function(){
            apidata.getBlueprintsByAuthor(author,callback);
        });
        
    };
         
    var  paintbluePrint = function(){
        
        $("#Blueprints").on("click",".btnSelect", function(){
            
           var currentRow=$(this).closest("tr");    
           nameBlueprint = currentRow.find("td:eq(0)").text().trim();
           
           $.getScript(Url,function(){
              apidata.getBlueprintsByNameAndAuthor(nameBlueprint,author,callback2);           
           });
        });
        
    };
    
    
    var callback = function(resp){
        

        $("#nameAuthor").html(`${author}`+"'s blueprints");
        c = document.getElementById("myCanvas");
        ctx = c.getContext("2d"); 
        c.width=c.width;
        
        for(let blueprint of resp){
            appdata.push({name:blueprint.name,numOfPoints:blueprint.points.reduce(function(cont){return cont+1;},0)});
        }
        
        $("#tbody").empty();
        $("#nameBlueprint").empty();
        
        for(let blueprint of appdata){
               $("#tbody").append(
                      `
                      <tr>
                       <td>${blueprint.name} </td>
                       <td>${blueprint.numOfPoints}</td>
                      <td onClick="app.paintbluePrint()"><button class="btnSelect">Open</button></td>
                      </tr>
                      `
                      );
        }
        
        var totalPoints = appdata.reduce(function(cont,index){return cont+index.numOfPoints;},0);
        
        $("#totalPoints").html("Total user points: "+`${totalPoints}`);
        
    
    };
    
    var callback2 = function(resp){
        
        
        $("#nameBlueprint").html("Current blueprint: "+`${nameBlueprint}`);
        
        c.width=c.width;

        var flag = true;
        for(let punto of resp.points){
            if (flag){
                ctx.moveTo(punto.x,punto.y);
                flag = false;
            }
            else{
                ctx.lineTo(punto.x,punto.y);
            }
            ctx.stroke();
        }
        
        
        
    };
    
    return{
        getbluePrints: function(author){           
            getBlueprints(author,false); 
            event.preventDefault();
        },
        paintbluePrint: function(){
            paintbluePrint();
            event.preventDefault();
        }
    };
})(); 