// TODO: Delete

/**
 * @author:     Vincent V. Toscano
 * @version:    1.3
 * @date:       9/19/12
 * @time:       12:04 PM
 * DisplayUtil --- Put general display utility methods here.
 */
FJ.DisplayUtil = {};

FJ.DisplayUtil.getWidth = function (elem) {
    // TODO: Crossbrowserize
    return elem.offsetWidth;
}

FJ.DisplayUtil.getHeight = function (elem) {
    // TODO: Crossbrowserize
    return elem.offsetHeight;
}

/**
 * byId --- Target element by id
 * @param objIdName
 * @return {HTMLElement}
 */
FJ.DisplayUtil.byId = function (objIdName) {
    return document.getElementById(objIdName);
};

/**
 * rmAllChildren --- Remove all children of object.
 * @param objIDorElem String name of element or element itself.
 */
FJ.DisplayUtil.rmAllChildren = function (objIDorElem) {
    var ob = (typeof objIDorElem == 'string') ? document.getElementById(objIDorElem) : objIDorElem;
    ob.innerHTML = '';
    while (ob.hasChildNodes()) ob.removeChild(ob.firstChild);
};

/**
 * rmChild --- Remove child.
 * @param objIDorElem String name of element or element itself.
 */
FJ.DisplayUtil.rmChild = function (objIDorElem) {
    var ob = (typeof objIDorElem == 'string') ? document.getElementById(objIDorElem) : objIDorElem;
    if (ob && ob.parentNode && ob.parentNode.removeChild)   ob.parentNode.removeChild(ob);
};

/**
 * rmChildAndChildren --- Remove child and all children.
 * @param objIDorElem
 */
FJ.DisplayUtil.rmChildAndChildren = function (objIDorElem) {
    FJ.DisplayUtil.rmAllChildren(objIDorElem);
    FJ.DisplayUtil.rmChild(objIDorElem);
};

/**
 * hasClass --- Check if element has a class assigned to it.
 * @param el    Element to check.
 * @param cls   Class name.
 * @return {Boolean}
 * Note: Newer browsers can use theses instead of the following methods:
 * element.classList.add('classname');element.classList.remove('classname');element.classList.toggle('classname');
 */
FJ.DisplayUtil.hasClass = function (el, cls) {
    return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};
/**
 * addClass --- Add class to element.
 * @param el    Element to add class to.
 * @param cls   Class name.
 */
FJ.DisplayUtil.addClass = function (el, cls) {
    if (!FJ.DisplayUtil.hasClass(el, cls)) el.className += " " + cls;
};
/**
 * removeClass --- Remove class from element.
 * @param ele   Remove class from this element.
 * @param cls   Class name.
 */
FJ.DisplayUtil.removeClass = function (el, cls) {
    if (FJ.DisplayUtil.hasClass(el, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
};


