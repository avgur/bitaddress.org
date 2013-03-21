define(["Bitcoin", "EllipticCurve", "Crypto"], function (Bitcoin, EllipticCurve, Crypto) {

    var ninja = { wallets: {} };

    ninja.privateKey = {
        isPrivateKey: function(key) {
            return (
                Bitcoin.ECKey.isWalletImportFormat(key) ||
                    Bitcoin.ECKey.isCompressedWalletImportFormat(key) ||
                    Bitcoin.ECKey.isHexFormat(key) ||
                    Bitcoin.ECKey.isBase64Format(key) ||
                    Bitcoin.ECKey.isMiniFormat(key)
            );
        },
        getECKeyFromAdding: function(privKey1, privKey2) {
            var n = EllipticCurve.getSECCurveByName("secp256k1").getN();
            var ecKey1 = new Bitcoin.ECKey(privKey1);
            var ecKey2 = new Bitcoin.ECKey(privKey2);
            // if both keys are the same return null
            if (ecKey1.getBitcoinHexFormat() == ecKey2.getBitcoinHexFormat()) return null;
            var combinedPrivateKey = new Bitcoin.ECKey(ecKey1.priv.add(ecKey2.priv).mod(n));
            // compressed when both keys are compressed
            if (ecKey1.compressed && ecKey2.compressed) combinedPrivateKey.setCompressed(true);
            return combinedPrivateKey;
        },
        getECKeyFromMultiplying: function(privKey1, privKey2) {
            var n = EllipticCurve.getSECCurveByName("secp256k1").getN();
            var ecKey1 = new Bitcoin.ECKey(privKey1);
            var ecKey2 = new Bitcoin.ECKey(privKey2);
            // if both keys are the same return null
            if (ecKey1.getBitcoinHexFormat() == ecKey2.getBitcoinHexFormat()) return null;
            var combinedPrivateKey = new Bitcoin.ECKey(ecKey1.priv.multiply(ecKey2.priv).mod(n));
            // compressed when both keys are compressed
            if (ecKey1.compressed && ecKey2.compressed) combinedPrivateKey.setCompressed(true);
            return combinedPrivateKey;
        }
    };

    ninja.publicKey = {
        isPublicKeyHexFormat: function(key) {
            key = key.toString();
            return ninja.publicKey.isUncompressedPublicKeyHexFormat(key) || ninja.publicKey.isCompressedPublicKeyHexFormat(key);
        },
        // 130 characters [0-9A-F] starts with 04
        isUncompressedPublicKeyHexFormat: function(key) {
            key = key.toString();
            return (/^04[A-Fa-f0-9]{128}$/).test(key);
        },
        // 66 characters [0-9A-F] starts with 02 or 03
        isCompressedPublicKeyHexFormat: function(key) {
            key = key.toString();
            return (/^0[2-3][A-Fa-f0-9]{64}$/).test(key);
        },
        getBitcoinAddressFromByteArray: function(pubKeyByteArray) {
            var pubKeyHash = Bitcoin.Util.sha256ripe160(pubKeyByteArray);
            var addr = new Bitcoin.Address(pubKeyHash);
            return addr.toString();
        },
        getHexFromByteArray: function(pubKeyByteArray) {
            return Crypto.util.bytesToHex(pubKeyByteArray).toString().toUpperCase();
        },
        getByteArrayFromAdding: function(pubKeyHex1, pubKeyHex2) {
            var ecparams = EllipticCurve.getSECCurveByName("secp256k1");
            var curve = ecparams.getCurve();
            var ecPoint1 = curve.decodePointHex(pubKeyHex1);
            var ecPoint2 = curve.decodePointHex(pubKeyHex2);
            // if both points are the same return null
            if (ecPoint1.equals(ecPoint2)) return null;
            var compressed = (ecPoint1.compressed && ecPoint2.compressed);
            var pubKey = ecPoint1.add(ecPoint2).getEncoded(compressed);
            return pubKey;
        },
        getByteArrayFromMultiplying: function(pubKeyHex, ecKey) {
            var ecparams = EllipticCurve.getSECCurveByName("secp256k1");
            var ecPoint = ecparams.getCurve().decodePointHex(pubKeyHex);
            var compressed = (ecPoint.compressed && ecKey.compressed);
            // if both points are the same return null
            ecKey.setCompressed(false);
            if (ecPoint.equals(ecKey.getPubPoint())) {
                return null;
            }
            var bigInt = ecKey.priv;
            var pubKey = ecPoint.multiply(bigInt).getEncoded(compressed);
            return pubKey;
        },
        // used by unit test
        getDecompressedPubKeyHex: function(pubKeyHexComp) {
            var ecparams = EllipticCurve.getSECCurveByName("secp256k1");
            var ecPoint = ecparams.getCurve().decodePointHex(pubKeyHexComp);
            var pubByteArray = ecPoint.getEncoded(0);
            var pubHexUncompressed = ninja.publicKey.getHexFromByteArray(pubByteArray);
            return pubHexUncompressed;
        }
    };

    return ninja;
});