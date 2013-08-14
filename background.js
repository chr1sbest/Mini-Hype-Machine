var tab = false;

// Listener to get the Hypem tab ID on load and update favState and playState
chrome.extension.onMessage.addListener( function( request, sender, sendResponse ) {

    switch ( request.hype ) {

        case 'loaded':
            tab = sender.tab.id;
            break;
    }

    sendResponse( { hasTab: tab } );
});