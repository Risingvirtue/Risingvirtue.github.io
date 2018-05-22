$(document).ready(function(){

})

$(window).resize(function() {

	
});

function submitForm() {
	var name = $("#name").val();
	var email = $("#email").val();
	var message = $("#message").val();
	if (name == "") {
		$("#tool-name").css('display', 'block');
	} else if (email == "") {
		$("#tool-email").html('Please fill out this field.');
		$("#tool-email").css('display', 'block');
	} else if (!validateEmail(email)) {
		$("#tool-email").html('Please enter a valid email.');
		$("#tool-email").css('display', 'block');
	} else {
		alert("Your message has been sent!");
		$("#name").val("");
		$("#email").val("");
		$("#message").val("");
	}
}

function emailChange() {
	$("#tool-email").css('display', 'none');
}

function nameChange() {
	$("#tool-name").css('display', 'none');
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}