import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import tippy from 'tippy.js/dist/tippy.standalone.js';

const defaultProps = {
  title: null,
  open: false,
  disabled: false
};


function applyIfFunction( fn ) {
  return (typeof fn === 'function') ? fn() : fn;
}


class Tooltip extends Component {

  componentDidMount() {
    this.initTippy();
  }

  componentWillUnmount() {
    this.destroyTippy();
  }

  componentDidUpdate(prevProps) {
    if ( !this.tippy )
      return;

    // enable and disabled
    if (this.props.disabled === false && prevProps.disabled === true) {
      this.tippy.enable();
      return;
    }

    if (this.props.disabled === true && prevProps.disabled === false) {
      this.tippy.disable();
      return;
    }

    // open
    if (this.props.open === true && !prevProps.open) {
      setTimeout(() => {
        this.showTooltip();
      }, 0)
    }

    if (this.props.open === false && prevProps.open === true) {
      this.hideTooltip();
    }
  }

  showTooltip = () => {
    this.tippy.show();
  }

  hideTooltip = () => {
    this.tippy.hide();
  }

  contentRoot = () => {
      if ( !this._contentRoot && typeof window === 'object' )
        this._contentRoot = window.document.createElement( 'div' );
      return this._contentRoot;
  }

  initTippy = () => {
    this.tooltipDOM.setAttribute('title', this.props.title);
    tippy(this.tooltipDOM, {
        ...this.props,
        html: this.props.render ? this.contentRoot() : this.props.rawTemplate,
        dynamicTitle: true,
        performance: true
    });
    this.tippy = this.tooltipDOM._tippy;
    if (this.props.open) {
      this.showTooltip();
    }
  }

  destroyTippy = () => {
    this.tippy.hide();
    this.tippy.destroy();
    this.tippy = null;
  }


  render() {
    return (
      <div
        ref={(tooltip) => { this.tooltipDOM = tooltip; }}
        title={this.props.title}
        className={this.props.className}
        tabIndex={this.props.tabIndex}
        style={{
          display: 'inline',
          ...this.props.style
        }}
      >
        {this.props.children}
        {this.props.render && this.contentRoot()
          ? ReactDOM.createPortal(
              applyIfFunction( this.props.render ),
              this.contentRoot() )
          : null}
      </div>
    );
  }
}


Tooltip.defaultProps = defaultProps;

export default Tooltip;
