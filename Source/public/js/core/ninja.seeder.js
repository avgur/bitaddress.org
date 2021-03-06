define(["ninja", "Crypto", "SecureRandom", "QRCode"], function (ninja, Crypto, SecureRandom, QRCode) {
    ninja.seeder = {
        // number of mouse movements to wait for
        seedLimit: (function() {
            var num = Crypto.util.randomBytes(12)[11];
            return 50 + Math.floor(num);
        })(),

        seedComlete: false,
        
        seedCount: 0, // counter

        // seed function exists to wait for mouse movement to add more entropy before generating an address
        seed: function(evt) {
            if(ninja.seeder.seedComlete){
                return;
            }
            
            if (!evt) evt = window.event;

            // seed a bunch (minimum seedLimit) of times based on mouse moves
            SecureRandom.seedTime();
            // seed mouse position X and Y
            if (evt) SecureRandom.seedInt((evt.clientX * evt.clientY));

            ninja.seeder.seedCount++;
            
            
            ninja.seeder.updateProgress();
            
            // seeding is over now we generate and display the address
            if (ninja.seeder.seedCount >= ninja.seeder.seedLimit) {
                // UI
                document.getElementById("menu").style.visibility = "visible";
                document.getElementById("generate").style.display = "none";
                document.getElementById("wallets").style.visibility = "visible";
                $('#menu a:first').tab('show');
                
                ninja.seeder.seedComlete = true;
            }
        },
        
        touchSeed: function(evt) {
            if(ninja.seeder.seedComlete){
                return;
            }
            if (!evt) evt = window.event;
            if (evt && evt.touches) {
                for(var i = 0; i < evt.touches.length; i++){
                    var t = evt.touches[i];
                    var e = { clientX: t.pageX, clientY: t.pageY };
                    // users do not want to tap too many times
                    for(var j = 0; j < 10; j++) {
                        ninja.seeder.seed(e);
                    }
                }
            }
        },
        
        updateProgress: function(){
            var percent = (ninja.seeder.seedCount * 100) / ninja.seeder.seedLimit;
            percent = (percent > 100) ? 100 : percent;
            $('#generate .bar').width(percent + "%");
        },

        scheduleForceGenerate: function() {
            var counter = 0;
            var multiplier = 5;
            var repeat = function(){
                if(ninja.seeder.seedCount >= ninja.seeder.seedLimit)
                {
                    ninja.seeder.seed();
                }
                else if(!ninja.seeder.seedComlete)
                {
                    counter++;
                    ninja.seeder.seedCount = Math.max(counter/multiplier, ninja.seeder.seedCount);
                    ninja.seeder.updateProgress();
                    setTimeout(repeat, 100);
                }
            };
            
            repeat();
        },
        
        // If user has not moved the mouse or if they are on a mobile device
        // we will force the generation after a random period of time.
        forceGenerate: function() {
            // if the mouse has not moved enough
            if (ninja.seeder.seedCount < ninja.seeder.seedLimit) {
                SecureRandom.seedTime();
                ninja.seeder.seedCount = ninja.seeder.seedLimit - 1;
                ninja.seeder.seed();
            }
        }
    };

    ninja.qrCode = {
        // determine which type number is big enough for the input text length
        getTypeNumber: function(text) {
            var lengthCalculation = text.length * 8 + 12; // length as calculated by the QRCode
            if (lengthCalculation < 72) {
                return 1;
            } else if (lengthCalculation < 128) {
                return 2;
            } else if (lengthCalculation < 208) {
                return 3;
            } else if (lengthCalculation < 288) {
                return 4;
            } else if (lengthCalculation < 368) {
                return 5;
            } else if (lengthCalculation < 480) {
                return 6;
            } else if (lengthCalculation < 528) {
                return 7;
            } else if (lengthCalculation < 688) {
                return 8;
            } else if (lengthCalculation < 800) {
                return 9;
            } else if (lengthCalculation < 976) {
                return 10;
            }
            return null;
        },

        createCanvas: function(text, sizeMultiplier) {
            sizeMultiplier = (sizeMultiplier === undefined) ? 2 : sizeMultiplier; // default 2
            // create the qrcode itself
            var typeNumber = ninja.qrCode.getTypeNumber(text);
            var qrcode = new QRCode(typeNumber, QRCode.ErrorCorrectLevel.H);
            qrcode.addData(text);
            qrcode.make();
            var width = qrcode.getModuleCount() * sizeMultiplier;
            var height = qrcode.getModuleCount() * sizeMultiplier;
            // create canvas element
            var canvas = document.createElement('canvas');
            var scale = 10.0;
            canvas.width = width * scale;
            canvas.height = height * scale;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            var ctx = canvas.getContext('2d');
            ctx.scale(scale, scale);
            // compute tileW/tileH based on width/height
            var tileW = width / qrcode.getModuleCount();
            var tileH = height / qrcode.getModuleCount();
            // draw in the canvas
            for (var row = 0; row < qrcode.getModuleCount(); row++) {
                for (var col = 0; col < qrcode.getModuleCount(); col++) {
                    ctx.fillStyle = qrcode.isDark(row, col) ? "#000000" : "#ffffff";
                    ctx.fillRect(col * tileW, row * tileH, tileW, tileH);
                }
            }
            // return just built canvas
            return canvas;
        },

        // generate a QRCode and return it's representation as an Html table 
        createTableHtml: function(text) {
            var typeNumber = ninja.qrCode.getTypeNumber(text);
            var qr = new QRCode(typeNumber, QRCode.ErrorCorrectLevel.H);
            qr.addData(text);
            qr.make();
            var tableHtml = "<table class='qrcodetable'>";
            for (var r = 0; r < qr.getModuleCount(); r++) {
                tableHtml += "<tr>";
                for (var c = 0; c < qr.getModuleCount(); c++) {
                    if (qr.isDark(r, c)) {
                        tableHtml += "<td class='qrcodetddark'/>";
                    } else {
                        tableHtml += "<td class='qrcodetdlight'/>";
                    }
                }
                tableHtml += "</tr>";
            }
            tableHtml += "</table>";
            return tableHtml;
        },

        // show QRCodes with canvas OR table (IE8)
        // parameter: keyValuePair 
        // example: { "id1": "string1", "id2": "string2"}
        //		"id1" is the id of a div element where you want a QRCode inserted.
        //		"string1" is the string you want encoded into the QRCode.
        showQrCode: function(keyValuePair, sizeMultiplier) {
            for (var key in keyValuePair) {
                var value = keyValuePair[key];
                try {
                    if (document.getElementById(key)) {
                        document.getElementById(key).innerHTML = "";
                        document.getElementById(key).appendChild(ninja.qrCode.createCanvas(value, sizeMultiplier));
                    }
                } catch(e) {
                    // for browsers that do not support canvas (IE8)
                    document.getElementById(key).innerHTML = ninja.qrCode.createTableHtml(value);
                }
            }
        }
    };

    ninja.tabSwitch = function (walletTab) {
        for (var wType in ninja.wallets) {
            ninja.wallets[wType].close();
        }
        ninja.wallets[walletTab.getAttribute("id")].open();
    };

    ninja.getQueryString = function() {
        var li = location.search.lastIndexOf("?");
        var result = {}, queryString = location.search.substring(li+1), re = /([^&=]+)=([^&]*)/g, m;
        while ((m = re.exec(queryString)) !== null) {
            result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return result;
    };

    $('#menu a[data-toggle="tab"]').on('shown', function (e) {
        ninja.tabSwitch(e.target);
    });

});