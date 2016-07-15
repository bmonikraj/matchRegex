function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



function ajaxCall() {
	var regexString = document.getElementById("regexTextArea").value;
	var textString = document.getElementById("stringTextArea").value;
	var csrftoken = getCookie('csrftoken');
	var dataObj = new Object();
	dataObj.regexString = regexString;
	dataObj.textString = textString;
	var dataJSON = "jsonData="+JSON.stringify(dataObj);

	var ajaxObj = new XMLHttpRequest();
	ajaxObj.onreadystatechange=function(){
		if(ajaxObj.readyState==4 && ajaxObj.status==200){
		    responseResult = ajaxObj.responseText;
		    displayResult(responseResult);
		}
	}

	ajaxObj.open("POST", "regexService/",true);
	ajaxObj.setRequestHeader("X-CSRFToken", csrftoken); //Required for django cross site request protection forgery
	ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded") //Reuired for POST method
	ajaxObj.setRequestHeader("X-Requested-with", "XMLHttpRequest"); //Required for django to understand if ajax method
	ajaxObj.send(dataJSON);

}

function displayResult(jsonResult) {
    var responseGot = JSON.parse(jsonResult);
    var htmlResult = 'Total Matches Found : ' + responseGot.totalOcc.toString() + '\n';
    if(responseGot.totalOcc > 0){
    	for (var i=0;i<responseGot.occArr.length;i++){
        htmlResult = htmlResult + 'Occurence Number ' +(i+1).toString()+ ' : '+ responseGot.occArr[i].text.toString() + '\n';
    }
    }
    document.getElementById("matchTextArea").innerHTML = htmlResult;
}
