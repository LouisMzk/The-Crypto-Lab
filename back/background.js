 var value = 'Sample storage chrome.';
 var current_platform = '';
 var current_symbol = '\u0024';
 var badgeTexte;
 var doAnimate = true;
 var updateBadge = false;
 var i = 0;

 chrome.runtime.onInstalled.addListener(() => {
    console.log('onInstalled...');

    chrome.storage.sync.set({current_crypto: 'btc', current_devise: 'usd', current_platform: 'coinbase', current_symbol: current_symbol }, function() {
      console.log('MCE v1.2 successfully launched');
    });
    
    chrome.alarms.create('refresh', { periodInMinutes: 1 });

    chrome.storage.sync.get(['current_symbol', 'current_devise'], function(result) {
      if(result.current_symbol){
        current_symbol = result.current_symbol
        httpGetAsync('https://coinbase.com/api/v2/assets/prices?base='+result.current_devise+'&filter=listed&resolution=latest&', callback);
      }
    });
  });
  

  // ALARM LISTENER 
  chrome.alarms.onAlarm.addListener((alarm) => {
    updateBadge = true;
    chrome.storage.sync.get(['current_symbol', 'current_devise'], function(result) {
      if(result.current_symbol){
        current_symbol = result.current_symbol
        httpGetAsync('https://coinbase.com/api/v2/assets/prices?base='+result.current_devise+'&filter=listed&resolution=latest&', callback);
      }
    });    
    
  }); 
  // END ALARM LISTENER

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(!updateBadge){ updateBadge = true; doAnimate = false; }
    chrome.storage.sync.get(['current_symbol', 'current_devise'], function(result) {
      if(result.current_symbol){
        current_symbol = result.current_symbol
        httpGetAsync('https://coinbase.com/api/v2/assets/prices?base='+result.current_devise+'&filter=listed&resolution=latest&', callback);
      }
    });
    sendResponse({message: updateBadge})
  });

  chrome.tabs.onUpdated.addListener(function() {
    chrome.storage.sync.get(['current_symbol', 'current_devise'], function(result) {
      if(result.current_symbol){
        current_symbol = result.current_symbol
        httpGetAsync('https://coinbase.com/api/v2/assets/prices?base='+result.current_devise+'&filter=listed&resolution=latest&', callback);
      }
    }); 
})
 
  function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200 || xmlHttp.status == 404)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function callback(string){
  price = string
  price_parsed = JSON.parse(price)
  current_btc_price = parseFloat((price_parsed.data[0].prices.latest)).toFixed(2);
  current_eth_price = parseFloat((price_parsed.data[3].prices.latest)).toFixed(2);
  current_ltc_price = parseFloat((price_parsed.data[5].prices.latest)).toFixed(2);
  current_bch_price = parseFloat((price_parsed.data[1].prices.latest)).toFixed(2);

  chrome.storage.sync.set({price_btc: current_btc_price, price_eth: current_eth_price,
  price_ltc: current_ltc_price, price_bch: current_bch_price }, function() {
  });
    // BADGE TEXT INIT
    if(doAnimate){
      if(typeof(current_btc_price) != "undefined" ){
        badgeTexte = new BadgeTextAnimator( {
        text: ' ********* BTC : ' + current_btc_price + ' ' + current_symbol +
        ' --- ETH : '+ current_eth_price + ' ' + current_symbol +
        ' --- LTC : '+ current_ltc_price + ' ' + current_symbol +
        ' --- BCH : '+ current_bch_price + ' ' + current_symbol,
        interval: 300,
        repeat: true,
        size: 200 
      } );
    

        chrome.browserAction.setBadgeBackgroundColor({color: "black"});
        badgeTexte.animate();
        doAnimate = false;   
      }
    }
    if(updateBadge){
      badgeTexte.options.text = ' ********* BTC : ' + current_btc_price + ' ' + current_symbol +
      ' --- ETH : '+ current_eth_price + ' ' + current_symbol +
      ' --- LTC : '+ current_ltc_price + ' ' + current_symbol +
      ' --- BCH : '+ current_bch_price + ' ' + current_symbol;
    }
}
// END CALLBACK

function BadgeTextAnimator ( options ) {
	if ( options == null ) {
		throw new Error( 'You must pass options to the BadgeTextAnimator' );
	}

	this.options = {
		text: options.text,
		interval: ( options.interval == null ? 500 : options.interval ),
		repeat: ( options.repeat == null ? true : options.repeat ),
		size: ( options.size != null && options.size > 0 && options.size <= 6 ? options.size : 6 )
	};

	this._intervalId = null;
	this._currentIndex = 0;
}


BadgeTextAnimator.prototype.animate = function () {
	var spaces = [ '', ' ', '  ', '   ', '    ', '     ', '      ' ];
	this._setBadgeText( spaces[this.options.size] );

	this._doAnimate();

	this._intervalId = setInterval(
		function () {
			this._doAnimate();
		}.bind( this ),
		this.options.interval
	);
};


BadgeTextAnimator.prototype.stop = function () {
	clearInterval( this._intervalId );
	this._intervalId = null;

	this._setBadgeText( '' );
};

BadgeTextAnimator.prototype._doAnimate = function () {
	var startAt = this._currentIndex,
		cutAt = this.options.size,
		addBefore = false,
		chunk, difference;

	if ( this._currentIndex < this.options.size ) {
		cutAt = this._currentIndex + 1;
		addBefore = true;
		startAt = 0;
	}

	chunk = this.options.text.substr( startAt, cutAt );

	if ( chunk.length < this.options.size ) {
		difference = this.options.size - chunk.length;
		for ( var i = 0; i <= difference; i++ ) {
			if ( addBefore === true ) {
				chunk = ' ' + chunk;
			} else {
				chunk = chunk + ' ';
			}
		}
	}

	this._setBadgeText( chunk );

	this._currentIndex = this._currentIndex + 1;
	if ( this._currentIndex === this.options.text.length ) {
		if ( this.options.repeat === true ) {
			this._currentIndex = 0;
		} else {
			this.stop();
		}
	}
};

BadgeTextAnimator.prototype._setBadgeText = function ( text ) {
	chrome.browserAction.setBadgeText( { text: text } );
}; 

// IN A FUTURE UPDATE
// TO COPY A WALLET DIRECTLY IN MCE
// AND RECEIVE CRYPTO


/*
function getContentFromClipboard() {
  var result = '';
  var sandbox = document.getElementById('sandbox');
  sandbox.value = '';
  sandbox.select();
  if (document.execCommand('paste')) {
      result = sandbox.value;
      //console.log('got value from sandbox: ' + result);
  }
  sandbox.value = '';
  return result;
}

*/
