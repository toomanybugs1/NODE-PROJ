var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;
var fs = require('fs');

var bodyParser = require('body-parser');
var Chart = require('chart.js')

var jarPath = 'C:\\Users\\Trey\\Documents\\NodeJSPractice\\NodeApp\\myapp\\test.jar ';

function parseProteins(inputTxt){
    
    var proteins = [];
    
    var proteinsText = inputTxt.split(">"); //first we split our sequences
    
    for (i = 1; i < proteinsText.length; i++) {
        
        var curProt = {
            
            head : "",
            name: "",
            entries : [],
            
        }
        
        var headBody = proteinsText[i].split('\n'); //separates head and body
        var curEntries = headBody[1].split(' '); //splits our entries
        
        curProt.head = headBody[0];
        curProt.name = curProt.head.substr(0, 6); 
        curProt.entries = curEntries;
        
        proteins.push(curProt);
    }

    return proteins;
    
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
    
router.post('/', function(req, res) {
    
    if (!req.files.UPLOADFILE) { //no files
    
        var input = (req.body.QUERY).toString();
        
        var inputProteins = parseProteins(input);
        
        
        res.render('output', {title: 'Express', proteins: inputProteins});
        
    }
    else {
        
        var inputFile = req.files.UPLOADFILE.data.toString('utf8');
        
        var inputProteins = parseProteins(inputFile);
        
        console.log("Entries: " + inputProteins.length);
        
        res.render('output', {title: 'Express', proteins: inputProteins});
        
    }
    
});
    

    
 

module.exports = router;
//module.exports = inputProteins;
