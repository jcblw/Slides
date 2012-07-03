//Fullscreen
// via http://johndyer.name/native-fullscreen-javascript-api-plus-jquery-plugin/
(function() {
    var
        fullScreenApi = {
            supportsFullScreen: false,
            isFullScreen: function() { return false; },
            requestFullScreen: function() {},
            cancelFullScreen: function() {},
            fullScreenEventName: '',
            prefix: ''
        },
        browserPrefixes = 'webkit moz o ms khtml'.split(' ');
 
    // check for native support
    if (typeof document.cancelFullScreen !== 'undefined') {
        fullScreenApi.supportsFullScreen = true;
    } else {
        // check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
            fullScreenApi.prefix = browserPrefixes[i];
 
            if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] !== 'undefined' ) {
                fullScreenApi.supportsFullScreen = true;
 
                break;
            }
        }
    }
 
    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
 
        fullScreenApi.isFullScreen = function() {
            switch (this.prefix) {
                case '':
                    return document.fullScreen;
                case 'webkit':
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + 'FullScreen'];
            }
        };
        fullScreenApi.requestFullScreen = function(el) {
            return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
        };
        fullScreenApi.cancelFullScreen = function(el) {
            return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
        };
    }
 
    // jQuery plugin
    if (typeof jQuery !== 'undefined') {
        jQuery.fn.requestFullScreen = function() {
 
            return this.each(function() {
                if (fullScreenApi.supportsFullScreen) {
                    fullScreenApi.requestFullScreen(this);
                }
            });
        };
    }
 
    // export api
    window.fullScreenApi = fullScreenApi;
})();


(function(){
	var btn = document.querySelector('.fullscreen');
	if (fullScreenApi.supportsFullScreen) {
		var enterFullscreen = function(){
			// Go full screen
			fullScreenApi.requestFullScreen(document.getElementsByTagName('body')[0]);
			
			//Add new handle to button
			btn.removeEventListener('click', enterFullscreen, true);
			btn.addEventListener('click', exitFullscreen, true);
		},
		exitFullscreen = function(){
			fullScreenApi.cancelFullScreen(document.getElementsByTagName('body')[0]);
			
			//Add new handle to button
			btn.removeEventListener('click', exitFullscreen, true);
			btn.addEventListener('click', enterFullscreen, true);
			
		};
		btn.addEventListener('click', enterFullscreen, true);
	}else{
		btn.innerHTML = 'Boo no fullscreen';
		btn.classname = btn.classname + ' disabled';	
	}
	
}());

// Jquery Fallback

//(function($){
//    
//    var styles = {width : '500px'},
//    duration = 500,
//    type = ['css', 'animate'],
//    // Using feature detection function from above
//    support = (supportTransition()) ? 0 : 1;
//    
//    $('.element')[type[support]](styles, duration);
//    
//}(jQuery))
  