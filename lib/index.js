'use strict';

var
  detectCryptocoin,
  _ = require('lodash'),
  base58;

try {
  base58 = require('base58-native').base58Check;
} catch (e) {
  base58 = {
    decode: function(){ return true; }
  };
}

detectCryptocoin = function (args, list, hashcheck){
  var
    result = {
      conflicts: {},
      invalids : []
    };

  list = list || _.keys(detectCryptocoin.coins);
  hashcheck = hashcheck || true;

  if (args && Object.prototype.toString.call(args) !== '[object Array]') {
    args = [args];
  }

  if (args.length === 0) {
    throw new TypeError('You must provide either an array or a string');
  }

  // Build a index once, so we don't iterate over it everytime
  _.forIn(detectCryptocoin.coins, function (key, value, arr){
    _.forEach(arr[value].start, function (start){
      if (!_.isArray(detectCryptocoin.index[start])) {
        detectCryptocoin.index[start] = [];
      }

      if (!(value in detectCryptocoin.index[start])) {
        detectCryptocoin.index[start].push(value);
      }
    });
  });

  function returnUniq(obj, member, address){
    if (!_.isArray(obj[member])) {
      obj[member] = [];
    }
    obj[member].push(address);
    obj[member] = _.uniq(obj[member]);
  }

  var start, coin;

  _.forEach(args, function (address){

    try {
      if (hashcheck && !base58.decode(address)) {
        returnUniq(result, 'invalids', address);
      } else {
        start = address.charAt(0);

        // the first character must be in the index
        if ((start in detectCryptocoin.index)) {
          // We get only one, that's it, push to stack
          if ((coin = _.intersection(detectCryptocoin.index[start], list)).length === 1) {
            returnUniq(result, coin[0], address);
          } else {
            _.forEach(coin, function(i, index, arr){
              if (!_.isObject(result.conflicts[i])) {
                result.conflicts[i] = {};
              }

              _.forEach(_.difference(arr, [i]), function(x){
                returnUniq(result.conflicts[i], x, address);
              });
            });
          }
        } else {
          returnUniq(result, 'invalids', address);
        }
      }
    } catch (e) {
      returnUniq(result, 'invalids', address);
    }
  });

  return result;
};


detectCryptocoin.index = {};

detectCryptocoin.coins = {
  BTC: {
    name : 'Bitcoin',
    start: ['1', '3']
  },
  NRB: {
    name : 'Noirbits',
    start: ['E']
  },
  TRC: {
    name : 'Terracoin',
    start: ['1']
  },
  KGC: {
    name : 'Krugercoin',
    start: ['Z', 'Y']
  },
  BOT: {
    name : 'Bottlecaps',
    start: ['E', 'F']
  },
  FST: {
    name : 'Fastcoin',
    start: ['f']
  },
  DGC: {
    name : 'Digital Coin',
    start: ['D']
  },
  BQC: {
    name : 'BBQCoin',
    start: ['b']
  },
  BTB: {
    name : 'Bitbar',
    start: ['B']
  },
  NVC: {
    name : 'Novacoin',
    start: ['4']
  },
  LTC: {
    name : 'Litecoin',
    start: ['L']
  },
  WDC: {
    name : 'Worldcoin',
    start: ['W']
  },
  FTC: {
    name : 'Feathercoin',
    start: ['6', '7']
  },
  FRK: {
    name : 'Franko',
    start: ['F']
  },
  MNC: {
    name : 'Mincoin',
    start: ['M']
  },
  SBC: {
    name : 'Stablecoin',
    start: ['s']
  },
  MEC: {
    name : 'Megacoin',
    start: ['M']
  },
  PPC: {
    name : 'PPCoin',
    start: ['P']
  },
  HYC: {
    name : 'Hypercoin',
    start: ['H']
  },
  FRC: {
    name : 'Freicoin',
    start: ['1']
  },
  ALF: {
    name : 'Alphacoin',
    start: ['a']
  },
  NMC: {
    name : 'Namecoin',
    start: ['N']
  },
  IXC: {
    name : 'Ixcoin',
    start: ['x']
  },
  DVC: {
    name : 'Devcoin',
    start: ['1']
  },
  XPM: {
    name : 'Primecoin',
    start: ['A']
  }
};

module.exports = detectCryptocoin;