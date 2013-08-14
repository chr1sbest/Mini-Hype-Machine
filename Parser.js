function Parser() {};

// Initialize properties
Parser.prototype.initialize = function( controls, playing, tracks ) {

	this.controls = controls;
	this.playing  = playing;
	this.tracks   = tracks;

};

// Retrieve the current playstate.
Parser.prototype.playState = function() {
	
	var classes = this.controls.play.getAttribute('class').split(' ');

	for (var i = 0; i < classes.length; i++ ) {

		if ( classes[i] == 'play' || classes[i] == 'pause' ) {
			return classes[i];
		}

	}

	// Default
	return 'play';
};

// Retrieve the current favorite state.
Parser.prototype.favoriteState = function() {
	
	var classes = this.controls.favorite.getAttribute('class').split(' ');

	for (var i = 0; i < classes.length; i++ ) {

		if ( classes[i] == 'fav-off' || classes[i] == 'fav-on' ) {
			return classes[i];
		}

	}

	// Default
	return 'fav-off';
};

// Retrieve the current artist
Parser.prototype.artist = function() {
	return this.player.querySelectorAll('a')[3].innerText;
};

// Retrieve the current track title
Parser.prototype.title = function() {
	return this.player.querySelectorAll('a')[4].innerText;
};

// Retrieve the blog url for the current track
Parser.prototype.url = function() {
	return this.player.querySelectorAll('.read')[0].getAttribute('href');
};

// Retrieve the id for this track
Parser.prototype.trackId = function() {
	return this.player.querySelectorAll('a')[4].getAttribute('href').split('/')[2];
};

// Retrieve the active playlist from the DOM
Parser.prototype.playlist = function() {

	var list     = this.tracks.querySelectorAll('.section-track');
	var playlist = []
	  , section  = {}
	  , that;

	for ( var i = 0; i < list.length; i++ ) {
		that = list[i];

		section.artist = that.querySelector('.section-player .track_name .artist').innerText;
		section.title  = that.querySelector('.section-player .track_name .track').innerText;
		section.button = that.querySelector('.section-player .tools .playdiv .play-ctrl').getAttribute('id');

		playlist.push(section);
	}

	return playlist;
};