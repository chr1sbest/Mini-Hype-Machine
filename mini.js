function Mini() {};

Mini.prototype.initialize = function( controls, player ) {

	this.controls = controls;
	this.player   = player;

	this.bindEvents( this.controls );
}

// Bind the click events for the pop up controls
Mini.prototype.bindEvents = function( controls ) {
	
	var that = this;

	controls.next.onclick = function() {
		console.log('clicked next!');
		that.remoteClick('next');
	};

	controls.previous.onclick = function() {
		that.remoteClick('previous');
	};

	controls.play.onclick = function() {
		that.remoteClick('play');
	};

	controls.favorite.onclick = function() {
		that.remoteClick('favorite');
	};

};

// Send a message to the Hype Machine tab and tell it to act.
Mini.prototype.remoteClick = function( which ) {

	var that = this;

	chrome.tabs.sendMessage( background.tab, { action: which }, function( response ) {
		that.update( response );	
	});

};

Mini.prototype.update = function( data ) {

	this.controls.play.setAttribute( 'class', data.state.play );
	this.controls.favorite.setAttribute( 'class', data.state.favorite );

	this.player.track.innerHTML = '<a href="http://www.hypem.com/artist/' + data.track.artist + '/" target="_blank">' + data.track.artist + '</a> - '+
								  '<a href="http://www.hypem.com/track/' + data.track.id + '/" target="_blank">' + data.track.title + '</a>';

};












