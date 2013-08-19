FJ.Mediator = function(name) {

    this.name = name;

    this.notify = function(n) {
        if(this['update']) this['update'](n);
    }
};