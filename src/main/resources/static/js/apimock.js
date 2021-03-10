var apidata = (function () {

    var mockdata = [];

    mockdata["JhonConnor"] = [
        {
            author: "JhonConnor",
            name: "house",
            points: [
                {
                    x: 10,
                    y: 20
                },
                {
                    x: 15,
                    y: 25
                },
                {
                    x: 45,
                    y: 25
                }
            ]
        },
        {
            author: "JhonConnor",
            name: "bike",
            points: [
                {
                    x: 30,
                    y: 35
                },
                {
                    x: 40,
                    y: 45
                }
            ]
        },
        {
            author:"JhonConnor",
            name:"Centro comercial",
            points: [
                {
                    x:15,
                    y:22
                },
                {
                    x:55,
                    y:15
                    
                },
                {
                    x:19,
                    y:36
                }
                
            ]
            
            
        }
    ]
    ;
    mockdata['LexLuthor'] = [
        {
            author: 'LexLuthor',
            name: 'kryptonite',
            points: [
                {
                    x: 60,
                    y: 65
                },
                {
                    x: 70,
                    y: 75
                }
            ]
        },
        {
            author:'LexLuthor',
            name: 'La casa de los dibujos',
            points: [
                {
                    x:15,
                    y:34
                },
                {
                    x:33,
                    y:55
                    
                },
                {
                    x:44,
                    y:60
                }
            ]
        }
    ]
    ;
    return {
        getBlueprintsByAuthor: function(author, callback) {
            callback(mockdata[author]);
        },
        
        getBlueprintsByNameAndAuthor: function(name, author, callback) {
            
            blueprint = mockdata[author].find(function(blueprint) {
                return blueprint.name === name;
            });
            callback(blueprint);
        }
    };

})();