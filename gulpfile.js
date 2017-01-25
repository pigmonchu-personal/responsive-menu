var gulp = require('gulp');
var sass = require('gulp-sass'); //Compilará nuestro SASS
var notify = require('gulp-notify'); //Utilizando las notificaciones de escritorio
var browserSync = require('browser-sync').create(); //Refrescando los cambios en el servidor 
													//¡¡¡ Crea un servidor virtual en el puerto: 3000
var concat = require("gulp-concat");
var browserify = require("browserify");
var tap = require("gulp-tap");
var buffer = require("gulp-buffer");
var sourceMaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");

//config
var config = {
	sass: {
		compileSassTaskName: 'compile-sass',
		watchFiles: './src/scss/*.scss',
		entryPoint: './src/scss/style.scss',
		dest: './contents'
	}
};


// Tarea por defecto, veríficar cambios y en función de ellos lanzar procesos
gulp.task("default", [config.sass.compileSassTaskName], function(){

	//arrancar el servidor
	browserSync.init( {
		server: "./"
	});
	
	gulp.watch(config.sass.watchFiles, [config.sass.compileSassTaskName]); //comprobar cambios en fichero scss recompila el sass
	gulp.watch('./*.html', function() {
		browserSync.reload();
		notify().write("Navegador recargado");
	})		   //comprobar cambios en html y recargar el navegador

});

//
// Compilar SASS
//
gulp.task(config.sass.compileSassTaskName, function(){
	gulp.src(config.sass.entryPoint)			//establece fuente
	.pipe(sourceMaps.init())					//Mapa para el debugger
	.pipe(sass().on('error', function(error) {	//lo compila
		return notify().write(error);
	}))
	.pipe(sourceMaps.write("./"))				//Escribe el mapa
	.pipe(gulp.dest(config.sass.dest))			//genera fichero de salida
	.pipe(browserSync.stream())					//actualiza este fichero en el servidor
	.pipe(notify("SASS Compilado"))				//notifica fin de acción
});
