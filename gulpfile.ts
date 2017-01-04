import * as gulp from "gulp";
import * as concat from "gulp-concat-sourcemap";
import * as deploy from "gulp-gh-pages";
import * as runSequence from "run-sequence";
import * as uglifyjs from "gulp-uglifyjs";
import * as typescript from "gulp-typescript";
import * as sass from "gulp-sass";
import * as sourcemaps from "gulp-sourcemaps";
import * as autoprefixer from "gulp-autoprefixer";
let del = require("del");
let processhtml = require("gulp-processhtml");
let connect = require("gulp-connect");
let open = require("gulp-open");

const config = {
    styles: {
        sass: {
            style: { outputStyle: "expanded" },
            src: "public/stylesheets/*.scss",
        },
        prefixer: {
            browsers: ["last 10 versions"],
            cascade: false
        },
    }
};

const paths = {
    assets: "src/assets/**/*",
    scss: "src/scss/main.scss",
    index: "src/index.html",
    ts: "src/scripts/**/*.ts",
    build: "build",
    dist: "dist"
};

gulp.task("clean", (cb) => {
    return del([paths.build, paths.dist], cb);
});

gulp.task("copy", () => {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(paths.dist + "/assets"));
});

let tsProject = typescript.createProject({
    declarationFiles: true,
    noResolve: false
});

gulp.task("typescript", () => {
    let tsResult = gulp.src(paths.ts)
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    gulp.src("node_modules/phaser-ce/build/phaser.min.js")
        .pipe(gulp.dest(paths.build));

    return tsResult.js
        .pipe(concat("main.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build));
});

gulp.task("scss", () => {
    gulp.src(paths.scss).
        pipe(sass(config.styles.sass).on("error", sass.logError)).
        pipe(autoprefixer(config.styles.prefixer)).
        pipe(gulp.dest(paths.build));


});

gulp.task("processhtml", () => {
    return gulp.src(paths.index)
        .pipe(processhtml())
        .pipe(gulp.dest(paths.dist));
});

gulp.task("inject", () => {
    return gulp.src(paths.index)
        .pipe(gulp.dest("src"));
});

gulp.task("reload", ["typescript"], () => {
    gulp.src(paths.index)
        .pipe(connect.reload());
});

gulp.task("watch", () => {
    gulp.watch(paths.ts, ["typescript", "reload"]);
    gulp.watch(paths.scss, ["scss", "reload"]);
    gulp.watch(paths.index, ["reload"]);
});

gulp.task("connect", () => {
    connect.server({
        root: [__dirname + "/src", paths.build],
        port: 9000,
        livereload: true
    });
});

gulp.task("open", () => {
    gulp.src(paths.index)
        .pipe(open("", { url: "http://localhost:9000" }));
});

gulp.task("minifyJs", ["typescript"], () => {
    let all = [].concat(paths.build + "/main.js");
    return gulp.src(all)
        .pipe(uglifyjs("all.min.js", { outSourceMap: false }))
        .pipe(gulp.dest(paths.dist));
});


gulp.task("deploy", () => {
    return gulp.src("dist/**/*")
        .pipe(deploy());
});

gulp.task("default", () => {
    runSequence("clean", ["inject", "typescript", "scss", "connect", "watch"], "open");
});
gulp.task("build", () => {
    return runSequence("clean", ["copy", "minifyJs", "processhtml"]);
});
