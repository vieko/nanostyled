(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global.nanostyled = factory(global.React));
}(this, (function (React) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

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

  return nanostyled;

})));
