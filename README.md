[![Build Status](https://travis-ci.org/pocesar/node-detect-cryptocoin.png)](https://travis-ci.org/pocesar/node-detect-cryptocoin)


node-detect-cryptocoin
======================

Detects which cryptcoin is the given cryptocoin address (starts with some coins listed in CoinWarz.com that have working block explorers)

This isn't by any means accurate, it's a quick & dirty check, you have to resolve any conflicts by yourself.

Coins supported out-of-the-box:

* Bitcoin
* Noirbits
* Terracoin
* Krugercoin
* Bottlecaps
* Fastcoin
* Digital Coin
* BBQCoin
* Bitbar
* Novacoin
* Litecoin
* Worldcoin
* Feathercoin
* Franko
* Mincoin
* Stablecoin
* Megacoin
* PPCoin
* Hypercoin
* Freicoin
* Alphacoin
* Namecoin
* Ixcoin
* Devcoin
* Primecoin

The addresses are checked using base58Check native module (currently doesn't work on Windows, so it's shim'ed)

# Usage

```js
var dcc = require('detect-cryptocoin');

var detected = dcc([
    '1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu',
    'LW2kXiquqDu3GfpfBX2xNTSgjVmBPu6g3z',
    'PNKZEkDf9eBSNebu2CcxHaGuma6wHuZEBh',
    'ARKZ7uVE1YS19HC8jSq5xZGkr6YAzugWBv'
    ], ['BTC','LTC','PPC','XPM']);
    // You may narrow the function results by passing only the allowed/expected list as the second parameter.
    // everything that isn't in this list is ignored

console.log(detected);

// yields:
{
  'BTC': ['1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu'],
  'LTC': ['LW2kXiquqDu3GfpfBX2xNTSgjVmBPu6g3z'],
  'PPC': ['PNKZEkDf9eBSNebu2CcxHaGuma6wHuZEBh'],
  'XPM': ['ARKZ7uVE1YS19HC8jSq5xZGkr6YAzugWBv'],
  'conflicts': {},
  'invalids': []
}

// add more coins using:

dcc.coins.HKK = {
    name: 'HongKongKoin',
    starts: ['h']
};

// you may do an easy and fast check, using, [COIN SYMBOL].cryptocoinexplorer.com/q/checkaddress/[ADDRESS] for example

// If there's a conflict, you must check with your coin daemon if these addresses exists there, or using an API.
// They are valid, but they match multiple coins.
// Check the 'conflicts' member for conflicts:

{
    'LTC': ['LW2kXiquqDu3GfpfBX2xNTSgjVmBPu6g3z'],
    'PPC': ['PNKZEkDf9eBSNebu2CcxHaGuma6wHuZEBh'],
    'XPM': ['ARKZ7uVE1YS19HC8jSq5xZGkr6YAzugWBv'],
    'conflicts': {
        'BTC': {
            'TRC': ['1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu'],
            'DVC': ['1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu'],
            'FRC': ['1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu']
        },
        'TRC': {
            'BTC': ['1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu'],
            'DVC': ['1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu'],
            'FRC': ['1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu']
        },
        'FRC': {
            'BTC': ['1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu'],
            'DVC': ['1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu'],
            'TRC': ['1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu']
        },
        'DVC': {
            'FRC': ['1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu'],
            'BTC': ['1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu'],
            'TRC': ['1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu']
        }
    },
    'invalids': []
}

// If there are any invalids, they will go in 'invalids' member array

// You may overwrite the original detect.isValid function with your own
// so you may do your online / daemon check by yourself, it receives 3 arguments:
// address, detected

dcc.isValid = function(address, detected, list){
    // you can access dcc.index that is the built index from the available coins

    // detected is an array of possible coins
    // the current list of allowed/expected coins

    // return a boolean
    return true;
};

// be a good citizen, just make sure to backup the original function :)
```


# Do you like it? Wanna support the development?

```bash
npm star detect-cryptocoin
```

`BTC: 1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu`

`LTC: LW2kXiquqDu3GfpfBX2xNTSgjVmBPu6g3z`

`PPC: PNKZEkDf9eBSNebu2CcxHaGuma6wHuZEBh`

`XPM: ARKZ7uVE1YS19HC8jSq5xZGkr6YAzugWBv`