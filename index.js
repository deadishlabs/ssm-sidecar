var AWS = require('aws-sdk');
var fs = require('fs');
AWS.config.update({region:'us-east-2'});
var ssm = new AWS.SSM();

fs.readFile('Secretfile', function(err, data) {
 
    if(err) throw err;
    
    var line = data.toString().split("\n")
    
    for(i in line) {

        let values = line[i].toString().split(" ");
        
        let params = {
          Names: [values[1]],
          WithDecryption: true
        };
        ssm.getParameters(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     // console.log(data);           // successful response
          
          console.log("\x1b[32m*\x1b[0m Setting " + "\x1b[4m\x1b[31m" + values[0] + "\x1b[0m" + " to whatever " + "\x1b[4m\x1b[31m" + values[1] + "\x1b[0m" + " is set to in Parameter Store\x1b[0m \x1b[32m*\x1b[0m") 
          
          fs.appendFile('env-example', values[0] + '=' + data.Parameters[0].Value + '\n', function (err) {
            if (err) return console.log(err);
          });
          
        });
        
    }
    
});