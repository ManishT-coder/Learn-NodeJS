function add( a,b) {
    return a+b;
}

function sub ( a,b) {
    return a-b;
}

// if we want a multiple function to export we not write like this
// module.exports = add;
// module.exports = sub;
// module.exports =mul;
// because to write module.exports= mul; 
// will override the previous exports and 
// we will get only mul function in hello.js file
//  but not add and sub function so to avoid 
// this we use below way to export multiple functions


// if we want a multiple function to export we use this way 
module.exports = {
    add: add,
    sub: sub,
    mul: function(a,b) {
        return a*b;
    }
};