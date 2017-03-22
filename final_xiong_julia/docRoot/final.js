var divReg;
var divMain;
document.addEventListener("DOMContentLoaded", function(){
	
	//for #divRegistered
	divReg = document.getElementById("divRegistered");
	//for #divMain
	divMain = document.getElementById("divMain");

	//Any element in divMain with focus will have background-Color of yellow
	divMain.addEventListener("focus", fHandleEnter, true);
	//Any element in divMain with blur will return background-Color to white
	divMain.addEventListener("blur", fHandleExit, true);

	//array of all input elements in the form that have attribute type = text or type = password
	var inputElements = document.getElementById("frmRegister").querySelectorAll("input[type='password'],[type='text']");
	//for testing: display alert with id of each inputElements element
	/*
	for (i = 0; i < inputElements.length; i++){
		alert("inputElement(" + i + "): " + inputElements[i].id);
	}
	*/

	//array of all span elements in the form 
	var spanElements = document.getElementById("frmRegister").querySelectorAll("span");
	//for testing: display alert with id of each spanElement element
	/*
	for (i = 0; i < spanElements.length; i++){
		alert("spanElements(" + i + "): " + spanElements[i].id);
	}
	*/


	//event handler for checking login with min length = 7 and max = 15
	inputElements[0].addEventListener("blur", function(){
		fCheckSame(inputElements[0].value,spanElements[0]);
	});
	//event handler for password length
	//inputElements[1].addEventListener("blur", function(){
		//fCheckLength(inputElements[1].value, spanElements[1]);

	//});

	//event handler for password, compares password values after blur on second value
	inputElements[2].addEventListener("blur", function(){
		fCompareInput(inputElements[1].value, inputElements[2].value, spanElements[2]);
	});

	//event handler for email validity with @ and .
	inputElements[3].addEventListener("blur", function(){
		fCheckEmail(inputElements[3], spanElements[3]);
	});

	//event handler for email, compares email values after blur on second value
	inputElements[4].addEventListener("blur", function(){
		fCompareInput(inputElements[3].value, inputElements[4].value, spanElements[4]);
	});

	//check that all fields are filled in on submit
	$(document).ready(function() {
		$('#frmRegister').submit(function() {
			//note: $.trim gets rid of white space //note: val() gets value, .value didn't work
		    if ($.trim($("#txtLogin").val()) === "" || $.trim($("#txtPassword").val()) === "" || $.trim($("#txtConfirmPassword").val()) === "" ||$.trim($("#txtEmail").val()) === "" ||$.trim($("#txtConfirmEmail").val()) === "") {
		        alert("Fill out all fields");
		        return false;
		    }
		});
	});

	fProcessForm(inputElements);
});




//function for changing style background-color to yellow
function fHandleEnter(e){
	e.target.style.backgroundColor = "yellow";
}


//function for changing style background-color to white
function fHandleExit(e){
	e.target.style.backgroundColor = "white";
}


//function for form submission
function fProcessForm(inputElements){
	//best to use decodeURIComponent even if location.search is simple, may have special characters
	var strQueryString = decodeURIComponent(location.search); 
	
	//alert(strQueryString);
	//alert("query string length: " + strQueryString.length);
	//?Login=aa&Password=bb&Confirm_Password=cc&Email=dd&Confirm_Email=ee

	//reqExp to find the Login
	var loginExp = /Login=(\w*)&/;

	//use non-global match() for login
	var loginMatch = strQueryString.match(loginExp); 

	//if statement just in case the loginMatch is undefined
	if (loginMatch){
		//alert("login is: " + matchtext[1]); 
		//match() with non-global returns entire match and individual matches in array, to get the individual use array position ex.[1].
		var login = loginMatch[1];
		
		//check to see if query string is > 0
		if (strQueryString.length > 0) {
			//hide the #divMain div
			$(divMain).hide();
			//show the #divRegister div slowly
		    $(divReg).fadeIn(1000);
		    //append text to divRegister
		    $(divReg).append("Thank you, " + login + ". You are now registered.");
		}
		//check to see if query string is == 0
		if (strQueryString.length == 0) {
			//hide the #divMain div
			$(divMain).fadeIn();
			//show the #divRegister div
		    $(divReg).hide();
		}
	}
}


//function to compare Email and Password input values
function fCompareInput(value1, value2, display){
	//if at least one value is empty
	if (value1.length == 0 || value2.length == 0) {
		display.innerHTML = "Missing Entry"; 
		display.style.backgroundColor = "red";
	}

	//if both value1 and value2 exist
	//else {
		//if value1 and value2 are equal
		if (value1==value2) {
			display.innerHTML = "Entries match";
			display.style.backgroundColor = "green";
		}
		//if value1 and value2 are  NOT equal
		else {
			display.innerHTML = "Entries do not match";
			display.style.backgroundColor = "red";

		}
	//}

}


//function to check length requirement 7-15 characters
function fCheckSame(value, display){
	//if login length < 7
	if (value.length < 7) {
		display.innerHTML = "Length: " + value.length + ". Need 7-15 characters";
		display.style.backgroundColor = "red";
		//return false;
	}
	//if login length >15
	if (value.length > 15) {
		display.innerHTML = "Length: " + value.length + ". Need 7-15 characters";
		display.style.backgroundColor = "red";
		//return false;
	}
	//if login is between 7-15 characters
	if (value.length >= 7 && value.length <= 15) {
		display.innerHTML = "Valid";
		display.style.backgroundColor = "green";
	}

}

//function to check validity of email with an @ and .
function fCheckEmail(email, display) {
    var x = email.value;
    var atPos = x.indexOf("@"); //positon of the @
    var dotPos = x.lastIndexOf("."); //position of the .
    //if email is invalid
    if (atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= x.length) {
        display.innerHTML = "Not Valid";
		display.style.backgroundColor = "red";
    }
    //if email is valid
    else {
    	display.innerHTML = "Valid";
		display.style.backgroundColor = "green";
    }
}

