/**
 * A small utility to work with slugs.
 *
 * It will parse the current slug and return some information about it.
 *
 * A slug is considered to be composed of any number of parts separated by a slash (/)
 *
 * The first element in a slug is called head.
 * All the parts, including the head, can be accessed in form of array (parts).
 *
 * The parts can also be accessed as key/value pairs.
 * In this case, the first 'key' is the 2nd part, the first 'value' is the 3rd.
 * The 1st part, the head, is not considered part of the key/value chain.
 * If the number of parts if even (i.e. odd, if we take the first one out) the last part will be omitted.
 */
FJ.Slug = function(slug) {

    var DV = "/";

    this.parts = slug.split(DV);
    var np = this.parts.length;

    // If there is a trailing slash (usually there should be) get rid of the first empty part
    if(np > 1 && this.parts[0] == '') this.parts.shift();

    this.head = this.parts[0];

    this.values = {};

    if (np > 1) {
        var l = (np - 1) / 2 | 0;

        for (var i = 0; i < l; i++) {
            var k = this.parts[1 + i * 2];
            var v = this.parts[1 + i * 2 + 1];
            this.values[k] = v;
        }
    }

    this.isHeadOnly = function() {
        return np == 1;
    }
}