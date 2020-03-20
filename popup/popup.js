var w_platform = document.querySelector('.platform');
// Platforms button
var coinbase_button = document.getElementById('b_coinbase');
var gdax_button = document.getElementById('b_gdax');
var kraken_button = document.getElementById('b_kraken');
var bitstamp_button = document.getElementById('b_bitstamp');
var bitfinex_button = document.getElementById('b_bitfinex');
var binance_button = document.getElementById('b_binance');
var coinhouse_button = document.getElementById('b_coinhouse');
var etoro_button = document.getElementById('b_etoro');

// Crypto buttons
var btc_button = document.getElementById('b_btc')
var eth_button = document.getElementById('b_eth')
var bch_button = document.getElementById('b_bch')
var ltc_button = document.getElementById('b_ltc')

// Currencies buttons

var eur_button = document.getElementById('b_eur');
var usd_button = document.getElementById('b_usd');
var gbp_button = document.getElementById('b_gbp');

// Inputs du main

var input_buy = document.getElementById('input_buy');
var disabled_devise = document.getElementById('disabled_devise')
var disabled_crypto = document.getElementById('disabled_crypto')
var input_crypto = document.getElementById('input_crypto');
var button_send = document.getElementById('button_send');
var button_receive = document.getElementById('button_receive');

// Buy and sell buttons

var button_buy = document.getElementById('button_buy');
var button_sell = document.getElementById('button_sell')

// Donate and Github buttons

var git_button = document.getElementById('b_github');
var donate_button = document.getElementById('b_donate');
var join_button = document.getElementById('b_join');

var btc_price = '';
var bch_price = '';
var eth_price = '';
var ltc_price = '';

// Encodage 
const https = 'https://';
const com =  '.com';
const net = '.net';

const devise = {
    'eur' : '\u20ac',
    'usd' : '\u0024',
    'gbp' : '\u00a3'
};

const crypto = {
    'btc' : 'BTC',
    'bch' : 'BCH',
    'eth' : 'ETH',
    'ltc' : 'LTC'
};

var url_buy={};

var current_crypto = crypto['btc']
var current_devise = devise['usd'];

const crypto_full = {
    'BTC' : 'bitcoin',
    'BCH' : 'bitcoin-cash',
    'ETH' : 'ethereum',
    'LTC' : 'litecoin'
}

const url_login = {
    'coinbase' : https + 'coinbase' + com + '/signin',
    'kraken' : https + 'kraken' + com + '/sign-in',
    'gdax' : https + 'pro.coinbase.com/oauth_redirect',
    'bitstamp' : https + 'bitstamp' + net + '/onboarding/login/',
    'bitfinex' : https + 'bitfinex' + com,
    'binance' :  https + 'binance' + com + '/en/login',
    'coinhouse' : https + 'app.coinhouse' + com + '/v2/login',
    'etoro' : https + 'etoro' + com + '/en/login'
}

chrome.storage.sync.get(['current_devise', 'current_crypto', 'current_platform'], function(result) {
    current_devise = devise[result.current_devise];
    current_crypto = crypto[result.current_crypto];
    current_platform = result.current_platform

    url_buy = {
        'coinbase' : 'https://www.coinbase.com/price/'+ crypto_full[current_crypto],
        'kraken' : https + 'kraken' + com + '/sign-in',
        'gdax' : https + 'pro.coinbase.com/oauth_redirect',
        'bitstamp' : 'https://www.bitstamp.net/market/order/instant/',
        'bitfinex' : https + 'bitfinex' + com,
        'binance' :  https + 'binance' + com + '/en/login',
        'coinhouse' : https + 'app.coinhouse' + com + '/v2/login',
        'etoro' : https + 'etoro' + com + '/en/login'
    }

    disabled_crypto.placeholder = current_crypto;
    disabled_devise.placeholder = current_devise;

    input_buy.placeholder = "0";
    input_crypto.placeholder = "0";
    document.getElementById('b_'+ result.current_devise).classList.add('checked');
    document.getElementById('b_'+ result.current_crypto).classList.add('checked');
    document.getElementById('b_'+ result.current_platform).classList.add('checked');
});

const buttons = {
    'coinbase' : document.getElementById('b_coinbase'),
    'gdax' : document.getElementById('b_gdax'),
    'kraken' : document.getElementById('b_kraken'),
    'bitstamp' : document.getElementById('b_bitstamp'),
    'bitfinex' : document.getElementById('b_bitfinex'),
    'binance' : document.getElementById('b_binance'),
    'coinhouse' : document.getElementById('b_coinhouse'),
    'etoro' : document.getElementById('b_etoro'),

    'btc' : document.getElementById('b_btc'),
    'eth' : document.getElementById('b_eth'),
    'ltc' : document.getElementById('b_ltc'),
    'bch' : document.getElementById('b_bch')
}

var i = 0;
var exist = null;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.code)
    });

// Listeners for platform buttons
coinbase_button.addEventListener('click', function(){
    //chrome.browserAction.setBadgeBackgroundColor({color: "green"})
    chrome.browserAction.setBadgeText({text:"lol"});
    var platform = this.id.split('_')[1]
    chrome.storage.sync.get(['current_platform'], function(result) {
        if(result.current_platform){
            buttons[result.current_platform].classList.remove('checked')
        }
    });
    chrome.storage.sync.set({current_platform: platform }, function() {   
        buttons[platform].classList.add('checked') 
    });
})

gdax_button.addEventListener('click', function(){
    var platform = this.id.split('_')[1]
    chrome.storage.sync.get(['current_platform'], function(result) {
        if(result.current_platform){
            buttons[result.current_platform].classList.remove('checked')
        }
    });
    chrome.storage.sync.set({current_platform: platform }, function() {   
        buttons[platform].classList.add('checked') 
    });
})

kraken_button.addEventListener('click', function(){
    var platform = this.id.split('_')[1]
    chrome.storage.sync.get(['current_platform'], function(result) {
        if(result.current_platform){
            buttons[result.current_platform].classList.remove('checked')
        }
    });
    chrome.storage.sync.set({current_platform: platform }, function() {   
        buttons[platform].classList.add('checked') 
    });
})

bitstamp_button.addEventListener('click', function(){
    var platform = this.id.split('_')[1]
    chrome.storage.sync.get(['current_platform'], function(result) {
        if(result.current_platform){
            buttons[result.current_platform].classList.remove('checked')
        }
    });
    chrome.storage.sync.set({current_platform: platform }, function() {   
        buttons[platform].classList.add('checked') 
    });
})

bitfinex_button.addEventListener('click', function(){
    var platform = this.id.split('_')[1]
    chrome.storage.sync.get(['current_platform'], function(result) {
        if(result.current_platform){
            buttons[result.current_platform].classList.remove('checked')
        }
    });
    chrome.storage.sync.set({current_platform: platform }, function() {   
        buttons[platform].classList.add('checked') 
    });})

binance_button.addEventListener('click', function(){
    var platform = this.id.split('_')[1]
    chrome.storage.sync.get(['current_platform'], function(result) {
        if(result.current_platform){
            buttons[result.current_platform].classList.remove('checked')
        }
    });
    chrome.storage.sync.set({current_platform: platform }, function() {   
        buttons[platform].classList.add('checked') 
    });})

coinhouse_button.addEventListener('click', function(){
    var platform = this.id.split('_')[1]
    chrome.storage.sync.get(['current_platform'], function(result) {
        if(result.current_platform){
            buttons[result.current_platform].classList.remove('checked')
        }
    });
    chrome.storage.sync.set({current_platform: platform }, function() {   
        buttons[platform].classList.add('checked') 
    });})
etoro_button.addEventListener('click', function(){
    var platform = this.id.split('_')[1]
    chrome.storage.sync.get(['current_platform'], function(result) {
        if(result.current_platform){
            buttons[result.current_platform].classList.remove('checked')
        }
    });
    chrome.storage.sync.set({current_platform: platform }, function() {   
        buttons[platform].classList.add('checked') 
    });})


//Listeners for crypto buttons
btc_button.addEventListener('click', function(){
     var curr = this.id.split('_')[1]
     chrome.storage.sync.get(['current_crypto'], function(result) {
        if(result.current_crypto){
            buttons[result.current_crypto].classList.remove('checked')
        }
    });
        chrome.storage.sync.set({current_crypto: curr }, function() {   
            buttons[curr].classList.add('checked') 
            disabled_crypto.placeholder = crypto[curr]
            input_crypto.placeholder = "0";
            input_crypto.value ="";
            input_buy.value ="";
    });
})

eth_button.addEventListener('click', function(){
    //chrome.browserAction.setBadgeBackgroundColor({color: "green"});
    var curr = this.id.split('_')[1]
    chrome.storage.sync.get(['current_crypto'], function(result) {
       if(result.current_crypto){
           buttons[result.current_crypto].classList.remove('checked')
       }
   });
       chrome.storage.sync.set({current_crypto: curr }, function() {   
           buttons[curr].classList.add('checked') 
           disabled_crypto.placeholder = crypto[curr]
           input_crypto.placeholder = "0";
           input_crypto.value ="";
           input_buy.value ="";
   });
})

bch_button.addEventListener('click', function(){
    var curr = this.id.split('_')[1]
    chrome.storage.sync.get(['current_crypto'], function(result) {
       if(result.current_crypto){
           buttons[result.current_crypto].classList.remove('checked')
       }
   });
       chrome.storage.sync.set({current_crypto: curr }, function() {   
           buttons[curr].classList.add('checked') 
           disabled_crypto.placeholder = crypto[curr]
           input_crypto.placeholder = "0";
           input_crypto.value ="";
           input_buy.value ="";
   });
})

ltc_button.addEventListener('click', function(){
    var curr = this.id.split('_')[1]
    chrome.storage.sync.get(['current_crypto'], function(result) {
       if(result.current_crypto){
           buttons[result.current_crypto].classList.remove('checked')
       }
   });
       chrome.storage.sync.set({current_crypto: curr }, function() {   
           buttons[curr].classList.add('checked') 
           disabled_crypto.placeholder = crypto[curr]
           input_crypto.placeholder = "0";
           input_crypto.value ="";
           input_buy.value ="";
   });
})

// Listeners for currencies buttons

eur_button.addEventListener('click', function(){
    chrome.storage.sync.set({current_devise: 'eur', current_symbol: devise['eur'] }, function() {
        usd_button.classList.remove('checked')
        gbp_button.classList.remove('checked')    
        eur_button.classList.add('checked')    

        chrome.storage.sync.get(['current_devise'], function(result) {
            current_devise = devise[result.current_devise];
            input_buy.placeholder = "0";
            disabled_devise.placeholder = current_devise
            input_buy.value ="";
            input_crypto.value ="";
        });
    });

    chrome.runtime.sendMessage({message: "update"}, function (response) {
        console.log(response.message)
    })
})

usd_button.addEventListener('click', function(){
    chrome.storage.sync.set({current_devise: 'usd', current_symbol: devise['usd'] }, function() {
        eur_button.classList.remove('checked')
        gbp_button.classList.remove('checked')
        usd_button.classList.add('checked')

        chrome.storage.sync.get(['current_devise'], function(result) {
            current_devise = devise[result.current_devise];
            input_buy.placeholder = "0";
            disabled_devise.placeholder = current_devise
            input_buy.value ="";
            input_crypto.value ="";
        });
    });

    chrome.runtime.sendMessage({messsage: "update"}, function (response) {
        console.log(response.message)
    })
})

gbp_button.addEventListener('click', function(){
    chrome.storage.sync.set({current_devise: 'gbp', current_symbol: devise['gbp'] }, function() {
        eur_button.classList.remove('checked')
        usd_button.classList.remove('checked')      
        gbp_button.classList.add('checked')  
        
        chrome.storage.sync.get(['current_devise'], function(result) {
            current_devise = devise[result.current_devise];
            input_buy.placeholder = "0";
            disabled_devise.placeholder = current_devise
            input_buy.value ="";
            input_crypto.value ="";
        });
    });
    chrome.runtime.sendMessage({message: "update"}, function (response) {
        console.log(response.message)
    })
})


// Variables utiles pour la gestion de la saisie de l'input buy / sell
var scrollCount = 1;
var old_placeholder = 0;
var new_placeholder = 0;


// Gestion Incrémentation décrémentation de l'input buy/sell au mousewheel
input_buy.addEventListener('mousewheel', function(e){
    if(input_buy.value.length < 1){
    old_placeholder = input_buy.placeholder;

    if(e.wheelDelta<0 && old_placeholder >= 1){
        new_placeholder = (parseFloat(old_placeholder) - 1).toFixed(2);
        input_buy.placeholder = new_placeholder;
    }

    else if(e.wheelDelta>0 && old_placeholder <= 9999){
        new_placeholder = (parseFloat(old_placeholder) + 1).toFixed(2);
        input_buy.placeholder = new_placeholder;    }
    }else{
        old_value = input_buy.value;

        if(e.wheelDelta<0 && old_value >= 1){
            new_value = (parseFloat(old_value) - 1).toFixed(2)
            input_buy.value = new_value;
        }
    
        else if(e.wheelDelta>0 && old_value <= 9999){
            new_value = (parseFloat(old_value) + 1).toFixed(2);
            input_buy.value = new_value;    }        
    }
    chrome.storage.sync.get(['current_crypto'], function(result) {
        conv_crypto = 'price_' + result.current_crypto;
        chrome.storage.sync.get([conv_crypto], function(resultbis) {
            curr_crypto = conv_crypto.split('_')[1]
            switch(curr_crypto){
                case 'btc':
                    unit_price = resultbis.price_btc;
                    input_crypto.value = parseFloat(input_buy.value / unit_price).toFixed(5);
                    break;
                case 'eth':
                    unit_price = resultbis.price_eth;
                    input_crypto.value = parseFloat(input_buy.value / unit_price).toFixed(5);
                    break;
                case 'ltc':
                    unit_price = resultbis.price_ltc;
                    input_crypto.value = parseFloat(input_buy.value / unit_price).toFixed(5);
                    break;
                case 'bch':
                    unit_price = resultbis.price_bch;
                    input_crypto.value = parseFloat(input_buy.value / unit_price).toFixed(5);
                    break;
                default:
                    console.log('Oops..')
            }
        })
    });
});

// Gere l'entrée de la somme à acheter/vendre
input_buy.addEventListener('keypress', function(evt){
    isComma = evt.code.indexOf('Comma') >= 0 || evt.code.indexOf('Decimal') >= 0;;
    isNumber = evt.code.indexOf('Digit') >= 0;
    isNumberPad = evt.code.indexOf('Numpad') >= 0;
    cursorPosition = input_buy.selectionStart;

    if( isNumber || isNumberPad || isComma ){
        if(input_buy.placeholder == "0"){
            old_value = input_buy.value;
        }else{
            old_value = input_buy.placeholder;
            input_buy.placeholder = "0";
        }

        if(isNumber){
            enter_value = evt.code.split('Digit')[1];
        }else if(isNumberPad && !isComma){
            enter_value = evt.code.split('Numpad')[1];
        }else{
            enter_value = '.'
        }

        new_value = old_value + enter_value;

        isCommaAuth = new_value.split('.').length <= 2;

        valid = (!isNaN(enter_value) || (isComma && isCommaAuth ) )

        if(input_buy.value.length < 10 && valid){
            if(input_buy.value.length < 1){
                if(parseInt(enter_value) != 0){
                    if(isComma){
                        input_buy.value = '0' + new_value;
                    }else{
                        input_buy.value = new_value;
                    }
                }else{
                    input_buy.value = enter_value + '.'
                }
            }else{
                if(cursorPosition == input_buy.value.length){
                    input_buy.value = new_value;
                }else{
                    input_buy.setRangeText(enter_value)
                    input_buy.setSelectionRange(cursorPosition + 1, cursorPosition +1)
                }
            }
            chrome.storage.sync.get(['current_crypto'], function(result) {
                conv_crypto = 'price_' + result.current_crypto;
                chrome.storage.sync.get([conv_crypto], function(resultbis) {
                    curr_crypto = conv_crypto.split('_')[1]
                    switch(curr_crypto){
                        case 'btc':
                            unit_price = resultbis.price_btc;
                            input_crypto.value = parseFloat(input_buy.value / unit_price).toFixed(5);
                            break;
                        case 'eth':
                            unit_price = resultbis.price_eth;
                            input_crypto.value = parseFloat(input_buy.value / unit_price).toFixed(5);
                            break;
                        case 'ltc':
                            unit_price = resultbis.price_ltc;
                            input_crypto.value = parseFloat(input_buy.value / unit_price).toFixed(5);
                            break;
                        case 'bch':
                            unit_price = resultbis.price_bch;
                            input_crypto.value = parseFloat(input_buy.value / unit_price).toFixed(5);
                            break;
                        default:
                            console.log('Oops..')
                    }
                })
            });  
        }  
    }
});


// Quand l'user efface sa saisie ca vide le champ pour laisser place au placeholder
input_buy.addEventListener('keyup', function(evt){
    verifEnter = evt.code == 'Backspace'
    verifLength = input_buy.value.length < 1
    if(verifEnter){
        input_buy.placeholder = "0";
        input_buy.value = parseFloat(input_buy.value)*1
        if(verifLength){
            input_buy.value = "";
        }
        chrome.storage.sync.get(['current_crypto'], function(result) {
            conv_crypto = 'price_' + result.current_crypto;
            chrome.storage.sync.get([conv_crypto], function(resultbis) {
                curr_crypto = conv_crypto.split('_')[1]
                switch(curr_crypto){
                    case 'btc':
                        unit_price = resultbis.price_btc;
                        input_crypto.value = parseFloat(input_buy.value / unit_price).toFixed(5);
                        break;
                    case 'eth':
                        unit_price = resultbis.price_eth;
                        input_crypto.value = parseFloat(input_buy.value / unit_price).toFixed(5);
                        break;
                    case 'ltc':
                        unit_price = resultbis.price_ltc;
                        input_crypto.value = parseFloat(input_buy.value / unit_price).toFixed(5);
                        break;
                    case 'bch':
                        unit_price = resultbis.price_bch;
                        input_crypto.value = parseFloat(input_buy.value / unit_price).toFixed(5);
                        break;
                    default:
                        console.log('Oops..')
                }
            })
        });
    }
});

// Les event focus minimisent le risque que l'user essaie de jouer avec le code pour faire de la merde
input_buy.addEventListener('focus', function(){
    input_buy.maxLength = 0;
});


input_crypto.addEventListener('keypress', function(evt){

    isComma = evt.code.indexOf('Comma') >= 0 || evt.code.indexOf('Decimal') >= 0;
    isNumber = evt.code.indexOf('Digit') >= 0;
    isNumberPad = evt.code.indexOf('Numpad') >= 0;
    cursorPosition = input_crypto.selectionStart;

    if(isNumber || isNumberPad || isComma){
        if(input_crypto.placeholder == "0"){
            old_value = input_crypto.value;
        }else{
            old_value = input_crypto.placeholder;
            input_crypto.placeholder = "0";
        }
        if(isNumber){
            enter_value = evt.code.split('Digit')[1];
        }else if(isNumberPad && !isComma){
            enter_value = evt.code.split('Numpad')[1];
        }else{
            enter_value = '.'
        }
        new_value = old_value + enter_value;

        isCommaAuth = new_value.split('.').length <= 2;

        valid = (!isNaN(enter_value) || (isComma && isCommaAuth ) )

        if(input_crypto.value.length < 10 && valid){
            if(input_crypto.value.length < 1){
                if(parseInt(enter_value) != 0){
                    if(isComma){
                        input_crypto.value = '0' + new_value;
                    }else{
                        input_crypto.value = new_value;
                    }
                }else{
                    input_crypto.value = enter_value + '.'
                }
            }else{
                // SI LE CURSEUR EST A LA FIN ON RAJOUTE JUSTE A LA SUITE 
                if(cursorPosition == input_crypto.value.length){
                    input_crypto.value = new_value;
                // SINON ON FAIT EN SORTE D'AJOUTER AU BON ENDROIT
                }else{
                    input_crypto.setRangeText(enter_value)
                    input_crypto.setSelectionRange(cursorPosition + 1, cursorPosition +1)
                }
            }
            chrome.storage.sync.get(['current_crypto'], function(result) {
                conv_crypto = 'price_' + result.current_crypto;
                chrome.storage.sync.get([conv_crypto], function(resultbis) {
                    curr_crypto = conv_crypto.split('_')[1]
                    switch(curr_crypto){
                        case 'btc':
                            unit_price = resultbis.price_btc;
                            input_buy.value = parseFloat(input_crypto.value * unit_price).toFixed(2);
                            break;
                        case 'eth':
                            unit_price = resultbis.price_eth;
                            input_buy.value = parseFloat(input_crypto.value * unit_price).toFixed(2);
                            break;
                        case 'ltc':
                            unit_price = resultbis.price_ltc;
                            input_buy.value = parseFloat(input_crypto.value * unit_price).toFixed(2);
                            break;
                        case 'bch':
                            unit_price = resultbis.price_bch;
                            input_buy.value = parseFloat(input_crypto.value * unit_price).toFixed(2);
                            break;
                        default:
                            console.log('Oops..')
                    }
                })
            });           
        }
    }
});

input_crypto.addEventListener('mousewheel', function(e){
    if(input_crypto.value.length < 1){
    old_placeholder = input_crypto.placeholder;

    if(e.wheelDelta<0 && old_placeholder >= 0.01){
        new_placeholder = (parseFloat(old_placeholder) - 0.01).toFixed(2)
        input_crypto.placeholder = new_placeholder;
    }

    else if(e.wheelDelta>0 && old_placeholder <= 9999){
        new_placeholder = (parseFloat(old_placeholder) + 0.01).toFixed(2);
        input_crypto.placeholder = new_placeholder;    }
    }else{
        old_value = input_crypto.value;

        if(e.wheelDelta<0 && old_value >= 0.01){
            new_value = (parseFloat(old_value) - 0.01).toFixed(2)
            input_crypto.value = new_value;
        }
    
        else if(e.wheelDelta>0 && old_value <= 9999){
            new_value = (parseFloat(old_value) + 0.01).toFixed(2);
            input_crypto.value = new_value;    }        
    }

    chrome.storage.sync.get(['current_crypto'], function(result) {
        conv_crypto = 'price_' + result.current_crypto;
        chrome.storage.sync.get([conv_crypto], function(resultbis) {
            curr_crypto = conv_crypto.split('_')[1]
            switch(curr_crypto){
                case 'btc':
                    unit_price = resultbis.price_btc;
                    input_buy.value = parseFloat(input_crypto.value * unit_price).toFixed(2);
                    break;
                case 'eth':
                    unit_price = resultbis.price_eth;
                    input_buy.value = parseFloat(input_crypto.value * unit_price).toFixed(2);
                    break;
                case 'ltc':
                    unit_price = resultbis.price_ltc;
                    input_buy.value = parseFloat(input_crypto.value * unit_price).toFixed(2);
                    break;
                case 'bch':
                    unit_price = resultbis.price_bch;
                    input_buy.value = parseFloat(input_crypto.value * unit_price).toFixed(2);
                    break;
                default:
                    console.log('Oops..')
            }
        })
     });   
    
});

input_crypto.addEventListener('keyup', function(evt){
    verifEnter = evt.code == 'Backspace'
    verifLength = input_crypto.value.length < 1
    if(verifEnter){
        input_crypto.placeholder = "0"
        input_crypto.value = (parseFloat(input_crypto.value)*1)
        if(verifLength){
            input_crypto.value = "";
        }
        chrome.storage.sync.get(['current_crypto'], function(result) {
            conv_crypto = 'price_' + result.current_crypto;
            chrome.storage.sync.get([conv_crypto], function(resultbis) {
                curr_crypto = conv_crypto.split('_')[1]
                switch(curr_crypto){
                    case 'btc':
                        unit_price = resultbis.price_btc;
                        input_buy.value = parseFloat(input_crypto.value * unit_price).toFixed(2);
                        break;
                    case 'eth':
                        unit_price = resultbis.price_eth;
                        input_buy.value = parseFloat(input_crypto.value * unit_price).toFixed(2);
                        break;
                    case 'ltc':
                        unit_price = resultbis.price_ltc;
                        input_buy.value = parseFloat(input_crypto.value * unit_price).toFixed(2);
                        break;
                    case 'bch':
                        unit_price = resultbis.price_bch;
                        input_buy.value = parseFloat(input_crypto.value * unit_price).toFixed(2);
                        break;
                    default:
                        console.log('Oops..')
                }
            })
        });   
    }
});

input_crypto.addEventListener('focus', function(){
    input_crypto.maxLength = 0;
});

button_receive.addEventListener('click', function(){
    chrome.storage.sync.get(['current_platform'], function(result) {
        if(result.current_platform){
            window.open(url_buy[result.current_platform])
        }
    });
})

button_send.addEventListener('click', function(){
    chrome.storage.sync.get(['current_platform'], function(result) {
        if(result.current_platform){
            window.open(url_buy[result.current_platform])
        }
    });
})


button_buy.addEventListener('click', function(){
    chrome.storage.sync.get(['current_platform'], function(result) {
        if(result.current_platform){
            window.open(url_buy[result.current_platform])
        }
    });
})

button_sell.addEventListener('click', function(){
    chrome.storage.sync.get(['current_platform'], function(result) {
        if(result.current_platform){
            window.open(url_buy[result.current_platform])
        }
    });
})

git_button.addEventListener('click', function(){
    window.open("https://www.github.com/LouisMzk/MakeCryptoEasier");
})

donate_button.addEventListener('click', function(){
    alert('We need to get stars on our github repository, '
        +'please support us by giving a star if you like our project !')    
    window.open("https://www.github.com/LouisMzk/MakeCryptoEasier");
})

join_button.addEventListener('click', function() {
    window.open('https://discordapp.com/invite/ZTCKWrh');
})

