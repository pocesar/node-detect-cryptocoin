var
  expect = require('expect.js'),
  lib = require('../lib');

module.exports = {
  'Detect Cryptocoin': {
    'throws exception on empty arguments': function (){
      expect(lib).to.throwException();
    },
    'list default coins'                 : function (){
      expect(lib.coins).to.be.ok();
      expect(Object.keys(lib.coins).length).to.equal(25);
    },
    'limit addresses and parse correctly'          : function (){
      var detected = lib([
        '1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu',
        'LW2kXiquqDu3GfpfBX2xNTSgjVmBPu6g3z',
        'PNKZEkDf9eBSNebu2CcxHaGuma6wHuZEBh',
        'ARKZ7uVE1YS19HC8jSq5xZGkr6YAzugWBv'
        ], ['BTC','LTC','PPC','XPM']);

      expect(detected.invalids.length).to.equal(0);
      expect(detected).to.eql({
        'conflicts': {},
        'invalids': [],
        'BTC': ['1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu'],
        'LTC': ['LW2kXiquqDu3GfpfBX2xNTSgjVmBPu6g3z'],
        'PPC': ['PNKZEkDf9eBSNebu2CcxHaGuma6wHuZEBh'],
        'XPM': ['ARKZ7uVE1YS19HC8jSq5xZGkr6YAzugWBv']
      });
    },
    'detect custom coin' : function (){
      lib.coins.INC = {
        name: 'Inexistant Coin',
        start: ['V']
      };

      var detected = lib([
        'VNKZEkDf9eBSNebu2CcxHaGuma6wHuZEBh',
        'VW2kXiquqDu3GfpfBX2xNTSgjVmBPu6g3z'
      ], null, false);

      expect(detected.invalids.length).to.equal(0);
      expect(detected.INC.length).to.equal(2);
    },
    'set invalid if doesnt exist'          : function (){
      var detected = lib(['QNKZEkDf9eBSNebu2CcxHaGuma6wHuZEBh'], null, false);

      expect(detected.invalids.length).to.equal(1);
    },
    'addresses should be unique': function(){
      var detected = lib([
        '1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu',
        '1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu',
        '1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu'
      ], ['BTC']);

      expect(detected.BTC.length).to.equal(1);
    },
    'ignore coins not in allowed list': function(){
      var detected = lib([
        '1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu',
        '1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu',
        '1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu'
      ], ['LTC']);

      expect(detected).to.eql({invalids:[], conflicts:{}});
    }
  }
};