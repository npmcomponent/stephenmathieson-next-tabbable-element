
var isFocousable = require('is-focusable');
var descendants = require('descendants');
var indexof = require('indexof');

module.exports = nextTabbableElement;

/**
 * Find the element in the tab order after `root`,
 * defaulting to the `body`.
 *
 * @api public
 * @param {HTMLElement} [root]
 * @return {HTMLElement}
 */

function nextTabbableElement(root) {
  var elements = descendants(document.body);
  var i = root
    ? indexof(elements, root) + 1
    : 0;

  for (var len = elements.length; i < len; i++) {
    if (!isFocousable(elements[i])) continue;
    // while `<div tabindex="-1" />` can receive focus, it's
    // not in the native order
    if ('-1' != elements[i].getAttribute('tabindex'))
      return elements[i];
  }

  return null;
}
