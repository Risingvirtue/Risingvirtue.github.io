$(document).ready(function() {
	$("#myButton").click(function() {
		var name = $("#name").val();
		var phone = $("#phone").val();
		var message = $("#message").val();
		var phoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
		//alert("he");
		if (name == "" || name == undefined) {
			alert("Please enter a valid name");
		} else if (!phone.match(phoneReg)) {
			alert("Please enter a valid phone number");
		} else {
			var subject = name + " is interested in your work!";
			message += " You can contact me through my phone number: " + phone + ".";
			window.open('mailto:johnnyon@berkeley.edu?subject=' + subject + '&body=' + message);
		}
		
		
	});
});
