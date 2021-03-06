// navigation
exports.nav = {
	title: 'This is Win 2',
	rightNavButton: [
		{
			title: 'Edit',
			icon: '/images/tabs/settings.png',
			showAsAction: OS_IOS ? null : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			callback: function() {
			  	alert('Edit clicked');
			}
		}
	]
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
	Alloy.Globals.toggleAI(false);
};

exports.unload = function() {
	// this will run when this window is closed
};

function openWin4(e) {
  	Alloy.Globals.WinManager.load({
  		url: 'win_4'
  	});
}