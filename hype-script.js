// Check if there's already a Hype Machine tab open.
var Parser = new Parser()
  , haveTab;

chrome.extension.sendMessage( { hype: 'loaded' }, function(response) {
    haveTab = response.hasTab;
});

$(document).ready(function() {
    $('#toast-prompt').remove();
    var controls = {
        next     : document.getElementById('playerNext'),
        previous : document.getElementById('playerPrev'),
        play     : document.getElementById('playerPlay'),
        favorite : document.getElementById('playerFav')
    };

    var $playing = $('#player-nowplaying');

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
            artist : $playing.find('a')[3].innerText,
            title  : $playing.find('a')[4].innerText,
            url    : $playing.find('.read').attr('href'),
            id     : $playing.find('a')[4].getAttribute('href').split('/')[2]
        };

        var state = {
            play     : Parser.playState( controls.play ),
            favorite : Parser.favoriteState( controls.favorite )
        }

        var response = {
            track  : track,
            state  : state
        };

        sendResponse( response );
    });


});