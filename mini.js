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
					console.log(data.playlist);
	this.appendPlaylist( data.playlist );
};

Mini.prototype.appendPlaylist = function( playlist ) {
    var html  = ''
      , color = 'white'
      , that;

    for ( var i = 0; i < playlist.length; i++ ) {
    	that = playlist[i];

    	html += '<div class="playlist-item ' + color + '">';
    	html += '<a id="' + that.button + '" class="playlist-control ' + that.state + '" href="#"></a>';
    	html += that.artist + ' - ' + that.title;
    	html += '</div>';

    	color = ( color == 'white' ) ? '' : 'white';
    }

    this.player.list.innerHTML = html;

    return this;
};











