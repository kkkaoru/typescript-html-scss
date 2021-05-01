const processPostHtml = require('./posthtml');

/**
 *
 * @param {string} content
 * @param {Object} loaderContext
 * @param {(filePath: string) => void} loaderContext.dependency
 * @param {(error: unknown) => void} loaderContext.emitError
 * @return {string}
 */
function htmlLoaderPreprocessor(content, loaderContext) {
  try {
    const { html, files } = processPostHtml(content, './src');
    files.forEach((filePath) => {
      // https://webpack.js.org/api/loaders/#thisadddependency
      loaderContext.dependency(filePath);
    });
    return html;
  } catch (error) {
    loaderContext.emitError(error);
    return content;
  }
}

module.exports = htmlLoaderPreprocessor;
