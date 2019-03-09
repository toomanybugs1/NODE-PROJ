var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;
var fs = require('fs');

var bodyParser = require('body-parser');
var Chart = require('chart.js')

function parseProteins(inputTxt){
    
    var proteins = [];
    
    var proteinsText = inputTxt.split(">"); //first we split our sequences
    
    for (i = 1; i < proteinsText.length; i++) {
        
        var curProt = {
            
            head : {
                
                name: "",
                domainNum: 0,
                domains: [],
                entryNum: 0,
                
            },
            
            entries : [],
            
        }
        
        var headBody = proteinsText[i].split('\n'); //separates head and body
        var curEntries = headBody[1].split(' '); //splits our entries
        
        var headRaw = headBody[0].split('_');

        curProt.head.name = headRaw[0]; 
        curProt.head.domainNum = parseInt(headRaw[1]);
        
        var tempDomainNums = [];

        curProt.head.domains = headRaw[2].split(' ');
        
        curProt.head.entryNum = parseInt(headRaw[3]);
        
        curProt.entries = curEntries;
        
        proteins.push(curProt);
    }
    
    console.log(proteins[0].head);

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
