'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

function nanostyled(tag, styleProps) {
  var Component = props => {
    var { css, filteredProps } = Object.keys(styleProps).reduce(
      (memo, key) => {
        var style = props[key] === undefined ? styleProps[key] : props[key];
        if (style) memo.css.push(style);
        delete memo.filteredProps[key];
        return memo;
      },
      {
        css: [props.className].filter(Boolean),
        filteredProps: Object.assign({}, props),
      }
    );

    var passedProps = Object.assign(filteredProps, {
      className: css.join(' '),
      tag: undefined,
    });
    return React.createElement(props.tag || tag, passedProps);
  };

  Component.displayName = `nanostyled-${tag}`;
  return Component;
}

module.exports = nanostyled;
