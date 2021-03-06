var Alloy = require('alloy');

function Plugins(config) {
	var _return = {};
	
	config = _.extend({
		ai: true,
		keyboard: true // if win.hasWebview == "true", this will be ignore, https://jira.appcelerator.org/browse/TC-1056
	}, config);
	
	init();
	
	// PRIVATE FUNCTIONS ========================================================
	
	function init() {
		_return.windowShow = windowShow;
		_return.windowHide = windowHide;
		
		config.ai 		&& (_return.toggleAI = toggleAI); 
		config.keyboard && (_return.hideKeyboard = hideKeyboard); 
	}
	
	function windowShow(params, e) {
		var win = params.controller.getView();
		config.ai 		&& loadAI(params, win);
		config.keyboard && loadKeyboard(params, win);
	}
	
	function windowHide(params, e) {
		if (config.ai && params._ai) {
			params._ai.unload();
	  		params._ai = null;
		}
		config.keyboard && (params._txt = null);
	}
	
	/* =============================================================================
   start Utilities
   ========================================================================== */
	  
	function loadAI(params, win) {
	  	var ai = Alloy.createController('elements/ai', { visible: true });
	  	params._ai = ai;
		win.add( ai.getView() );
	}
	
	function toggleAI(visible, message, timeout) {
		if (visible) {
			var current = Alloy.Globals.WinManager.getCache(-1);
		  	if (current == null) {
				current = Alloy.Globals.Tabgroup.getCache(-1, -1);
		  	}
			
			if (current && current._ai) {
				current._ai.toggle(true, message, timeout);
			}
		} else {
			var cache = Alloy.Globals.WinManager.getCache();
		  	if (cache.length === 0) {
				cache = Alloy.Globals.Tabgroup.getCache(-1);
		  	}
		  	
		  	for(var i=0,ii=cache.length; i<ii; i++){
			  	var current = cache[i];
			  	if (current && current._ai) {
					current._ai.toggle(false);
				}
			};
		}
	};
	
	function loadKeyboard(params, win) {
	  	// attach hidden textfield for hiding keyboard
		
		var txt = Ti.UI.createTextField({ visible: false });
		// OS_ANDROID && (txt.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS);
		params._txt = txt;
		win.add(txt);
		
		// hide keyboard on tap
		
		if (win.hasWebview != "true") {
			win.addEventListener('singletap', function(e) {
				if ( ['Ti.UI.TextField', 'Ti.UI.TextArea', 'Ti.UI.SearchBar', 'Ti.UI.Android.SearchView'].indexOf( e.source.apiName ) == -1 ) {
					hideKeyboard();
				}
			});
		}
	}
	  
	function hideKeyboard() {
		if (OS_ANDROID || Ti.App.keyboardVisible) { // Ti.App.keyboardVisible for iOS only
			var current = Alloy.Globals.WinManager.getCache(-1);
		  	if (current == null) {
				current = Alloy.Globals.Tabgroup.getCache(-1, -1);
		  	}
			
			if (current && current._txt) {
				var txt = current._txt;
			  	txt.focus();
			  	txt.blur();
			}
		}
	}
	
	/* =============================================================================
	   end Utilities
	   ========================================================================== */
	
	// PUBLIC FUNCTIONS ========================================================

	return _return;
};

module.exports = Plugins;