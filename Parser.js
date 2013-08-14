function Parser() {};

Parser.prototype.playState = function( element ) {
	
	var classes = element.getAttribute('class').split(' ');

	for (var i = 0; i < classes.length; i++ ) {

		if ( classes[i] == 'play' || classes[i] == 'pause' ) {
			return classes[i];
		}

	}

	// Default
	return 'play';
};

Parser.prototype.favoriteState = function( element ) {
	
	var classes = element.getAttribute('class').split(' ');

	for (var i = 0; i < classes.length; i++ ) {

		if ( classes[i] == 'fav-off' || classes[i] == 'fav-on' ) {
			return classes[i];
		}
		
	}

	// Default
	return 'fav-off';
}