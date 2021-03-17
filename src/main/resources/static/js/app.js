/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var app = (function(){
    
    var author;
    var appdata;
    var nameBlueprint;
    var newPoints;
    var operation;
    var Url;
   
   
    var flag;
    var canvas;
    var flag2=false;
    var lastPt = null;
    var ctx;
    var draw=true;
    
    
    
    var getBlueprints= function(authorName, value){ 
        
        nameBlueprint=null;
        lastPt = null;
        newPoints = null;
        operation=null;
        
        if(flag2){
            cleanCanvas();
            listenNotCanvas(); 
        } 

        
        draw=true;
        
        $("#nameBlueprintInput").hide();
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
        
        operation="update";
        newPoints=[];
        $("#nameBlueprintInput").hide();
        
        if (flag2){
            cleanCanvas(); 
            
        }
        draw=true;
        flag2=true;
        
        
        
        $("#TableBlueprints").on("click",".btnSelect", function(){
            
           var currentRow=$(this).closest("tr");    
           nameBlueprint = currentRow.find("td:eq(0)").text().trim();
           
           $.getScript(Url,function(){
              apidata.getBlueprintsByNameAndAuthor(nameBlueprint,author,callback2);           
           });
        });     
    };
 
    var saveupdatebluePrint = function(namebp){
        
        if(operation=="update"){
            setbluePrint();
        }
        else if (operation=="new"){
            nameBlueprint =  namebp;
            savebluePrint();
        }
        else{
            alert ("Debe escoger algun plano o crear uno nuevo");
        }
    };
    
    
    var setbluePrint = function(){
        if( newPoints.length==0){
            alert ("No ha echo cambios");
        }else{
            var updatebp = {author:`${author}`,name:`${nameBlueprint}`,points:newPoints};                  
            $.getScript(Url,function(){
                apidata.updatebluePrint(nameBlueprint,author,updatebp,callback5);                          
            });                 
    
        }       
        
        
    };
    
    var savebluePrint = function(){
        if( newPoints.length==0){
            alert ("Debe dibujar el plano");
        }else{ 
            
            var newbp = {author:`${author}`,name:`${nameBlueprint}`,points:newPoints};
            $.getScript(Url,function(){
                apidata.newbluePrint(newbp,callback3);                          
            }); 
            
  
        }
        
        
        
    };
        
    var deletebluePrint = function(){
        if(nameBlueprint===null){
            alert("Debe escoger un plano");
        }else{
            $.getScript(Url,function(){
                apidata.deletebluePrint(nameBlueprint,author,callback4);                          
            });        
        }
        
        
    }; 
    
    var newbluePrint = function(){ 
        if(flag2){
            cleanCanvas();
        } 
        operation="new";
        $("#nameBlueprint").empty();
        newPoints=[];
        nameBlueprint=null;
        $("#nameBlueprintInput").show();
        
        
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d"); 
        
        
        
        listenClickCanvas();  
        
    };
 
    
    var callback = function(resp){
        
        
        $("#nameAuthor").html(`${author}`+"'s blueprints");
        
        
        
        for(let blueprint of resp){
            appdata.push({name:blueprint.name,numOfPoints:blueprint.points.reduce(function(cont){return cont+1;},0)});
        }
        
        $("#tbody").empty(nameBlueprint);
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
        
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d"); 
        
        $("#nameBlueprint").html("Current blueprint: "+`${nameBlueprint}`);
        
        

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
      
        listenClickCanvas();  
        
    }; 
    
    var callback3 = function(){
        alert ("Guardado");
        newPoints=[]; 
        listenNotCanvas(); 
        getBlueprints(author,true);
        
    };
    
    var callback4 = function(){       
        alert("Eliminado");
        nameBlueprint=null;    
        getBlueprints(author,true);
    };
    
    var callback5 = function(){
        alert ("Guardado");
        getBlueprints(author,true); 
        
    };
    
    
    var listenClickCanvas = function(){
        canvas.addEventListener("pointerdown",drawbluePrint , false);     
    };
    
    var drawbluePrint = function(event){
          
          if (draw){
              cleanCanvas();
              draw=false;
          }
          var relativeX=$(canvas).closest('.col').position().left;
          var relativeY=$(canvas).closest('.col').position().top;
          
          var x2=event.pageX-relativeX;
          var y2=event.pageY-relativeY;
          
          if(lastPt!==null) {
  
            var x1= lastPt.x;
            var y1= lastPt.y;
        
            ctx.beginPath();
            // Start at previous point
            ctx.moveTo(x1, y1);
            // Line to latest point
            ctx.lineTo(x2, y2);
            // Draw it! 
            ctx.stroke();
            
            
            
        } 
        
        //Store latest pointer
        lastPt = {x:x2, y:y2};
        
        newPoints.push({x:x2,y:y2});
   
    };
    
    var listenNotCanvas = function(){
        canvas.removeEventListener("pointerdown",drawbluePrint , false); 
    };
     
    var cleanCanvas = function(){
        canvas.width=canvas.width;       
    };
    
    return{
        
        getbluePrints: function(author){           
            getBlueprints(author,true); 
            event.preventDefault();
        },
        paintbluePrint: function(){
            paintbluePrint();
            event.preventDefault();
        }, 
        saveupdatebluePrint: function(namebp){
            saveupdatebluePrint(namebp);
            event.preventDefault();
            
        },
        deletebluePrint : function(){
            deletebluePrint();
            event.preventDefault();
        },    
        newbluePrint : function(){
            newbluePrint();
            event.preventDefault();
        }
        
        
    };
})(); 