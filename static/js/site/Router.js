window.Router = function() {

	var isFromCode = false;

	var solve = function(route) {
		if(route != "") {
			if(route == "/") Broadcast.send(Msg.ON_MAIN_OPEN);
			if(route == "/about") Broadcast.send(Msg.ON_ABOUT_OPEN);
			if(route.indexOf("/project") == 0) Broadcast.send(Msg.ON_ITEM_OPEN, route.split("/")[2]);
		}
	}

	Broadcast.addClient(Msg.ON_MAIN_OPEN, function(data) {
		isFromCode = true;
		History.pushState({ section:"/" }, null, "/");
	});

	Broadcast.addClient(Msg.ON_ABOUT_OPEN, function(data) {
		isFromCode = true;
		History.pushState({ section:"/about" }, null, "/about");
	}); 

	Broadcast.addClient(Msg.ON_ITEM_OPEN, function(data) {
		isFromCode = true;
		History.pushState({ section:"/project/" + data }, null, "/project/" + data);
	});

	History.Adapter.bind(window, "statechange", function() {
		if(!isFromCode) solve(History.getState().data.section);
		isFromCode = false;
	});

	solve(History.getState().hash);
};