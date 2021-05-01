const posthtml = require('posthtml');

/**
 * @param {{type: string, file: string}[]} postHtmlMessages
 * @returns {string[]}
 */
function findDependencyFiles(postHtmlMessages) {
  return [...new Set(postHtmlMessages)]
    .filter((message) => message.message === 'dependency')
    .map((message) => message.file);
}

/**
 * @param {string} html
 * @param {string} rootPath
 * @returns {{html: string, files: string[]}}
 */
function processPostHtml(html, rootPath) {
  /** @type import('posthtml').Result*/
  const processedPostHtml = posthtml()
    .use(require('posthtml-include')({ encoding: 'utf8', root: rootPath }))
    .process(html, { sync: true });
  const dependencies = findDependencyFiles(processedPostHtml.messages);
  return { html: processedPostHtml.html, files: dependencies };
}

module.exports = processPostHtml;
