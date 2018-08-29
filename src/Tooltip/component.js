import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { any, bool, number, object, string } from 'prop-types'

import tippy from 'tippy.js/dist/tippy.all.js'

import 'tippy.js/dist/themes/light.css'
import 'tippy.js/dist/themes/translucent.css'

function applyIfFunction(fn) {
  return (typeof fn === 'function') ? fn() : fn
}

export default class Tooltip extends Component {
  static propTypes = {
    children: any,
    className: string,
    content: any,
    disabled: bool,
    open: bool,
    rawTemplate: any,
    style: object,
    tabIndex: number,
    title: string,
  };

  static defaultProps = {
    disabled: false,
    open: false,
    title: null,
  };

  componentDidMount() {
    this.initTippy()
  }

  componentWillUnmount() {
    this.destroyTippy()
  }

  componentDidUpdate(prevProps) {
    if (!this.tippy) {
      return
    }

    // enable and disabled
    if (this.props.disabled === false && prevProps.disabled === true) {
      this.tippy.enable()
      return
    }

    if (this.props.disabled === true && prevProps.disabled === false) {
      this.tippy.disable()
      return
    }

    // open
    if (this.props.open === true && !prevProps.open) {
      setTimeout(() => {
        this.showTooltip()
      }, 0)
    }

    if (this.props.open === false && prevProps.open === true) {
      this.hideTooltip()
    }
  }

  showTooltip = () => {
    this.tippy.show()
  }

  hideTooltip = () => {
    this.tippy.hide()
  }

  contentRoot = () => {
    if (!this._contentRoot && typeof window === 'object') {
      this._contentRoot = window.document.createElement('div')
    }
    return this._contentRoot
  }

  initTippy = () => {
    this.tooltipDOM.setAttribute('title', this.props.title)
    tippy(this.tooltipDOM, {
      ...this.props,
      html: this.props.content ? this.contentRoot() : this.props.rawTemplate,
      dynamicTitle: true,
      performance: true
    })
    this.tippy = this.tooltipDOM._tippy
    if (this.props.open) {
      this.showTooltip()
    }
  }

  destroyTippy = () => {
    this.tippy.destroy()
    this.tippy = null
  }

  render() {
    return (
      <div
        className={this.props.className}
        ref={tooltip => { this.tooltipDOM = tooltip }}
        style={{ display: 'inline', ...this.props.style }}
        tabIndex={this.props.tabIndex}
        title={this.props.title}>
        {this.props.children}
        {this.props.content && this.contentRoot()
          ? ReactDOM.createPortal(
            applyIfFunction(this.props.content),
            this.contentRoot())
          : null}
      </div>
    )
  }
}