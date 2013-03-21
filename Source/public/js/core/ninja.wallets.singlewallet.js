define(["ninja", "Bitcoin"], function (ninja, Bitcoin) {
    ninja.wallets.singlewallet = {
        open: function() {
            if (document.getElementById("btcaddress").innerHTML === "") {
                // dirty trick ;) 500 it is preferrable timeout for iPad 3
                ninja.wallets.singlewallet.generateNewAddressAndKey(500);
            }
        },

        close: function() {
        },

        // generate bitcoin address and private key and update information in the HTML
        generateNewAddressAndKey: function(timeout) {
            $('#newaddress').button('loading');
            document.getElementById("keyarea").style.visibility = "hidden";
            // do not want my ui to be freezed
            setTimeout(function(){
                ninja.wallets.singlewallet.generateNewAddressAndKeyCore();
                document.getElementById("keyarea").style.visibility = "visible";
                $('#newaddress').button('reset');
            }, (timeout || 20));
        },
        
        generateNewAddressAndKeyCore: function() {    
            try {
                var key = new Bitcoin.ECKey(false);
                var bitcoinAddress = key.getBitcoinAddress();
                var privateKeyWif = key.getBitcoinWalletImportFormat();
                document.getElementById("btcaddress").innerHTML = bitcoinAddress;
                document.getElementById("btcprivwif").innerHTML = privateKeyWif;
                var keyValuePair = {
                    "qrcode_public": bitcoinAddress,
                    "qrcode_private": privateKeyWif
                };
                ninja.qrCode.showQrCode(keyValuePair);
            } catch(e) {
                // browser does not have sufficient JavaScript support to generate a bitcoin address
                alert(e);
                document.getElementById("btcaddress").innerHTML = "error";
                document.getElementById("btcprivwif").innerHTML = "error";
                document.getElementById("qrcode_public").innerHTML = "";
                document.getElementById("qrcode_private").innerHTML = "";
            }
        }
    };
});