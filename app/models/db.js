var mongoose = require('mongoose');
var url = 'mongodb://localhost/Assignment';

mongoose.connect(url,{useNewUrlParser: true}).then(()=>{
    console.log('Database sucessfully connected.')
},
error => {
    console.log('Database not connected: ' + error)
}
)

module.exports = mongoose;