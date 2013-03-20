define([
        "BitcoinLib/base58",
        "BitcoinLib/address",
        "BitcoinLib/ecdsa",
        "BitcoinLib/eckey",
        "BitcoinLib/util"
], function (Base58, Address, ECDSA, ECKey, Util) {
    
    var Bitcoin = {};
    Bitcoin.Base58 = Base58;
    Bitcoin.Address = Address;
    Bitcoin.ECDSA = ECDSA;
    Bitcoin.ECKey = ECKey;
    Bitcoin.Util = Util;
    
    return Bitcoin;
});