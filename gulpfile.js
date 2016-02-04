require("babel-register");

var gulp = require("gulp");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");

var mocha = require("gulp-mocha");

var istanbul = require("gulp-istanbul");
var isparta = require("isparta");

var src = ["src/**/*.js", "!src/**/*.test.js"];
var tests = "src/**/*.test.js";

var dest = "dist/";

gulp.task("build", function() {
    return gulp.src(src)
        .pipe(babel({
            presets: ["es2015", "stage-1"]
        }))
        .pipe(gulp.dest(dest));
});

gulp.task("coverage", function() {
    return gulp.src(src)
        .pipe(istanbul({
            instrumenter: isparta.Instrumenter
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task("mocha", function() {
    return gulp.src(tests)
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({
            thresholds: {
                global: 80
            }
        })).once("error", function() {

        });
});

gulp.task("test", ["coverage", "mocha"]);

gulp.task("default", ["build"], function() {
    gulp.watch(src, ["test", "build"]);
});
