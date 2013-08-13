var gx = 0, tx = 0, header;

window.onload = function () {

    header = document.getElementById('header');

    // Header adjusting for iOS Safari and others
    var adjustHeader = function () {
        var w = window.innerWidth > 1024;
        var h = (w) ? 'auto' : window.innerHeight;
        header.style.height = h + 'px';
    }
    // window.addEventListener('resize', adjustHeader);
    // adjustHeader();

    window.ondevicemotion = function (e) {
        gx = e.accelerationIncludingGravity.x;
    }

    // setInterval(draw, 1000/60);
}

function draw() {
    tx += (gx - tx) * 0.1;
    var p = tx / 9.81;
    header.style.backgroundPosition = (50 + p * 50) + "%";

    var hh1 = document.querySelector('#header h1');
    var hp = document.querySelector('#header p');

    hh1.style['-webkit-transform'] = 'translateX(' + (p * -20) + 'px)';
    hp.style['-webkit-transform'] = 'translateX(' +  (p * -20) + 'px)';
}