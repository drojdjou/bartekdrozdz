/*

 function for defining getters and setters
 obj.name() uses getter function
 obj.name(value) uses setter function

 @param obj - object to apply the getter / setter to
 @param name - name of the property to get / set
 @param getter - function that returns the property
 @param setter - function that sets the property

 */
FJ.define = function (obj, name, getter, setter) {

	obj[name] = function(){
		if(arguments.length < 1){
			return getter();
		}else{
			if(setter) setter.apply(this, arguments);
		}
	}

};
