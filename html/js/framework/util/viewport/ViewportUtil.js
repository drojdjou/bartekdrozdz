// TODO: Delete

/**
 * @author:     Vincent V. Toscano
 * @version:    1.0
 * @date:       1/25/13
 * @time:       11:00 AM
 * ViewportUtil --- Utilities devoted to working with the viewport.
 */
FJ.ViewportUtil={};
/**
 * getViewportDimensions --- Get the current viewport dimensions.
 * @return {Object} Returns an object with a width and height.
 */
FJ.ViewportUtil.getViewportDimensions    = function (){
    var baseE = window, ax = 'inner';
    if ( !( 'innerWidth' in window ) ){ax = 'client';baseE = document.documentElement || document.body;}
    return { width: baseE[ ax+'Width' ] , height: baseE[ ax+'Height' ] }
};
