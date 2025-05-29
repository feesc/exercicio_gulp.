const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');


// Tarefa para compilar Sass
function compilarSass() {
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
}

// Tarefa para minificar imagens
function otimizarImagens() {
        return gulp.src('src/images/**/*.{jpg,jpeg,png,svg,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}
//Tarefa para minificar JavaScript
function minificarJS() {
        return gulp.src('src/js/**/*.js') // Arquivos de entrada
    .pipe(uglify())                  // Minificação
    .pipe(gulp.dest('dist/js'));    // Saída
}


// Assistir mudanças
function assistirArquivos() {
    gulp.watch('src/scss/**/*.scss', compilarSass);
    gulp.watch('src/images/**/*.{jpg,jpeg,png,svg,gif}', otimizarImagens);
    gulp.watch('src/js/*.js',minificarJS);
}

// Exportar tarefas
exports.default = gulp.series(
    gulp.parallel(compilarSass, otimizarImagens,minificarJS),
    assistirArquivos
);