$("#submit").onclick(function() {
	var email = $("#email").val();
	var message = $("#message").val();
	
	if (email == "" || email == undefined) {
		$(window).alert("Please input an email");
	} else if (email) { //not valid email regex
		alert("Invalid email");
	} else if (message=="" || message == undefined) {
		alert("Please enter a message");
	} else {
		//submit email to me
	}
});
