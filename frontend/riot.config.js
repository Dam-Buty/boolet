const sass = require('node-sass');

export default {
  from: 'tags',
  to: 'app.js',
  // css parser
  style: 'scss',
  parsers: {
    css: {
      scss: (tagName, css, opts, url) => {
        return sass.renderSync({
          data: css,
          // outputStyle: 'compressed'
        }).css.toString();
      },
    }
  }
};
