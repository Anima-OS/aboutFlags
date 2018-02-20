"use strict";
/* eslint-disable no-unused-vars */
/* global React */

/**
 * Shorthand for creating elements (to avoid using a JSX preprocessor)
 */
const r = React.createElement;

/**
 * Information box used at the top of listings.
 */
window.InfoBox = class InfoBox extends React.Component {
  render() {
    return (
      r("div", {className: "info-box"},
        r("div", {className: "info-box-content"},
          this.props.children,
        ),
      )
    );
  }
};

/**
 * Button using in-product styling.
 */
window.STKButton = class STKButton extends React.Component {
  render() {
    return (
      r("button", Object.assign({}, this.props, {children: undefined}),
        r("div", {className: "button-box"},
          this.props.children,
        ),
      )
    );
  }
};

/**
 * Checkbox using in-product styling.
 */
 window.STKCheckBox = class STKCheckBox extends React.Component {
   constructor(props) {
     super(props);
   }
   
   render() {
     return (
       r("input",  {type: "checkbox", className: "check-box", onChange: this.props.onChecked, checked: this.props.checked})
     )
   }
 };
 