var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;
var fs = require('fs');

var bodyParser = require('body-parser');

var jarPath = 'C:\\Users\\Trey\\Documents\\NodeJSPractice\\NodeApp\\myapp\\test.jar ';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {
    
    if (!req.files.UPLOADFILE) { //no files
    
        var input = (req.body.QUERY).toString();
    
        //console.log(req.body);
    
        var childProcess = exec('java -jar ' + jarPath + "\"" + input + "\"", 
            function(err, stdout, stderr) {
                if (err) {
                    console.log(err)
                }
                console.log(stdout)
            });
    
        res.render('index', { title: 'Express' });
        
    }
    else {
        
        var inputFile = req.files.UPLOADFILE.data.toString('utf8');
        
        var childProcess = exec('java -jar ' + jarPath + "\"" + inputFile + "\"", 
            function(err, stdout, stderr) {
                if (err) {
                    console.log(err)
                }
                console.log(stdout)
            });
    
        res.render('index', { title: 'Express' });
        
    }
    
});

    
 

module.exports = router;
