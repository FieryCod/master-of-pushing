import * as gulp from "gulp";
import * as loadPlugins from "gulp-load-plugins";
import * as concat from "gulp-concat-sourcemap";
import * as deploy from "gulp-gh-pages";
import * as del from "del";
import * as runSequence from "run-sequence";

let $ = loadPlugins();
const paths = {
    assets: "src/assets/**/*",
    less: "src/scss/main.scss",
    index: "src/index.html",
    ts: "src/scripts/**/*.ts",
    build: "build",
    dist: "dist"
};

gulp.task("clean", function(cb) {
    return del([paths.build, paths.dist], cb);
});

gulp.task("copy", function() {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(paths.dist + "/assets"));
});

var tsProject = $.typescript.createProject({
    declarationFiles: true,
    noExternalResolve: true,
    sortOutput: true,
    sourceRoot: "../scripts"
});

gulp.task("typescript", function() {
    var tsResult = gulp.src(paths.ts)
        .pipe($.sourcemaps.init())
        .pipe($.typescript(tsProject));

    return tsResult.js
        .pipe(concat("main.js"))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(paths.build));
});

gulp.task("less", function() {
    return gulp.src(paths.less)
        .pipe($.less())
        .pipe(gulp.dest(paths.build));
});

gulp.task("processhtml", function() {
    return gulp.src(paths.index)
        .pipe($.processhtml())
        .pipe(gulp.dest(paths.dist));
});

gulp.task("inject", function() {
    return gulp.src(paths.index)
        .pipe(gulp.dest("src"));
});

gulp.task("reload", ["typescript"], function() {
    gulp.src(paths.index)
        .pipe($.connect.reload());
});

gulp.task("watch", function() {
    gulp.watch(paths.ts, ["typescript", "reload"]);
    gulp.watch(paths.less, ["less", "reload"]);
    gulp.watch(paths.index, ["reload"]);
});

gulp.task("connect", function() {
    $.connect.server({
        root: [__dirname + "/src", paths.build],
        port: 9000,
        livereload: true
    });
});

gulp.task("open", function() {
    gulp.src(paths.index)
        .pipe($.open("", { url: "http://localhost:9000" }));
});

gulp.task("minifyJs", ["typescript"], function() {
    var all = [].concat(paths.build + "/main.js");
    return gulp.src(all)
        .pipe($.uglifyjs("all.min.js", { outSourceMap: false }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task("minifyCss", ["less"], function() {
    return gulp.src(paths.build + "/main.css")
        .pipe($.minifyCss())
        .pipe(gulp.dest(paths.dist));
});

gulp.task("deploy", function() {
    return gulp.src("dist/**/*")
        .pipe(deploy());
});

gulp.task("default", function() {
    runSequence("clean", ["inject", "typescript", "less", "connect", "watch"], "open");
});
gulp.task("build", function() {
    return runSequence("clean", ["copy", "minifyJs", "minifyCss", "processhtml"]);
});
