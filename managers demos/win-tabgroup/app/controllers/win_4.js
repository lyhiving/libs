// navigation
exports.nav = {
	title: 'Win 4'
};

exports.init = function() {
	// window will run when window is created
	Alloy.Globals.toggleAI(false);
};

exports.cleanup = function() {
	// this will run when open a child window
};

exports.reload = function() {
	// this will run when child window is close and this window focused
};

exports.unload = function() {
	// this will run when this window is closed
};

function openMain(e) {
  	Alloy.Globals.WinManager.load({
  		url: 'main_window'
  	});
}