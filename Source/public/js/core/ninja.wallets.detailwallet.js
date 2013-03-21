define(["ninja", "Bitcoin"], function (ninja, Bitcoin) {
    ninja.wallets.detailwallet = {
        open: function() {
            document.getElementById("detailprivkey").focus();
        },

        close: function() {
        },

        viewDetails: function() {
            var key = document.getElementById("detailprivkey").value.toString().replace(/^\s+|\s+$/g, ""); // trim white space
            document.getElementById("detailprivkey").value = key;
            if (Bitcoin.ECKey.isMiniFormat(key)) {
                // show Private Key Mini Format
                document.getElementById("detailprivmini").innerHTML = key;
                document.getElementById("detailmini").style.display = "block";
            } else {
                // hide Private Key Mini Format
                document.getElementById("detailmini").style.display = "none";
            }
            var btcKey = new Bitcoin.ECKey(key);
            if (btcKey.priv === null) {
                // enforce a minimum passphrase length
                if (key.length >= ninja.wallets.brainwallet.minPassphraseLength) {
                    // Deterministic Wallet confirm box to ask if user wants to SHA256 the input to get a private key
                    var usePassphrase = confirm(ninja.translator.get("detailconfirmsha256"));
                    if (usePassphrase) {
                        var bytes = Crypto.SHA256(key, { asBytes: true });
                        btcKey = new Bitcoin.ECKey(bytes);
                    } else {
                        ninja.wallets.detailwallet.clear();
                    }
                } else {
                    alert(ninja.translator.get("detailalertnotvalidprivatekey"));
                    ninja.wallets.detailwallet.clear();
                }
            }
            if (btcKey.priv !== null) {
                btcKey.setCompressed(false);
                document.getElementById("detailprivhex").innerHTML = btcKey.toString().toUpperCase();
                document.getElementById("detailprivb64").innerHTML = btcKey.toString("base64");
                var bitcoinAddress = btcKey.getBitcoinAddress();
                var wif = btcKey.getBitcoinWalletImportFormat();
                document.getElementById("detailpubkey").innerHTML = btcKey.getPubKeyHex();
                document.getElementById("detailaddress").innerHTML = bitcoinAddress;
                document.getElementById("detailprivwif").innerHTML = wif;
                btcKey.setCompressed(true);
                var bitcoinAddressComp = btcKey.getBitcoinAddress();
                var wifComp = btcKey.getBitcoinWalletImportFormat();
                document.getElementById("detailpubkeycomp").innerHTML = btcKey.getPubKeyHex();
                document.getElementById("detailaddresscomp").innerHTML = bitcoinAddressComp;
                document.getElementById("detailprivwifcomp").innerHTML = wifComp;

                ninja.qrCode.showQrCode({
                    "detailqrcodepublic": bitcoinAddress,
                    "detailqrcodepubliccomp": bitcoinAddressComp,
                    "detailqrcodeprivate": wif,
                    "detailqrcodeprivatecomp": wifComp
                });
            }
        },

        clear: function() {
            document.getElementById("detailpubkey").innerHTML = "";
            document.getElementById("detailpubkeycomp").innerHTML = "";
            document.getElementById("detailaddress").innerHTML = "";
            document.getElementById("detailaddresscomp").innerHTML = "";
            document.getElementById("detailprivwif").innerHTML = "";
            document.getElementById("detailprivwifcomp").innerHTML = "";
            document.getElementById("detailprivhex").innerHTML = "";
            document.getElementById("detailprivb64").innerHTML = "";
            document.getElementById("detailprivmini").innerHTML = "";
            document.getElementById("detailqrcodepublic").innerHTML = "";
            document.getElementById("detailqrcodepubliccomp").innerHTML = "";
            document.getElementById("detailqrcodeprivate").innerHTML = "";
            document.getElementById("detailqrcodeprivatecomp").innerHTML = "";
        }
    };
});