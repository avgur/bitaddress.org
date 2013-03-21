require.config({
    paths: {
        "Crypto": "libs/crypto/crypto",
        "SecureRandom": "libs/crypto/securerandom",
        "EllipticCurve": "libs/crypto/ecdsa",
        "BigInteger": "libs/crypto/biginteger",
        "QRCode": "libs/qrcode",
        "Bitcoin": "libs/bitcoin/bitcoin",
        "BitcoinLib": "libs/bitcoin",
        "ninja": "core/ninja"
    }
});

require([
        "SecureRandom",
        "Bitcoin",
        "ninja",
    
        "core/ninja.seeder",
        "core/ninja.translator",
        "core/ninja.wallets.brainwallet",
        "core/ninja.wallets.bulkwallet",
        "core/ninja.wallets.detailwallet",
        "core/ninja.wallets.paperwallet",
        "core/ninja.wallets.singlewallet",
        "core/ninja.wallets.vanitywallet",
        "core/ninja.tests"
], function (SecureRandom, Bitcoin, ninja) {
    
    window.ninja = ninja;
    
    function addEvent(obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        }
        else if (obj.attachEvent) {
            obj["e" + type + fn] = fn;
            obj[type + fn] = function() { obj["e" + type + fn](window.event); };
            obj.attachEvent("on" + type, obj[type + fn]);
        }
        else {
            obj["on" + type] = obj["e" + type + fn];
        }
    }

    addEvent(window.document.body, 'click', SecureRandom.seedTime);
    addEvent(window.document.body, 'keypress', SecureRandom.seedTime);
    addEvent(window.document.body, 'mousemove', ninja.seeder.seed);
    
    var unittests = ninja.getQueryString().unittests;
    if (unittests == "true" || unittests == "1") {
        ninja.unitTests.runTests();
        ninja.translator.showEnglishJson();
    }

    // change language
    var culture = ninja.getQueryString().culture;
    if (culture !== undefined) {
        ninja.translator.translate(culture);
    }

    // testnet, check if testnet edition should be activated
    var testnet = ninja.getQueryString().testnet;
    if (testnet == "true" || testnet == "1") {
        document.getElementById("testnet").innerHTML = ninja.translator.get("testneteditionactivated");
        document.getElementById("testnet").style.display = "block";
        document.getElementById("detailwifprefix").innerHTML = "'9'";
        document.getElementById("detailcompwifprefix").innerHTML = "'c'";
        Bitcoin.Address.networkVersion = 0x6F; // testnet
        Bitcoin.ECKey.privateKeyPrefix = 0xEF; // testnet
        ninja.testnetMode = true;
    }

    // if users does not move mouse after random amount of time then generate the key anyway.
    // ninja.seeder.forceGenerate();
    setTimeout(ninja.seeder.forceGenerate, ninja.seeder.seedLimit * 20);
});
