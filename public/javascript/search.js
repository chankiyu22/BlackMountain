var Search = {

	originalRHS : '',

	onSearchTextInput : function() {
		if (this.originalRHS.length == 0)
		{
			this.originalRHS = $("#RHS").html();
		}
		var searchfor = $("#searchfor").val();
		if (searchfor.length == 0)
		{
			$('#RHS').html(this.originalRHS);
		}
		else
		{
			$.get("/search/getModule", {searchfor: searchfor})
		  	.done(function(result){
		    	$('#RHS').html(result);
		  	});
		}
	}
};