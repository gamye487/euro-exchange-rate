function load_rate() {
	// Declare json objects
	var json_exchangeRateDataText, json_exchangeRateData;
	// Declare arrays to store data
	var currency = [];
	var exchangeRate=[]
	var exchangeRateAdjusted = [];
	// Declare a variable to store the index of HKD
	var index_hkd;
	// Reading json file
	var requestURL = 'http://data.fixer.io/api/latest?access_key=fe3a9b3f9ac173a3e51d8ea22951cf95';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'text';
	request.send();

    request.onload = function() {
		json_exchangeRateDataText = request.response;
		json_exchangeRateData = JSON.parse(json_exchangeRateDataText);
		var json_exchangeRate = json_exchangeRateData.rates;
	  
		var count = 0;
		
		// Read the currency type, exchange rates and adjusted rates in lists of arrays
		for (x in json_exchangeRate) {
			if (x=="HKD") index_hkd = count;
			currency.push(x);
			count = count + 1;
		}
		
		count = 0;

		for (x in json_exchangeRate) {
			exchangeRate.push(json_exchangeRate[x]);
			count = count + 1;
		}

		for (x in json_exchangeRate) {
			exchangeRateAdjusted.push((json_exchangeRate[x] + 10.0002));
		}
		// Create a table
		tableCreate(currency.length + 1,3);
	}
	
	function tableCreate(noOfRows, noOfColumns){
		document.write ("<table border=1>");
		for(var i = 0; i < noOfRows; i++){
			document.write ("<tr>");
			for(var j = 0; j < noOfColumns; j++){
				if (i==0) {
					if (j==0) document.write ("<td align=center>Currency</td>");
					if (j==1) document.write ("<td align=center>Original Rate</td>");
					if (j==2) document.write ("<td align=center>New Rate</td>");;
				}
				else {
					if (j==0) document.write ("<td align=center>" + currency[i-1] + "</td>");
					if (j==1) {
						if (index_hkd==(i-1) || checkEvenNumber(exchangeRate[i-1])==true) document.write ("<td align=center><table bgcolor=red><td bgcolor=white>" + exchangeRate[i-1] + "</td></table></td>");
						else document.write ("<td align=center>" + exchangeRate[i-1]  + "</td>");
					}
					if (j==2)  {
						if (index_hkd==(i-1) || checkEvenNumber(exchangeRate[i-1])==true) document.write ("<td align=center><table bgcolor=red><td bgcolor=white>" + Number((exchangeRateAdjusted[i-1]).toFixed(6)) + "</td></table></td>");
						else document.write ("<td align=center>" + Number((exchangeRateAdjusted[i-1]).toFixed(6))  + "</td>");
					}
			}
		}
		document.write ("</tr>");
	}
	document.write ("</table>");
}

function checkEvenNumber (number) {
	if (number%2<1) return true;
	else return false;
}
var title = "Table of Euro exchange rates";
document.write ("<h2>" + title + "</h2>");
 
}
