FJ.Template = function (templateString) {

    // Function availabe in the templates under _template variable.
    var TemplateFunctions = function (ref) {

        this.exists = function (v) {
            return !(ref[v] == undefined || ref[v] == null || !ref[v] || ref[v].length == 0);
        }

        this.displayForUndefined = function(v) {
            if(ref[v] == undefined || ref[v] == null || !ref[v] || ref[v].length == 0) {
                return "style='display: none;'";
            } else {
                return "";
            }
        }
    }

    this.execute = function (element, params) {

        if (params._template) {
            console.warn("Template: params has a _template property defined. It will be overridden!")
        }

        params._template = new TemplateFunctions(params);

        var ct = templateString.split("\n").join("");

        // STEP 1. Unroll loops
        for (var p in params) {

            if (typeof params[p] == "object") {
                var pattern = new RegExp('%for[(]' + p + '[)]%(.*?)%for%', 'g');
                var me = new RegExp('this', 'g');
                var match, matches = [];
                while ((match = pattern.exec(ct)) !== null) matches.push(match);

                for (var i = 0; i < matches.length; i++) {
                    match = matches[i];
                    var l = params[p];
                    var r = "";
                    var c = match[1];

                    for (var j = 0; j < l.length; j++) {
                        r += c.replace(me, "" + p + "[" + j + "]");
                    }

                    ct = ct.replace(match[0], r);
                }
            }
        }

        // Uncomment to DEBUG
//        element.innerHTML = ct;
//        return;

        // STEP 2. Check for conditional blocks and exclude parts that do not pass
        for (var p in params) {


            if (typeof params[p] == "boolean" || typeof params[p] == "object") {

                var pattern = new RegExp('%if[(]' + p + '([.|[][^%]*)[)]%', 'g');
                var match, matches = [];
                while ((match = pattern.exec(ct)) !== null) matches.push(match);

                for (var i = 0; i < matches.length; i++) {
                    match = matches[i];
                    var code = 'params[p]' + match[1];
                    var res;

                    try {
                        res = eval(code);
                        // TODO: Find more elegant way to evaluate that
                        res = (res == undefined || res == false) ? "false" : "true";
                    } catch (e) {
                        throw "TEMPLATE ERROR. Unable to call " + match[1] + " on '" + params[p] + "' (" + e + ")";
                    }

                    ct = ct.replace(match[0], '%if(' + res + ')%');
                }

                pattern = new RegExp('%if[(]' + p + '[)]%', 'g');
                matches = [];
                while ((match = pattern.exec(ct)) !== null) matches.push(match);

                for (var i = 0; i < matches.length; i++) {
                    ct = ct.replace(matches[i][0], '%if(' + params[p] + ')%');
                }

                var pattern = new RegExp('%if[(]true[)]%(.*?)%if%', 'g');
                var match, matches = [];
                while ((match = pattern.exec(ct)) !== null) matches.push(match);

                for (var i = 0; i < matches.length; i++) {
                    ct = ct.replace(matches[i][0], matches[i][1]);
                }

                var pattern = new RegExp('%if[(]false[)]%(.*?)%if%', 'g');
                var match, matches = [];
                while ((match = pattern.exec(ct)) !== null) matches.push(match);

                for (var i = 0; i < matches.length; i++) {
                    ct = ct.replace(matches[i][0], '');
                }
            }
        }

        // Uncomment to DEBUG
//        element.innerHTML = ct;
//        return;

        // STEP 3. Match all remaining simple strings
        for (var p in params) {

            if (typeof params[p] == "string" || typeof params[p] == "object") {

                // Look for complex expressions first...
                var pattern = new RegExp('%' + p + '([.|[][^%]*)%', 'g');
                var match, matches = [];
                while ((match = pattern.exec(ct)) !== null) matches.push(match);

                for (var i = 0; i < matches.length; i++) {
                    match = matches[i];
                    var code = 'params[p]' + match[1];
                    var res;

                    try {
                        res = eval(code);
                    } catch (e) {
                        throw "TEMPLATE ERROR. Unable to call " + match[1] + " on '" + params[p] + "' (" + e + ")";
                    }

                    ct = ct.replace(match[0], res);
                }

                // ...then look for plain expressions
                pattern = new RegExp('%' + p + '%', 'g');
                matches = [];
                while ((match = pattern.exec(ct)) !== null) matches.push(match);

                for (var i = 0; i < matches.length; i++) {
                    ct = ct.replace(matches[i][0], params[p]);
                }
            }
        }

        if (element) element.innerHTML = ct;

        params._template = null;

        return ct;
    }

}
;