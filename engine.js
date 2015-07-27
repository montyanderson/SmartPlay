var fs = require("fs"),
    mustache = require("mustache"),
    path = require("path");

module.exports = function(filePath, options, callback) {
    var layoutPath = path.join(options.settings.layouts, options.layout) + ".mustache";

    fs.readFile(layoutPath, function(layoutError, layout) {
        if(layoutError) return callback(new Error(layoutError));

        fs.readFile(filePath, function(pageError, page) {
            if(pageError) return callback(new Error(pageError));

            var html = mustache.render(layout.toString(), options, {page: page.toString()});
            return callback(null, html);
        });
    });
};
