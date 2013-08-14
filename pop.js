var Mini 	   = new Mini()
  , background = chrome.extension.getBackgroundPage();

window.onload = function () {

	var controls = {
		next     : document.getElementById('next'),
		previous : document.getElementById('previous'),
		play  	 : document.getElementById('play'),
		favorite : document.getElementById('favorite')
	};

	var player = {
		track   : document.getElementById('track'),
		content : document.getElementById('blurb'),
		list    : document.getElementById('playlist')
	}
	
	// Initialize the popup player
	Mini.initialize( controls, player );

	chrome.tabs.sendMessage( background.tab, { action: 'update' }, function( response ) {
		Mini.update( response );	
	});
	

};