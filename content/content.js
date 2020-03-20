/*
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      chrome.storage.sync.get(['key'], function(result) {
        console.log('Value currently is ' + result.key);
        chrome.runtime.sendMessage({price_btc: request.price_btc}, function(response) {
          //console.log(response.farewell)
        })
      });
      sendResponse({farewell: 'recu'});
    });
*/