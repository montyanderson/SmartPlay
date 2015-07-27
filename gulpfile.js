var gulp = require("gulp"),
    less = require("gulp-less"),
    rename = require("gulp-rename"),
    minify = require("gulp-minify-css"),
    source = require("vinyl-source-stream"),
    merge = require("merge"),
    browserify = require("browserify"),
    watchify = require("watchify");
    path = require("path");

var paths = {
        styles: ["./assets/styles/*.less"],
        scripts: ["./assets/scripts/*.js"]
};

var b = browserify(merge(watchify.args, {
    entries: [__dirname + "/assets/scripts/index.js"]
    //debug: true
}));

var w = watchify(b);

function logError(err) {
    console.log(err);
    this.emit("end");
}

gulp.task("watch", function() {
    gulp.watch(paths.styles, ["styles"]);
    gulp.watch(paths.scripts, ["scripts"]);
});

gulp.task("styles", function() {
    return gulp.src("./assets/styles/main.less")
        .pipe(less({
            paths: [__dirname + "/assets/styles/", __dirname + "/node_modules/"]
        }))
        .on("error", logError)
        .pipe(minify())
        .pipe(rename("bundle.css"))
        .pipe(gulp.dest("./public/"));
});

gulp.task("scripts", function() {
    return w.bundle()
        .on("error", logError)
        .pipe(source("bundle.js"))
        .pipe(rename("bundle.js"))
        .pipe(gulp.dest("./public/"));
});

gulp.task("finish", function() {
    gulp.on("stop", function() {
        process.exit(0);
    });
});

gulp.task("default", ["styles", "scripts", "finish"]);
gulp.task("dev", ["styles", "scripts", "watch"]);
