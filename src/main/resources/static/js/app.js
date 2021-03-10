/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function myFunction(author) {

    console.log(author);

    const Url = 'localhost:8080/blueprints/' + author;
    fetch(Url)
    .then(data=>{return data.json()})
    .then(res=>{console.log(res)});
    
    
}