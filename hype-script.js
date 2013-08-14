// Check if there's already a Hype Machine tab open.
var Parser = new Parser()
  , haveTab;

chrome.extension.sendMessage( { hype: 'loaded' }, function(response) {
    haveTab = response.hasTab;
});

$(document).ready(function() {
    
    $('#toast-prompt').remove();  // Remove that annoying yellow box.
    
    // Snag the important stuff so we can build a parser
    var playing  = document.getElementById('player-nowplaying');
    var playlist = document.getElementById('track-list').querySelectorAll('.section-track');
    var controls = {
        next     : document.getElementById('playerNext'),
        previous : document.getElementById('playerPrev'),
        play     : document.getElementById('playerPlay'),
        favorite : document.getElementById('playerFav')
    };

    // Initialize the parser so it can get datas and things.
    Parser.initialize( controls, playing, playlist );

    // Listen up!
    chrome.extension.onMessage.addListener( function( request, sender, sendResponse ) {

        switch ( request.action ) {

            case 'next':
                controls.next.click();
                break;

            case 'previous':
                controls.previous.click();
                break;

            case 'play':
                controls.play.click();
                break;

            case 'favorite':
                controls.favorite.click();  
                break;

        }

        // Prep data to shoot back to update the view
        var track = {
            artist : Parser.artist(),
            title  : Parser.title(),
            url    : Parser.url(),
            id     : Parser.trackId()
        };

        var state = {
            play     : Parser.playState(),
            favorite : Parser.favoriteState()
        }

        var playlist = Parser.playlist();

        var response = {
            track    : track,
            state    : state,
            playlist : playlist
        };

        sendResponse( response );
    });


});