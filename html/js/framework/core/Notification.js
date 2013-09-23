FJ.Notification = function(_message, _type, _slug) {

    if(!_message) throw "NOTIFICATION ERROR. Message cannot be null";
    if(_type == FJ.NOTIF_NAVIGATION && !_slug) throw "NOTIFICATION ERROR. Navigation type notifications require a slug";

    /**
     * The message connected to this event. This is mandatory.
     */
    this.message = _message;

    /**
     * An object with arbitrary data attached to the event
     */
    this.vars = null;

    /**
     * Type can either be a Event (default) or a Navigation. Navigation event ALWAYS rewrites the URL
     */
    this.type = _type || FJ.NOTIF_EVENT;

    /**
     * For navigation type events, the slug is what pushed to the URL after the #.
     * Slug is mandatory for Navigation events
     */
    this.slug = _slug || "";

    /**
     * If action is a function, it will be executed right BEFORE the Notification is broadcasted
     */
    this.action = null;

    /**
     * If action is a function, it will be executed immediately AFTER the Notification is broadcasted
     */
    this.postAction = null;

	var me = this;

	/**
		broadcasts this note via FJ.Application.broadcast()
	 */
	this.send = function(){
		FJ.Application.broadcast(me);
	}

};
