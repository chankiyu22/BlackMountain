var Groups = {
	join_group : function(group_id, username) {
		$("#join_button" + group_id).attr("disabled", "disabled");
		$.post("/groups/join",
		  {group_id: group_id, username: username})
		.done(function(result) {
			$("#join_button" + group_id).text('Joined');
		})
		.fail(function(err) {
			$("#join_button" + group_id).removeAttr("disabled");
		});
	},

	create_group : function(fullname, username) {
		var fullname = $('#fullname').val();
		var username = $('#username').val();
		$("#create_group").attr("disabled", "disabled");
		$.post("/groups/create",
		  {fullname: fullname, username: username})
		.done(function(result) {
			if (result == 'success')
			{
				$('#create_result').text('Success');
				$('#create_result').removeClass('result_fail').addClass('result_success');
			}
			else
			{
				$('#create_result').text('Failed: ' + result);
				$('#create_result').removeClass('result_success').addClass('result_fail');
			}
		})
		.fail(function(err) {
			$('#create_result').text('Failed: bad connection');
			$('#create_result').removeClass('result_success').addClass('result_fail');
		})
		.always(function() {
			$("#create_group").removeAttr("disabled");
		});
	}
};