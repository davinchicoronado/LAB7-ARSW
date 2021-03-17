/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var apiclient = (function () {
    return {
        getBlueprintsByAuthor: function (author, callback) {
            const prints = $.get({
                url: "/blueprints/" + author,
                contentType: "application/json",
            });
            prints.then(function (data) {
                    callback(null, data);
                }, function (error) {
                    alert("No existen blueprints del autor!")
                }
            );
        },

        getBlueprintsByNameAndAuthor: function (name, author, callback) {
            const prints = $.get({
                url: "/blueprints/" + author + "/" + name,
                contentType: "application/json",
            });
            prints.then(function (data) {
                    callback(null, data);
                }, function (error) {
                    alert("No existen blueprints del autor")
                }
            );
        }
    }
})();
