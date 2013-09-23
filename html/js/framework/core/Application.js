/**
 * 1. Mediators dispatch notifications coming from views or services (not part of FJ)
 * 2. Models are accessible to Mediators directly (Mediators are created by the Controller)
 * 3. Controller receives notifications and broadcasts them to services and views
 * 4. Each view or service is free to act or ignore a notification
 * 5. Notification contain a message and some arbitrary variables on which the Mediator can rely as well
 * 6. Notifications however should not carry data (assets). Those are stored in the Model
 */

FJ.Application = new (function () {

	var that = this;

	var mediators = [];

	/**
	 * An object to host all the data in the application (the model)
	 */
	this.model = {};

	/**
	 * This variable always reflects the part of the URL that is after the #
	 */
	this.slug = "";

	this.init = function (defaultSlug) {
		FJ.Router.init();
		FJ.Router.start(defaultSlug);
		that.broadcast(FJ.Router.navigateBySlug);
	};

	this.createMediator = function (name) {
		name = name || "mediator" + mediators.length;
		var m = new FJ.Mediator(name, this);
		mediators.push(m);
		return m;
	};

	this.destroyMediator = function (mediator) {
		var i = mediators.indexOf(mediator);
		if (i < 0) return;
		mediators.splice(i, 1);
	};

	/*
		@params - as many views as needed
		singleton views need to be registered before they initialize and listen to events

	*/
	this.registerViews = function () {
		for (var i = 0, max = arguments.length; i < max; i++) {
			arguments[i].register();
			var onRegister = arguments[i].onRegister;
			if(onRegister) onRegister();
		}

	};

	this.broadcast = function (n) {
		var nm = mediators.length;
		for (var i = 0; i < nm; i++) mediators[i].notify(n);
	};

})();
