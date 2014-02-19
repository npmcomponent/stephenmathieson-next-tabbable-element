
describe('next-tabbable-element', function () {
  var assert = require('assert');
  var next = require('next-tabbable-element');

  var fixture;

  // ensure we know what the first element in the tab order is
  before(function () {
    var first = document.createElement('div');
    first.tabIndex = 0;
    first.innerHTML = first.id = 'yo';
    document.body.insertBefore(first, document.body.firstChild);
  });

  beforeEach(function () {
    fixture = document.createElement('div');
    fixture.innerHTML =
        '<button id="a">a</button>'
      + '<div tabindex="-1" id="b">b</div>'
      + '<a href="#" id="c">c</a>'
      + '<div>'
      + '  <div>'
      + '    <div>'
      + '      <div>'
      + '        <div>'
      + '          <div>'
      + '            <div>'
      + '              <div>'
      + '                <a href="#" id="d">d</a>'
      + '              </div>'
      + '            </div>'
      + '          </div>'
      + '        </div>'
      + '      </div>'
      + '    </div>'
      + '  </div>'
      + '</div>';
    document.body.appendChild(fixture);
  });

  afterEach(function () {
    document.body.removeChild(fixture);
  });

  it('should return the next element in the tab order', function () {
    var a = document.querySelector('#a');
    var c = document.querySelector('#c');
    assert(c == next(a));
  });

  it('should handle deeply nested elements', function () {
    var c = document.querySelector('#c');
    var d = document.querySelector('#d');
    assert(d == next(c));
  });

  it('should return null if on the last tabbable element', function () {
    var d = document.querySelector('#d');
    assert(null == next(d));
  });

  it('should default to the body', function () {
    var yo = document.querySelector('#yo');
    assert(yo == next());
  });

  it('should handle detached elements', function () {
    var yo = document.querySelector('#yo');
    var foo = document.createElement('div');
    assert(yo == next(foo));
  });

  it('should support non-tabbable elements', function () {
    var c = document.querySelector('#c');
    var d = document.querySelector('#d');
    var div = c.nextSibling;
    assert(d == next(div));
  });
});
