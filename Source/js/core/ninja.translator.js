define(["ninja"], function(ninja) {
    ninja.translator = {
        currentCulture: "en",

        translate: function(culture) {
            var dict = ninja.translator.translations[culture];
            if (dict) {
                // set current culture
                ninja.translator.currentCulture = culture;
                // update menu UI
                for (var cult in ninja.translator.translations) {
                    document.getElementById("culture" + cult).setAttribute("class", "");
                }
                document.getElementById("culture" + culture).setAttribute("class", "selected");
                // apply translations
                for (var id in dict) {
                    if (document.getElementById(id) && document.getElementById(id).value) {
                        document.getElementById(id).value = dict[id];
                    } else if (document.getElementById(id)) {
                        document.getElementById(id).innerHTML = dict[id];
                    }
                }
            }
        },

        get: function(id) {
            var translation = ninja.translator.translations[ninja.translator.currentCulture][id];
            return translation;
        },

        translations: {
            "en": {
                // javascript alerts or messages
                "testneteditionactivated": "TESTNET EDITION ACTIVATED",
                "paperlabelbitcoinaddress": "Bitcoin Address:",
                "paperlabelprivatekey": "Private Key (Wallet Import Format):",
                "bulkgeneratingaddresses": "Generating addresses... ",
                "brainalertpassphrasetooshort": "The passphrase you entered is too short.\n\nWarning: Choosing a strong passphrase is important to avoid brute force attempts to guess your passphrase and steal your bitcoins.",
                "brainalertpassphrasedoesnotmatch": "The passphrase does not match the confirm passphrase.",
                "detailalertnotvalidprivatekey": "The text you entered is not a valid Private Key",
                "detailconfirmsha256": "The text you entered is not a valid Private Key!\n\nWould you like to use the entered text as a passphrase and create a Private Key using a SHA256 hash of the passphrase?\n\nWarning: Choosing a strong passphrase is important to avoid brute force attempts to guess your passphrase and steal your bitcoins.",
                "vanityinvalidinputcouldnotcombinekeys": "Invalid input. Could not combine keys.",
                "vanityalertinvalidinputpublickeysmatch": "Invalid input. The Public Key of both entries match. You must input two different keys.",
                "vanityalertinvalidinputcannotmultiple": "Invalid input. Cannot multiply two public keys. Select 'Add' to add two public keys to get a bitcoin address.",
                "vanityprivatekeyonlyavailable": "Only available when combining two private keys",
                "vanityalertinvalidinputprivatekeysmatch": "Invalid input. The Private Key of both entries match. You must input two different keys."
            },

            "es": {
                // javascript alerts or messages
                "testneteditionactivated": "Testnet se activa",
                "paperlabelbitcoinaddress": "Direccion Bitcoin:",
                "paperlabelprivatekey": "Clave privada (formato para importar):",
                "bulkgeneratingaddresses": "Generacion de direcciones... ",
                "brainalertpassphrasetooshort": "La contrasena introducida es demasiado corta.\n\nAviso: Es importante escoger una contrasena fuerte para evitar ataques de fuerza bruta a fin de adivinarla y robar tus bitcoins.",
                "brainalertpassphrasedoesnotmatch": "Las contrasenas no coinciden.",
                "detailalertnotvalidprivatekey": "El texto que has introducido no es una clave privada valida",
                "detailconfirmsha256": "El texto que has introducido no es una clave privada valida\n\n?Quieres usar ese texto como si fuera una contrasena y generar una clave privada usando un hash SHA256 de tal contrasena?\n\nAviso: Es importante escoger una contrasena fuerte para evitar ataques de fuerza bruta a fin de adivinarla y robar tus bitcoins.",
                "vanityinvalidinputcouldnotcombinekeys": "Entrada no valida. No se puede combinar llaves.",
                "vanityalertinvalidinputpublickeysmatch": "Entrada no valida. La clave publica de ambos coincidan entradas. Debe introducir dos claves diferentes.",
                "vanityalertinvalidinputcannotmultiple": "Entrada no valida. No se puede multiplicar dos claves publicas. Seleccione 'Anadir' para agregar dos claves publicas para obtener una direccion bitcoin.",
                "vanityprivatekeyonlyavailable": "Solo esta disponible cuando se combinan dos claves privadas",
                "vanityalertinvalidinputprivatekeysmatch": "Entrada no valida. La clave privada de ambos coincidan entradas. Debe introducir dos claves diferentes.",

                // header and menu html
                "tagline": "Generador de carteras Bitcoin de codigo abierto en lado de cliente con Javascript",
                "generatelabelbitcoinaddress": "Generando direccion Bitcoin...",
                "generatelabelmovemouse": "Mueve un poco el raton para crear entropia...",
                "singlewallet": "Una sola cartera",
                "paperwallet": "Cartera en papel",
                "bulkwallet": "Direcciones en masa",
                "brainwallet": "Cartera mental",
                "vanitywallet": "Cartera personalizada",
                "detailwallet": "Detalles de la cartera",

                // footer html
                "footerlabeldonations": "Donaciones:",
                "footerlabeltranslatedby": "Traduccion: <b>12345</b>Vypv2QSmuRXcciT5oEB27mPbWGeva",
                "footerlabelpgp": "Clave publica PGP",
                "footerlabelversion": "Historico de versiones",
                "footerlabelgithub": "Repositorio GitHub",
                "footerlabelcopyright1": "Copyright bitaddress.org.",
                "footerlabelcopyright2": "Copyright del codigo JavaScript: en el fuente.",
                "footerlabelnowarranty": "Sin garantia.",

                // single wallet html
                "newaddress": "Generar direccion",
                "singleprint": "Imprimir",
                "singlelabelbitcoinaddress": "Direccion Bitcoin",
                "singlelabelprivatekey": "Clave privada (formato para importar):",

                // paper wallet html
                "paperlabelhideart": "Ocultar diseno",
                "paperlabeladdressesperpage": "Direcciones por pagina:",
                "paperlabeladdressestogenerate": "Direcciones en total:",
                "papergenerate": "Generar",
                "paperprint": "Imprimir",

                // bulk wallet html
                "bulklabelstartindex": "Empezar en:",
                "bulklabelrowstogenerate": "Filas a generar:",
                "bulkgenerate": "Generar",
                "bulkprint": "Imprimir",
                "bulklabelcsv": "Valores separados por coma:",
                "bulklabelformat": "Indice,Direccion,Clave privada (formato para importar)",
                "bulklabelq1": "?Por que debo usar \"Direcciones en masa\" para aceptar Bitcoins en mi web?",
                "bulka1": "La forma tradicional de aceptar bitcoins en tu web requiere tener instalado el cliente oficial de bitcoin (\"bitcoind\"). Sin embargo muchos servicios de hosting no permiten instalar dicho cliente. Ademas, ejecutar el cliente en tu servidor supone que las claves privadas estan tambien en el servidor y podrian ser comprometidas en caso de intrusion. Al usar este mecanismo, puedes subir al servidor solo las direccion de bitcoin y no las claves privadas. De esta forma no te tienes que preocupar de que alguien robe la cartera si se cuelan en el servidor.",
                "bulklabelq2": "?Como uso \"Direcciones en masa\" para aceptar bitcoins en mi web?",
                "bulklabela2li1": "Usa el tab \"Direcciones en masa\" para generar por anticipado muchas direcciones (mas de 10000). Copia y pega la lista de valores separados por comas (CSV) a un archivo de texto seguro (cifrado) en tu ordenador. Guarda una copia de seguridad en algun lugar seguro.",
                "bulklabela2li2": "Importa las direcciones en la base de datos de tu servidor. No subas la cartera ni las claves publicas, o de lo contrario te lo pueden robar. Sube solo las direcciones, ya que es lo que se va a mostrar a los clientes.",
                "bulklabela2li3": "Ofrece una alternativa en el carro de la compra de tu web para que los clientes paguen con Bitcoin. Cuando el cliente elija pagar con Bitcoin, les muestras una de las direcciones de la base de datos como su \"direccion de pago\" y guardas esto junto con el pedido.",
                "bulklabela2li4": "Ahora te hace falta recibir una notificacion del pago. Busca en google \"notificacion de pagos bitcoin\" (o \"bitcoin payment notification\" en ingles) y suscribete a alguno de los servicios que aparezcan. Hay varios de ellos, que te pueden notificar via Web services, API, SMS, email, etc. Una vez te llegue la notificacion, lo cual puede ser automatizado, entonces ya puedes procesar el pedido. Para comprobar a mano si has recibido un pago, puedes usar Block Explorer: reemplaza DIRECCION a continuacion por la direccion que estes comprobando. La transaccion puede tardar entre 10 minutos y una hora en ser confirmada. <br />http://www.blockexplorer.com/address/DIRECCION<br /><br />Puedes ver las transacciones sin confirmar en: http://blockchain.info/ <br />Las transacciones sin confirmar suelen aparecer ahi en unos 30 segundos.",
                "bulklabela2li5": "Las bitcoins que recibas se almacenaran de forma segura en la cadena de bloques. Usa la cartera original que generaste en el paso 1 para usarlas.",

                // brain wallet html
                "brainlabelenterpassphrase": "Contrasena:",
                "brainlabelshow": "Mostrar",
                "brainprint": "Imprimir",
                "brainlabelconfirm": "Confirmar contrasena:",
                "brainview": "Ver",
                "brainalgorithm": "Algoritmo: SHA256(contrasena)",
                "brainlabelbitcoinaddress": "Direccion Bitcoin:",
                "brainlabelprivatekey": "Clave privada (formato para importar):",

                // vanity wallet html
                "vanitylabelstep1": "Paso 1 - Genera tu par de claves",
                "vanitynewkeypair": "Generar",
                "vanitylabelstep1publickey": "Clave publica:",
                "vanitylabelstep1pubnotes": "Copia y pega la linea de arriba en el campo \"Your-Part-Public-Key\" de la web de Vanity Pool.",
                "vanitylabelstep1privatekey": "Clave privada:",
                "vanitylabelstep1privnotes": "Copia y pega la clave publica de arriba en un archivo de texto. Es mejor que lo almacenes en un volumen cifrado. Lo necesitaras para recuperar la clave privada una vez Vanity Pool haya encontrado tu prefijo.",
                "vanitylabelstep2calculateyourvanitywallet": "Paso 2 - Calcula tu cartera personalizada",
                "vanitylabelenteryourpart": "Introduce la clave privada generada en el paso 1, y que has guardado:",
                "vanitylabelenteryourpoolpart": "Introduce la clave privada obtenida de la Vanity Pool:",
                "vanitylabelnote1": "[NOTA: esta casilla de entrada puede aceptar una clave publica o clave privada]",
                "vanitylabelnote2": "[NOTA: esta casilla de entrada puede aceptar una clave publica o clave privada]",
                "vanitylabelradioadd": "Anadir",
                "vanitylabelradiomultiply": "Multiplicar",
                "vanitycalc": "Calcular cartera personalizada",
                "vanitylabelbitcoinaddress": "Direccion Bitcoin personalizada:",
                "vanitylabelnotesbitcoinaddress": "Esta es tu nueva direccion, que deberia tener el prefijo deseado.",
                "vanitylabelpublickeyhex": "Clave publica personalizada (HEX):",
                "vanitylabelnotespublickeyhex": "Lo anterior es la clave publica en formato hexadecimal.",
                "vanitylabelprivatekey": "Clave privada personalizada (formato para importar):",
                "vanitylabelnotesprivatekey": "Esto es la clave privada para introducir en tu cartera.",

                // detail wallet html
                "detaillabelenterprivatekey": "Introduce la clave privada (en cualquier formato)",
                "detailview": "Ver detalles",
                "detailprint": "Imprimir",
                "detaillabelnote1": "Tu clave privada es un numero secreto, unico, que solo tu conoces. Se puede expresar en varios formatos. Aqui abajo mostramos la direccion y la clave publica que se corresponden con tu clave privada, asi como la clave privada en los formatos mas conocidos (para importar, hex, base64 y mini).",
                "detaillabelnote2": "Bitcoin v0.6+ almacena las claves publicas comprimidas. El cliente tambien soporta importar/exportar claves privadas usando importprivkey/dumpprivkey. El formato de las claves privadas exportadas depende de si la direccion se genero en una cartera antigua o nueva.",
                "detaillabelbitcoinaddress": "Direccion Bitcoin:",
                "detaillabelbitcoinaddresscomp": "Direccion Bitcoin (comprimida):",
                "detaillabelpublickey": "Clave publica (130 caracteres [0-9A-F]):",
                "detaillabelpublickeycomp": "Clave publica (comprimida, 66 caracteres [0-9A-F]):",
                "detaillabelprivwif": "Clave privada para importar (51 caracteres en base58, empieza con un",
                "detaillabelprivwifcomp": "Clave privada para importar (comprimida, 52 caracteres en base58, empieza con",
                "detailcompwifprefix": "'K' o 'L'",
                "detaillabelprivhex": "Clave privada en formato hexadecimal (64 caracteres [0-9A-F]):",
                "detaillabelprivb64": "Clave privada en base64 (44 caracteres):",
                "detaillabelprivmini": "Clave privada en formato mini (22, 26 o 30 caracteres, empieza por 'S'):"
            },

            "fr": {
                "testneteditionactivated": "EDITION TESTNET ACTIVEE",
                "paperlabelbitcoinaddress": "Adresse Bitcoin:",
                "paperlabelprivatekey": "Cle Privee (Format d'importation de porte-monnaie):",
                "bulkgeneratingaddresses": "Creation de l'adresse... ",
                "brainalertpassphrasetooshort": "Le mot de passe que vous avez entre est trop court.\n\nAttention: Choisir un mot de passe solide est important pour vous proteger des attaques bruteforce visant a trouver votre mot de passe et voler vos Bitcoins.",
                "brainalertpassphrasedoesnotmatch": "Le mot de passe ne correspond pas au mot de passe de verification.",
                "detailalertnotvalidprivatekey": "Le texte que vous avez entre n'est pas une Cle Privee valide",
                "detailconfirmsha256": "Le texte que vous avez entre n'est pas une Cle Privee valide!\n\nVoulez-vous utiliser le texte comme un mot de passe et creer une Cle Privee a partir d'un hash SHA256 de ce mot de passe?\n\nAttention: Choisir un mot de passe solide est important pour vous proteger des attaques bruteforce visant a trouver votre mot de passe et voler vos Bitcoins.",
                "vanityinvalidinputcouldnotcombinekeys": "Entree non valide. Impossible de combiner les cles.",
                "vanityalertinvalidinputpublickeysmatch": "Entree non valide. La cle publique des deux entrees est identique. Vous devez entrer deux cles differentes.",
                "vanityalertinvalidinputcannotmultiple": "Entree non valide. Il n'est pas possible de multiplier deux cles publiques. Selectionner 'Ajouter' pour ajouter deux cles publiques pour obtenir une adresse Bitcoin.",
                "vanityprivatekeyonlyavailable": "Seulement disponible si vos combinez deux cles privees",
                "vanityalertinvalidinputprivatekeysmatch": "Entree non valide. La cle Privee des deux entrees est identique. Vous devez entrer deux cles differentes.",
                "tagline": "Generateur De Porte-Monnaie Bitcoin Javascript Hors-Ligne",
                "generatelabelbitcoinaddress": "Creation de l'adresse Bitcoin...",
                "generatelabelmovemouse": "BOUGEZ votre souris pour ajouter de l'entropie...",
                "singlewallet": "Porte-Monnaie Simple",
                "paperwallet": "Porte-Monnaie Papier",
                "bulkwallet": "Porte-Monnaie En Vrac",
                "brainwallet": "Porte-Monnaie Cerveau",
                "vanitywallet": "Porte-Monnaie Vanite",
                "detailwallet": "Details du Porte-Monnaie",
                "footerlabeldonations": "Dons:",
                "footerlabeltranslatedby": "Traduction: 1Gy7NYSJNUYqUdXTBow5d7bCUEJkUFDFSq",
                "footerlabelpgp": "Cle Publique PGP",
                "footerlabelversion": "Historique De Version Signe",
                "footerlabelgithub": "Depot GitHub",
                "footerlabelcopyright1": "Copyright bitaddress.org.",
                "footerlabelcopyright2": "Les droits d'auteurs JavaScript sont inclus dans le code source.",
                "footerlabelnowarranty": "Aucune garantie.",
                "newaddress": "Generer Une Nouvelle Adresse",
                "singleprint": "Imprimer",
                "singlelabelbitcoinaddress": "Adresse Bitcoin:",
                "singlelabelprivatekey": "Cle Privee (Format d'importation de porte-monnaie):",
                "paperlabelhideart": "Retirer Le Style?",
                "paperlabeladdressesperpage": "Adresses par page:",
                "paperlabeladdressestogenerate": "Nombre d'adresses a creer:",
                "papergenerate": "Generer",
                "paperprint": "Imprimer",
                "bulklabelstartindex": "Commencer a l'index:",
                "bulklabelrowstogenerate": "Colonnes a generer:",
                "bulkgenerate": "Generer",
                "bulkprint": "Imprimer",
                "bulklabelcsv": "Valeurs Separees Par Des Virgules (CSV):",
                "bulklabelformat": "Index,Adresse,Cle Privee (WIF)",
                "bulklabelq1": "Pourquoi utiliserais-je un Porte-monnaie en vrac pour accepter les Bitcoins sur mon site web?",
                "bulka1": "L'approche traditionnelle pour accepter des Bitcoins sur votre site web requiere l'installation du logiciel Bitcoin officiel (\"bitcoind\"). Plusieurs hebergeurs ne supportent pas l'installation du logiciel Bitcoin. De plus, faire fonctionner le logiciel Bitcoin sur votre serveur web signifie que vos cles privees sont hebergees sur le serveur et pourraient donc etre volees si votre serveur web etait compromis. En utilisant un Porte-monnaie en vrac, vous pouvez publiquer seulement les adresses Bitcoin sur votre serveur et non les cles privees. Vous n'avez alors pas a vous inquieter du risque de vous faire voler votre porte-monnaie si votre serveur etait compromis.",
                "bulklabelq2": "Comment utiliser le Porte-monnaie en vrac pour utiliser le Bitcoin sur mon site web?",
                "bulklabela2li1": "Utilisez le Porte-monnaie en vrac pour pre-generer une large quantite d'adresses Bitcoin (10,000+). Copiez collez les donnees separees par des virgules (CSV) dans un fichier texte securise dans votre ordinateur. Sauvegardez ce fichier dans un endroit securise.",
                "bulklabela2li2": "Importez les adresses Bitcoin dans une base de donnee sur votre serveur web. (N'ajoutez pas le porte-monnaie ou les cles privees sur votre serveur web, sinon vous courrez le risque de vous faire voler si votre serveur est compromis. Ajoutez seulement les adresses Bitcoin qui seront visibles a vos visiteurs.)",
                "bulklabela2li3": "Ajoutez une option dans votre panier en ligne pour que vos clients puissent vous payer en Bitcoin. Quand un client choisi de vous payer en Bitcoin, vous pouvez afficher une des adresses de votre base de donnee comme \"adresse de paiment\" pour votre client et sauvegarder cette adresse avec sa commande.",
                "bulklabela2li4": "Vous avez maintenant besoin d'etre avise quand le paiement est recu. Cherchez \"bitcoin payment notification\" sur Google et inscrivez-vous a un service de notification de paiement Bitcoin. Il y a plusieurs services qui vous avertiront via des services Web, API, SMS, Email, etc. Une fois que vous avez recu la notification, qui devrait etre programmee automatiquement, vous pouvez traiter la commande de votre client. Pour verifier manuellement si un paiement est arrive, vous pouvez utiliser Block Explorer. Remplacez ADRESSE par l'adresse Bitcoin que vous souhaitez verifier. La confirmation de la transaction pourrait prendre de 10 a 60 minutes pour etre confirmee.<br />http://www.blockexplorer.com/address/ADRESSE<br /><br />Les transactions non confirmees peuvent etre visualisees ici: http://blockchain.info/ <br />Vous devriez voir la transaction a l'interieur de 30 secondes.",
                "bulklabela2li5": "Les Bitcoins vos s'accumuler de facon securitaire dans la chaine de blocs. Utilisez le porte-monnaie original que vous avez genere a l'etape 1 pour les depenser.",
                "brainlabelenterpassphrase": "Entrez votre mot de passe: ",
                "brainlabelshow": "Afficher?",
                "brainprint": "Imprimer",
                "brainlabelconfirm": "Confirmer le mot de passe: ",
                "brainview": "Visualiser",
                "brainalgorithm": "Algorithme: SHA256(mot de passe)",
                "brainlabelbitcoinaddress": "Adresse Bitcoin:",
                "brainlabelprivatekey": "Cle Privee (Format d'importation de porte-monnaie):",
                "vanitylabelstep1": "Etape 1 - Generer votre \"Etape 1 Paire De Cles\"",
                "vanitynewkeypair": "Generer",
                "vanitylabelstep1publickey": "Etape 1 Cle Publique:",
                "vanitylabelstep1pubnotes": "Copiez celle-ci dans la case Votre-Cle-Publique du site de Vanity Pool.",
                "vanitylabelstep1privatekey": "Step 1 Cle Privee:",
                "vanitylabelstep1privnotes": "Copiez la cette Cle Privee dans un fichier texte. Idealement, sauvegardez la dans un fichier encrypte. Vous en aurez besoin pour recuperer la Cle Privee lors que Vanity Pool aura trouve votre prefixe.",
                "vanitylabelstep2calculateyourvanitywallet": "Etape 2 - Calculer votre Porte-monnaie Vanite",
                "vanitylabelenteryourpart": "Entrez votre Cle Privee (generee a l'etape 1 plus haut et precedemment sauvegardee):",
                "vanitylabelenteryourpoolpart": "Entrez la Cle Privee (provenant de Vanity Pool):",
                "vanitylabelnote1": "[NOTE: cette case peut accepter une cle publique ou un cle privee]",
                "vanitylabelnote2": "[NOTE: cette case peut accepter une cle publique ou un cle privee]",
                "vanitylabelradioadd": "Ajouter",
                "vanitylabelradiomultiply": "Multiplier",
                "vanitycalc": "Calculer Le Porte-monnaie Vanite",
                "vanitylabelbitcoinaddress": "Adresse Bitcoin Vanite:",
                "vanitylabelnotesbitcoinaddress": "Ci-haut est votre nouvelle adresse qui devrait inclure le prefix requis.",
                "vanitylabelpublickeyhex": "Cle Public Vanite (HEX):",
                "vanitylabelnotespublickeyhex": "Celle-ci est la Cle Publique dans le format hexadecimal. ",
                "vanitylabelprivatekey": "Cle Privee Vanite (WIF):",
                "vanitylabelnotesprivatekey": "Celle-ci est la Cle Privee pour acceder a votre porte-monnaie. ",
                "detaillabelenterprivatekey": "Entrez la Cle Privee (quel que soit son format)",
                "detailview": "Voir les details",
                "detailprint": "Imprimer",
                "detaillabelnote1": "Votre Cle Privee Bitcoin est un nombre secret que vous etes le seul a connaitre. Il peut etre encode sous la forme d'un nombre sous differents formats. Ci-bas, nous affichons l'adresse Bitcoin et la Cle Publique qui corresponds a la Cle Privee ainsi que la Cle Privee dans les formats d'encodage les plus populaires (WIF, HEX, B64, MINI).",
                "detaillabelnote2": "Bitcoin v0.6+ conserve les cles publiques dans un format compresse. Le logiciel supporte maintenant aussi l'importation et l'exportation de cles privees avec importprivkey/dumpprivkey. Le format de la cle privee exportee est determine selon la version du porte-monnaie Bitcoin.",
                "detaillabelbitcoinaddress": "Adresse Bitcoin:",
                "detaillabelbitcoinaddresscomp": "Adresse Bitcoin (compressee):",
                "detaillabelpublickey": "Cle Publique (130 caracteres [0-9A-F]):",
                "detaillabelpublickeycomp": "Cle Publique (compressee, 66 caracteres [0-9A-F]):",
                "detaillabelprivwif": "Cle Privee WIF (51 caracteres base58, debute avec un a",
                "detaillabelprivwifcomp": "Cle Privee WIF (compressee, 52 caracteres base58, debute avec un a",
                "detailcompwifprefix": "'K' ou 'L'",
                "detaillabelprivhex": "Cle Privee Format Hexadecimal (64 caracteres [0-9A-F]):",
                "detaillabelprivb64": "Cle Privee Base64 (44 caracteres):",
                "detaillabelprivmini": "Cle Privee Format Mini (22, 26 ou 30 caracteres, debute avec un 'S'):"
            }
        }
    };

    ninja.translator.showEnglishJson = function() {
        var english = ninja.translator.translations["en"];
        var spanish = ninja.translator.translations["es"];
        var spanishClone = {};
        var key;
        for (key in spanish) {
            spanishClone[key] = spanish[key];
        }
        var newLang = {};
        for (key in english) {
            newLang[key] = english[key];
            delete spanishClone[key];
        }
        for (key in spanishClone) {
            if (document.getElementById(key)) {
                if (document.getElementById(key).value) {
                    newLang[key] = document.getElementById(key).value;
                } else {
                    newLang[key] = document.getElementById(key).innerHTML;
                }
            }
        }
        var div = document.createElement("div");
        div.setAttribute("class", "englishjson");
        div.innerHTML = "<h3>English Json</h3>";
        var elem = document.createElement("textarea");
        elem.setAttribute("rows", "35");
        elem.setAttribute("cols", "110");
        elem.setAttribute("wrap", "off");
        var langJson = "{\n";
        for (key in newLang) {
            langJson += "\t\"" + key + "\"" + ": " + "\"" + newLang[key].replace(/\"/g, "\\\"").replace(/\n/g, "\\n") + "\",\n";
        }
        langJson = langJson.substr(0, langJson.length - 2);
        langJson += "\n}\n";
        elem.innerHTML = langJson;
        div.appendChild(elem);
        document.body.appendChild(div);
    };
});