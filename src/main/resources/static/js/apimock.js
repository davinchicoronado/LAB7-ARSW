var apimock = (function () {

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
        }
    ]

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
        }
    ]
    
    mockdata['AndresDavila'] = [
        {
            author: 'AndresDavila',
            name: 'perreo',
            points: [
                {
                    x: 40,
                    y: 30
                },
                {
                    x: 55,
                    y: 45
                },
                {
                    x: 90,
                    y: 70
                },
            ]
        }
    ]
    mockdata['DavidCoronado'] = [
        {
            author: 'DavidCoronado',
            name: 'Corogay',
            points: [
                {
                    x: 30,
                    y: 90
                },
                {
                    x: 80,
                    y: 40
                },
                {
                    x: 90,
                    y: 50
                },
            ]
        }
    ]
    mockdata['VladimirPutin'] = [
        {
            author: 'VladimirPutin',
            name: 'rusia',
            points: [
                {
                    x: 70,
                    y: 96
                },
                {
                    x: 25,
                    y: 60
                },
                {
                    x: 80,
                    y: 56
                },
                {
                    x: 20,
                    y: 30
                },
                {
                    x: 15,
                    y: 85
                },
            ]
        }
    ]


    return {
        getBlueprintsByAuthor: function(author, callback) {
            callback(null, mockdata[author]);
        },

        getBlueprintsByNameAndAuthor: function(name, author, callback) {
            blueprint = mockdata[author].find(function(blueprint) {
                return blueprint.name == name
            });
            callback(null, blueprint)
        }
    }

})();
