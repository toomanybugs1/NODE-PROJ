var output = '';

function testFunction() {
	
	var inputFile = document.getElementById("upl");
	
	if (inputFile.value == "") { //this makes sure we didn't upload a file
		var input = String(document.getElementById("seq").value);
		var chars = ['C', 'G', 'A', 'T'];
	
		var i;
		for (i = 0; i < input.length; i++){
		
			if (i % 2 == 0)
				output += chars[Math.floor(Math.random()*chars.length)];
			else
				output += input.charAt(i);
		
		}
	
		var outWin = window.open("/output");
	} 
	else {
		
		readSingleFile(inputFile.value);
		
	}
	
}

function loadOutput() {
	
	var inputWindow = window.opener;
	
	window.document.getElementById("oField").innerHTML = inputWindow.output;
	
}