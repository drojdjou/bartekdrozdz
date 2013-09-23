FJ.ArrayUtil = {

    /**
     * Iterates an array and calls a function on every object in the array.
     *
     * @param a Array of objects
     * @param f Function name to be called on each object (object needs to have a function with this name)
     */
    apply: function (a, f) {

        var l = a.length;
        for (var i = 0; i < l; i++) a[i][f]();

    },

    /**
     * Iterates an array and calls a function for every object in the array.
     *
     * @param a Array of objects
     * @param f Function to be called for each object. The object will be passed as argument and whatever the function returns will be assigned back to the object.
     */
    applyOn: function (a, f) {

        var l = a.length;
        for (var i = 0; i < l; i++) a[i] = f(a[i], i);

    },

    /**
     * Specific version of apply.
     *
     * @param a Array of objects
     * @param f Function to be called on each object
     * @param c A callback function that will be called when all functions are done (*)
     *
     *  (*) This assumes that the function takes an argument that is a callback and will invoke it at some point. Otherwise the callback will never be invoked.
     */
    applyWithCallback: function (a, f, c) {

        var l = a.length;
        var lc = l;

        var ic = function () {
            lc--;
            if (lc <= 0) c();
        }

        for (var i = 0; i < l; i++) a[i][f](ic);
    }
}

Array.prototype.shuffle = function () {
    var i = this.length, j, tempi, tempj;
    if (i == 0) return this;
    while (--i) {
        j = Math.floor(Math.random() * ( i + 1 ));
        tempi = this[i];
        tempj = this[j];
        this[i] = tempj;
        this[j] = tempi;
    }
    return this;
}

String.prototype.line = function(n) {
    return this.split('\n')[n];
}

/**
 * Pads a number with zeroes (in front)
 */
Number.prototype.pad = function(n, str){
    return Array(n-String(this).length+1).join(str||'0')+this;
}