/* @flow */

import React from 'react'
import classnames from 'classnames'
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

type LayoutPropTypes = {
  aria?: object,
  children?: Array<React.ReactNode> | React.ReactNode,
  className?: String,
  collapse?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  dark?: Boolean,
  data?: object,
  full?: Boolean,
  position?: 'left' | 'right',
  size?: 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl',
  variant?: 'light' | 'dark' | 'gradient',
  transparent?: Boolean
}

type LayoutSideProps = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String,
}

type LayoutBodyProps = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String,
}

// Side component
const Side = ({
  children,
  className,
}: LayoutSideProps) => {
  return (
    <div className={classnames('layout_sidebar', className)}>
      {children}
    </div>
  )
}

// Body component
const Body = ({
  children,
  className,
}: LayoutBodyProps) => {
  return (
    <div className={classnames('layout_body', className)}>
      {children}
    </div>
  )
}

// Main componenet
const Layout = ({
  aria = {},
  children,
  className,
  collapse = 'md',
  dark = false,
  data = {},
  full = false,
  position = 'left',
  size = 'md',
  variant = 'light',
  transparent = false,
}: LayoutPropTypes) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const layoutCss = buildCss('pb_layout_kit', `size_${size}`, position, variant, {
    'dark': dark,
    'transparent': transparent,
    'full': full,
  })
  const layoutCollapseCss = buildCss('layout', position, 'collapse', collapse)

  const layoutChildren = typeof(children) === 'object' && children.length ? children : [children]

  const subComponentTags = (tagName) => {
    return layoutChildren.filter((c) => {
      return c.type && c.type.displayName === tagName
    }).map((child, i) => {
      return React.cloneElement(child, { key: `${tagName.toLowerCase()}-${i}` })
    })
  }

  const nonSideChildren = layoutChildren.filter((child) => !child.type || child.type.displayName !== 'Side')

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(layoutCss, layoutCollapseCss, className)}
    >
      {subComponentTags('Side')}
      {nonSideChildren}
    </div>
  )
}

Layout.Side = Side
Layout.Body = Body

export default Layout
