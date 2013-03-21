var path = require('path'),
	fs = require('fs'),
    shell = require('shelljs');

module.exports = function(grunt) {

	grunt.registerMultiTask('clean', 'Clean directory', function () {
		var items = this.data;
		var existsSync = fs.existsSync || path.existsSync;
			
		var dlen, i;

		if (items && items.length > 0) {
			for (i = 0, dlen = items.length; i < dlen; i += 1) {
				if (existsSync(items[i])) {
					try {
						shell.rm('-rf', items[i]);
                        grunt.log.writeln(items[i],'has been deleted.');
					} catch(e) {
						grunt.log.writeln('cant delete entry. cause by error message :', e);
						return;
					}				
				} else {
					console.log(items[i], "is not exist or incorrect, check your clean task's configuration in grunt.js");
				}  
			}
		}

	}); 
};
