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
	}
};