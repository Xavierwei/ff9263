	$("#user-register-form").validate({
		rules: {
			mail: {
				required: true,
				email: true
			},
			'pass[pass1]': "required",
			'pass[pass2]': "required"
		},
		messages: {
			mail: {required: "Please enter your email",
				email: true},
			'pass[pass1]': "Please enter your password",
			'pass[pass2]': "Please enter your confirm password"
		}
	});


	$("#user-login").validate({
		rules: {
			name: {
				required: true
			},
			pass: "required"
		},
		messages: {
			name: {required: "Please enter your email",
				email: true},
			pass: "Please enter your password"
		}
	});

	$("select").uniform();