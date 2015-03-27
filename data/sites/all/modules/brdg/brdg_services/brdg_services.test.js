Drupal.behaviors.RestServicesTest = {
	attach: function () {
		(function ($) {
			$.fn.serializeObject = function()
			{
			   var o = {};
			   var a = this.serializeArray();
			   $.each(a, function() {
			       if (o[this.name]) {
			           if (!o[this.name].push) {
			               o[this.name] = [o[this.name]];
			           }
			           o[this.name].push(this.value || '');
			       } else {
			           o[this.name] = this.value || '';
			       }
			   });
			   return o;
			};

			var uid = 1;
			var apipath = "/third_content";

			// Simple example.
			// of calling user update services
			// var account = {
			// 	uid: uid,
			// 	mail: 'asdd@gmail.com',
			// 	pass: '123456',
			// 	name: 'admin',
			// 	current_pass: 'admin'
			// };
			// $.ajax({
			// 	type: "PUT",
			// 	url: apipath + "/user/1",
			// 	dataType: "json",
			// 	data: JSON.stringify({data: account}),
			// 	contentType: "application/json",
			// 	success: function (data) {
			// 		console.log(data);
			// 	}
			// });

			// Simple example form (include user profile picture )
			// Of calling user update services
			// $("#update_user_service").click(function () {
			// 	try {
			// 		var account = $("#user-profile-form-service").serializeObject();
			// 		$.ajax({
			// 			type: "PUT",
			// 			url: apipath + "/user/1",
			// 			dataType: "json",
			// 			data: JSON.stringify({data: account}),
			// 			contentType: "application/json",
			// 			success: function (ret) {
			// 				console.log(ret);
			// 			}
			// 		});
			// 	}
			// 	catch(e) {
			// 		console.log(e.message);
			// 	}

			// 	return false;
			// });
			
			// Test like services example
			// Test like
			function FlagAPI(flag_name) {
				var api_path = "/third_content/flag/";
				console.log(api_path);
				var interface = function (flag_name) {
					this.flag_name = flag_name;
				}

				interface.prototype.isFlaged = function (nid, uid, callback) {
					var data = {content_id: nid, flag_name: this.flag_name, uid: uid};
					var url = api_path + "is_flagged";
					this._request(url, data, "POST", callback);
				}

				interface.prototype.flag = function (nid, uid, callback) {
					var data = {content_id: nid, flag_name: this.flag_name, uid: uid, action: "flag"};
					var url = api_path + "flag";
					this._request(url, data, "POST", callback);
				}

				interface.prototype._request = function (url, data, method, callback) {
					Array.prototype.insert = function (index, item) {
					  this.splice(index, 0, item);
					};
					$.ajax({
						type: method,
						url: url,
						dataType: "json",
						data: JSON.stringify(data),
						contentType: "application/json",
						success: function (ret) {
							var args = Array.prototype.slice.call(arguments, 0);
							args.insert(0, 'success');
							callback.apply(this, args);
						}
					});
				}

				return new interface(flag_name);
			}
			$("#test_like").click(function () {
				var api = FlagAPI('like');
				// api.isFlaged(722, 1, function(status) {
				// 	var args = Array.prototype.slice.call(arguments, 0);
				// 	if (status == 'success') {
				// 		var data = JSON.parse(args[1]);
				// 		console.log(data);
				// 		if (!data) {
				// 			alert('not flag yet');
				// 		}
				// 		else {
				// 			alert('flagged');
				// 		}
				// 	}
				// });
				// api.isFlaged(931, 0, function (data) {
				// 	console.log(data);
				// });
				api.flag(932, 0, function(status) {
					var args = Array.prototype.slice.call(arguments, 0);
					if (status == 'success') {
						var data = JSON.parse(args[1]);
						console.log(data);
					}
				});
			});

			// Test comment services
			// var comment = {
			// 	nid: 976,
			// 	comment_body: {und: [{value: "body from js", summary: "summary from js"}]},
			// 	field_email: {und: [{value: "jziwenchen@gmail.com"}]}
			// };
			// $.ajax({
			// 	url: apipath + "/comment",
			// 	dataType: "JSON",
			// 	type: "POST",
			// 	data: JSON.stringify(comment),
			// 	contentType: "application/json",
			// 	success: function (data) {
			// 		console.log(data);
			// 	}
			// });

			// $.ajax({
			// 	url:  "/third_content/node/pre_next_node",
			// 	dataType: "JSON",
			// 	type: "POST",
			// 	data: JSON.stringify({nid: 926, resource_type: 3}),
			// 	contentType: "application/json",
			// 	success: function (data) {
			// 		console.log(JSON.parse(data));
			// 	}
			// });

		// test comment list
		// $.ajax({
		// 	url: apipath + "/source_content_comments",
		// 	dataType: "JSON",
		// 	method: 'GET',
		// 	data: {nid: 718},
		// 	contentType: "application/json",
		// 	success: function(data) {
		// 		console.log(data);
		// 	}
		// });

		// test all resouces request
		// $.ajax({
		// 	url: "/third_content/all_resources?perpage=35&page=0&city_id=1",
		// 	dataType: "JSON",
		// 	method: 'GET',
		// 	contentType: "application/json",
		// 	success: function(data) {
		// 		console.log(JSON.parse(data));
		// 	}
		// });
		})(jQuery);
	}
}

function ValidateEmail(e_mail) {
	if (/^\w+([\.-]?\w+)*@(gamil\.com|qq\.com)+$/.test(e_mail)) {
		return (true);
	}
	return (false);
}

// Node publish/unpublish API 
(function ($) {
	$.Node = function (nid) {
		var path = "/brdg/data/third_content/node/" + nid;
		var ajax = function (data, cb) {
			data['node']['nid'] = nid;
			$.ajax({
				url: path,
				dataType: "json",
				type: "PUT",
				data: JSON.stringify(data),
				contentType: "application/json",
				success: cb
			});
		}
		return {
			publish: function (cb) {
				var data = {node: {status: 1}};
				ajax(data, cb);
			},
			unpublish: function (cb) {
				var data = {node: {status: 0}};
				ajax(data, cb);
			}
		};
	}

	$.User = function (uid) {
		var data = {};
		data['uid'] = uid;
		var path = "/brdg/data/third_content/user/" + uid;
		var ajax = function (data, cb, method) {
			if (typeof method == 'undefined') {
				method = "PUT";
			}
			$.ajax({
				url: path,
				dataType: "json",
				type: method,
				data: JSON.stringify(data),
				contentType: "application/json",
				success: cb
			});
		}
		return {
			block: function (cb) {
				data['status'] = 0;
				ajax(data, cb);
			},
			unblock: function (cb) {
				data['status'] = 1;
				ajax(data, cb);
			}
		};
	}
	$(document).ready(function () {
		// Call me example.
		// publish
		// $.Node(1640).publish(function (data) {
		// 	console.log(data);
		// });

		// // unpublish
		// $.Node(1573).publish(function (data) {
		// 	console.log(data);
		// });

		// $.User(21).block(function (data) {
		// 	console.log(data);
		// })

		//$.User(21).unblock(function (data) {
		//	console.log(data);
		//});
	});
})(jQuery);