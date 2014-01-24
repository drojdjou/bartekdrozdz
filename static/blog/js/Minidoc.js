var Minidoc = (function() {

	var m = {};

	var article, preview, minidoc;

	var makePreview = function() {
		if(window.innerWidth < 1024) return;

		var articleHeight = article.getBoundingClientRect().height;
		var scaleFactor = window.innerHeight / articleHeight;

		minidoc.innerHTML = article.innerHTML;

		var scaleDown = "scaleX(" + scaleFactor + ") scaleY(" +  scaleFactor + ") translateZ(0)";

		preview.style.height = (window.innerHeight * scaleFactor) + "px";
		preview.style.width = (700 * scaleFactor + 25) + "px";

		minidoc.style['transform'] = scaleDown;
		minidoc.style['webkitTransform'] = scaleDown;
		minidoc.style['mozTransform'] = scaleDown;
		minidoc.style['msTransform'] = scaleDown;
	}

	var scroll = function() {
		if(window.innerWidth < 1024) return;
		var rect = article.getBoundingClientRect();
		var top = (rect.top / rect.height) * -1;
		var py = top * window.innerHeight;
		var t = "translateY(" + py + "px)";
		preview.style['transform'] = t;
		preview.style['webkitTransform'] = t;
		preview.style['mozTransform'] = t;
		preview.style['msTransform'] = t;
	}

	m.create = function(_article) {
		article = _article;

		preview = document.createElement("div");
		minidoc = document.createElement("div");
		
		preview.setAttribute("class", "minidoc-preview");
		minidoc.setAttribute("class", "minidoc");

		article.parentNode.insertBefore(minidoc, article);
		article.parentNode.insertBefore(preview, article);

		window.addEventListener('resize', makePreview);
		window.addEventListener('scroll', scroll);
		makePreview();
	}

	return m;
})()
