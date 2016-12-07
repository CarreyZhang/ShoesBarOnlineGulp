var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rjs = require('gulp-requirejs');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var minifyHTML = require('gulp-minify-html');

var RevAll = require('gulp-rev-all');  
// var filter = require('gulp-filter');  
// var csso = require('gulp-csso');  
var useref = require('gulp-useref'); 

var folderHierarchy = {
    dist: './dist',
    lib: './web/js/libs',
    data: './web/data',
    temp: './.temp',
    mock: './mock-server'
};

gulp.task('lib', function(cb) {
      var cleanCSS = require('gulp-clean-css');
      var cssOption = {
        compatibility: ''
      };

    return gulp.src(['./web/**/*.*'//,
        // '!./web/css/*.*',
        // '!./web/js/**/*.*',
        // '!./web/views/*.*'
        ])
        .pipe(gulpif('*.js', uglify().on('error', gutil.log)))
        .pipe(gulpif('*.json', minifyHTML()))
        .pipe(gulpif('*.html', minifyHTML()))
        // '' or '*' (default) - Internet Explorer 9+ compatibility mode
        .pipe(gulpif('*.css', cleanCSS(cssOption)))    
        .pipe(gulp.dest(folderHierarchy.temp))    
    // return gulp.src(folderHierarchy.lib + '/**/*.*')
        // .pipe(gulp.dest(folderHierarchy.dist + '/js/libs'))
});

gulp.task('copy', ['lib'], function() {
    return gulp.src([folderHierarchy.temp + '/**/*.*',        
        '!' + folderHierarchy.temp + '/css/*.*',
        '!' + folderHierarchy.temp + '/js/**/*.*'//,
        // folderHierarchy.temp + '/css/bootstrap.css'//,
        // '!' + folderHierarchy.temp + '/views/*.*'
        ])
        .pipe(gulp.dest(folderHierarchy.dist))
});

gulp.task('main', ['package'], function() {
    console.log('main task begin..........');

});

gulp.task('clean', function() {
    var del = require('del');
    return del.sync([
            folderHierarchy.dist,
            folderHierarchy.temp
        ], {
        force: true
    })
});


gulp.task('package', ['copy', 'lib'], function() {
    var revAll = new RevAll({   
  
        //不重命名文件  
        dontRenameFile: ['.html'] ,  
  
        //无需关联处理文件  
        dontGlobal: [ /^\/favicon.ico$/ ,'.bat','.txt'],  
        //不去更新html的引用
        dontUpdateReference: ['.html']
        //该项配置只影响绝对路径的资源  
        // prefix: 'http://s0.static.server.com'   
    });  

    return gulp.src('./web/*.html')
    .pipe(useref({searchPath: folderHierarchy.temp}))
    .pipe(revAll.revision())
    .pipe(gulp.dest(folderHierarchy.dist))

});

gulp.task('serve:mock', function() {
    var nodemon = require('gulp-nodemon');
    //using mock server, you can config the banckend server in node-app/config/local.properties file
    nodemon({
        script: folderHierarchy.mock + '/app.js',
        delay: '1s',
        //only watch files in the node-app with extension: .js, .properties, .json
        watch: [folderHierarchy.mock],
        ext: 'js properties json',
        //output the details
        verbose: true
    })
    .on('restart', function() {
        console.log('mock server restarted');
    })
});

function startServer() {
    var exec = require('child_process').exec;
    var mock = exec('gulp serve:mock', [], {
        cwd: '.'
    });

    mock.stdout.on('data', gutil.log);
    mock.stderr.on('data', gutil.log);
    mock.on('close', gutil.log);
};

gulp.task('default', ['clean'], function() {
    console.log('here we go!.............');
    gulp.start('main');
});

gulp.task('dev', function() {
    gulp.start('main');
});

gulp.task('pack', ['clean'], function() {
    console.log('package now,  here we go!.............');
    gulp.start('main');
});

gulp.task('startServer', ['serve:mock'], function() {
    console.log('start server, here we go..........');
    startServer();
});