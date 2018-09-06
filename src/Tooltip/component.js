import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { any, bool, number, object, oneOf, string } from 'prop-types'

import tippy from '@opallabs/tippy.js/dist/tippy.all.js'

import '@opallabs/tippy.js/dist/themes/light.css'
import '@opallabs/tippy.js/dist/themes/translucent.css'

function applyIfFunction(fn) {
  return (typeof fn === 'function') ? fn() : fn
}

export default class Tooltip extends Component {
  static propTypes = {
    children: any,
    className: string,
    content: any,
    disabled: bool,
    edgeOffset: number,
    forceClose: bool,
    open: bool,
    placement: oneOf(['top', 'bottom', 'left', 'right']),
    rawTemplate: any,
    style: object,
    tabIndex: number,
    title: string,
    useCapture: bool,
  };

  static defaultProps = {
    disabled: false,
    open: false,
    placement: 'bottom',
    title: null,
    useCapture: false,
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

    if (this.props.forceClose === true && prevProps.forceClose === false) {
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
    const offset = this.calculateOffset()
    this.tooltipDOM.setAttribute('title', this.props.title)

    if (this.props.useCapture) {
      tippy.useCapture()
    }

    tippy(this.tooltipDOM, {
      ...this.props,
      distance: offset,
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
  
  calculateOffset = () => {
    const { placement, edgeOffset } = this.props
    if (placement === 'right' || placement === 'left' || edgeOffset === undefined) {
      return undefined
    }
    const height = this.tooltipDOM.firstChild.getBoundingClientRect().height
    return (height / 2) + edgeOffset
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