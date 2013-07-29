node-detect-cryptocoin
======================

Detects which cryptcoin is the given cryptocoin address (starts with some coins listed in CoinWarz.com that have working block explorers)

This isn't by any means accurate, it's a quick & dirty check, you have to resolve any conflicts by yourself.

The addresses are checked using

Contains `Util` code from [bitcoinjs-server](`https://github.com/bitcoinjs/bitcoinjs-server`)

# Usage

```js
var dcc = require('detect-cryptocoin');

var detected = dcc([
    '1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu',
    'LW2kXiquqDu3GfpfBX2xNTSgjVmBPu6g3z',
    'PNKZEkDf9eBSNebu2CcxHaGuma6wHuZEBh',
    'ARKZ7uVE1YS19HC8jSq5xZGkr6YAzugWBv'
    ], ['BTC','LTC','PPC','XPM']);
    // You may narrow the function results by passing only the allowed list as the second parameter.

console.log(detected);
/**
 * yields:
 * {
 *   'BTC': ['1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu'],
 *   'LTC:  ['LW2kXiquqDu3GfpfBX2xNTSgjVmBPu6g3z'],
 *   'PPC': ['PNKZEkDf9eBSNebu2CcxHaGuma6wHuZEBh'],
 *   'XPM': ['ARKZ7uVE1YS19HC8jSq5xZGkr6YAzugWBv']
 * }
 */

// add more coins using:

detected.coins.HKK = {
    name: 'HongKongKoin',
    starts: ['h']
};

// you may do an easy and fast check, using, [COIN SYMBOL].cryptocoinexplorer.com/q/checkaddress/[ADDRESS] for example

// If there's a conflict, you must check with your coin daemon if these addresses exists there, or using an API.
// They are valid, but they match multiple coins.
// Check the 'conflicts' member for conflicts:

{
    'LTC:  ['LW2kXiquqDu3GfpfBX2xNTSgjVmBPu6g3z'],
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

```

There's also a helper function, `dcc.valid`, it checks using `Base58Check` using Node.js `Buffers` (instead of Bignum/Bigint).
It's not as performant, but it works in Windows.

# Do you like it? Wanna support the development?

```bash
npm star detect-cryptocoin
```

`BTC: 1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu`

`LTC: LW2kXiquqDu3GfpfBX2xNTSgjVmBPu6g3z`

`PPC: PNKZEkDf9eBSNebu2CcxHaGuma6wHuZEBh`

`XPM: ARKZ7uVE1YS19HC8jSq5xZGkr6YAzugWBv`