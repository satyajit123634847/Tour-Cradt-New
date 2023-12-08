const mongoose = require("mongoose") 
// const client = require('../db.js')

// ----------testing database ------------------------------------//

    const con = mongoose.connect("mongodb+srv://EV:Mahi123@cluster0.tadgngw.mongodb.net/tour-craft?retryWrites=true&w=majority")

    .then(success => {
        console.log('database connected')
    })
    .catch(error => {
        console.log("error while connecting database", error)
    })



 


  

    
