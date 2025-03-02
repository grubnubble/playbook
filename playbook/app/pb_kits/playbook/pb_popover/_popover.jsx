// @flow

import React from 'react'
import ReactDOM from 'react-dom'

import {
  Popper,
  Manager as PopperManager,
  PopperProps,
  Reference as PopperReference,
} from 'react-popper'

import { buildAriaProps, buildCss, buildDataProps, noop } from '../utilities/props'

import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps'

type PbPopoverProps = {
  aria?: object,
  className?: string,
  closeOnClick?: "outside" | "inside",
  data?: object,
  id?: String,
  offset?: boolean,
  reference: PopperReference,
  show?: boolean,
  shouldClosePopover?: () => boolean,
} & PopperProps

// Prop enabled default modifiers here
// https://popper.js.org/docs/v2/modifiers

const POPOVER_MODIFIERS = {
  offset: {
    //https://popper.js.org/docs/v2/modifiers/offset/
    enabled: true,
    name: 'offset',
    options: {
      offset: [0, 20],
    },
    phase: 'main',
  },
}

const popoverModifiers = ({ modifiers, offset }) => {
  return offset ? modifiers.concat([POPOVER_MODIFIERS.offset]) : modifiers
}

const Popover = (props: PbPopoverProps) => {
  const {
    aria = {},
    className,
    children,
    data = {},
    id,
    modifiers,
    offset,
    placement,
    referenceElement,
    zIndex,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
  } = props

  const popoverSpacing = globalProps(props).includes('dark') || !globalProps(props) ? 'p_sm' : globalProps(props)
  const overflowHandling = maxHeight || maxWidth ? 'overflow_handling' : ''
  const zIndexStyle = zIndex ? { zIndex: zIndex } : {}
  const widthHeightStyles = () => {
    return Object.assign(
      {},
      maxHeight ? { maxHeight: maxHeight } : {},
      maxWidth ? { maxWidth: maxWidth } : {},
      minHeight ? { minHeight: minHeight } : {},
      minWidth ? { minWidth: minWidth } : {}
    )
  }
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_popover_kit'),
    globalProps(props),
    className
  )

  return (
    <Popper
        modifiers={popoverModifiers({ modifiers, offset })}
        placement={placement}
        referenceElement={referenceElement}
    >
      {({ placement, ref, style }) => {
        return (
          <div
              {...ariaProps}
              {...dataProps}
              className={classes}
              data-placement={placement}
              id={id}
              ref={ref}
              style={Object.assign(
                {},
                style,
                zIndexStyle
              )}
          >
            <div
                className={classnames(
                `${buildCss('pb_popover_tooltip')} show`
              )}
            >
              <div
                  className={classnames(
                  'pb_popover_body',
                  popoverSpacing,
                  overflowHandling
                )}
                  style={widthHeightStyles()}
              >
                {children}
              </div>
            </div>
          </div>
        )
      }}
    </Popper>
  )
}

export default class PbReactPopover extends React.Component<PbPopoverProps> {
  static defaultProps = {
    modifiers: [],
    offset: false,
    placement: 'left',
    portal: 'body',
    show: false,
    shouldClosePopover: noop,
    usePortal: true,
  }

  componentDidMount() {
    const { closeOnClick, shouldClosePopover } = this.props

    if (!closeOnClick) return

    document.body.addEventListener('click', ({ target }) => {
      const targetIsPopover =
        target.closest('[class^=pb_popover_tooltip]') !== null
      const targetIsReference =
        target.closest('.pb_popover_reference_wrapper') !== null

      switch (closeOnClick) {
      case 'outside':
        if (!targetIsPopover || targetIsReference) {
          shouldClosePopover(true)
        }
        break
      case 'inside':
        if (targetIsPopover || targetIsReference) {
          shouldClosePopover(true)
        }
        break
      case 'any':
        shouldClosePopover(true)
        break
      }
    })
  }

  props: PbPopoverProps

  render() {
    const {
      className,
      children,
      modifiers,
      offset,
      placement,
      portal,
      reference,
      referenceElement,
      show,
      usePortal,
      zIndex,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
    } = this.props

    const popoverComponent = (
      <Popover
          {...this.props}
          className={className}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          minHeight={minHeight}
          minWidth={minWidth}
          modifiers={modifiers}
          offset={offset}
          placement={placement}
          referenceElement={referenceElement}
          zIndex={zIndex}
      >
        {children}
      </Popover>
    )

    return (
      <PopperManager>
        <If condition={reference && !referenceElement}>
          <PopperReference>
            {({ ref }) => (
              <span
                  className="pb_popover_reference_wrapper"
                  ref={ref}
              >
                <reference.type {...reference.props} />
              </span>
            )}
          </PopperReference>
        </If>
        <If condition={show}>
          <If condition={usePortal}>
            {ReactDOM.createPortal(
              popoverComponent,
              document.querySelector(portal)
            )}
            <Else />
            {popoverComponent}
          </If>
        </If>
      </PopperManager>
    )
  }
}
