/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import { globalProps } from '../utilities/globalProps'

type LayoutPropTypes = {
  aria?: object,
  children?: array<React.ReactNode> | React.ReactNode,
  className?: string,
  collapse?: "xs" | "sm" | "md" | "lg" | "xl",
  dark?: boolean,
  data?: object,
  full?: boolean,
  position?: "left" | "right",
  responsive?: boolean,
  size?: "xs" | "sm" | "md" | "base" | "lg" | "xl",
  variant?: "light" | "dark" | "gradient",
  transparent?: boolean,
  layout?: "sidebar" | "collection" | "kanban" | "content" | "masonry",
}

type LayoutSideProps = {
  children: array<React.ReactNode> | React.ReactNode,
  className?: string,
}

type LayoutBodyProps = {
  children: array<React.ReactNode> | React.ReactNode,
  className?: string,
}

type LayoutItemProps = {
  children: array<React.ReactNode> | React.ReactNode,
  className?: string,
  size?: "sm" | "md" | "lg"
}

type LayoutHeaderProps = {
  children: array<React.ReactNode> | React.ReactNode,
  className?: string,
}

type LayoutFooterProps = {
  children: array<React.ReactNode> | React.ReactNode,
  className?: string,
}

// Side component
const Side = (props: LayoutSideProps) => {
  const { children, className } = props
  return (
    <div className={classnames('layout_sidebar', globalProps(props), className)}>
      {children}
    </div>
  )
}

// Body component
const Body = (props: LayoutBodyProps) => {
  const { children, className } = props
  return (
    <div className={classnames('layout_body', globalProps(props), className)}>
      {children}
    </div>
  )
}

// Item component
const Item = (props: LayoutItemProps) => {
  const { children, className, size = 'sm' } = props
  const sizeClass = `size_${size}`
  return (
    <div className={classnames('layout_item', sizeClass, globalProps(props), className)}>
      {children}
    </div>
  )
}

// Header component
const Header = (props: LayoutHeaderProps) => {
  const { children, className } = props
  return (
    <div className={classnames('layout_header', globalProps(props), className)}>
      {children}
    </div>
  )
}

// Footer component
const Footer = (props: LayoutFooterProps) => {
  const { children, className } = props
  return (
    <div className={classnames('layout_footer', globalProps(props), className)}>
      {children}
    </div>
  )
}

// Main componenet

const Layout = (props: LayoutPropTypes) => {
  const {
    aria = {},
    children,
    className,
    collapse = 'md',
    dark = false,
    data = {},
    full = false,
    position = 'left',
    responsive = false,
    size = 'md',
    layout = 'sidebar',
    variant = 'light',
    transparent = false,
  } = props
  const responsiveClass = responsive ? '_responsive' : ''
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const layoutCss =
    layout == 'collection'
      ? `pb_layout_kit_${layout}`
      : layout == 'kanban'
        ? `pb_layout_kit_${layout}${responsiveClass}`
        : buildCss(`pb_layout_kit_${layout}`, `size_${size}`, position, variant, {
          dark: dark,
          transparent: transparent,
          full: full,
        })

  const layoutCollapseCss =
    layout == 'collection'
      ? ''
      : layout == 'kanban'
        ? ''
        : buildCss('layout', position, 'collapse', collapse)

  const layoutChildren =
    typeof children === 'object' && children.length ? children : [children]

  const subComponentTags = (tagName) => {
    return layoutChildren
      .filter((c) => {
        return c.type && c.type.displayName === tagName
      })
      .map((child, i) => {
        return React.cloneElement(child, {
          key: `${tagName.toLowerCase()}-${i}`,
        })
      })
  }

  const nonSideChildren = layoutChildren.filter(
    (child) => !child.type || child.type.displayName !== 'Side'
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(
        layoutCss,
        layoutCollapseCss,
        className,
        globalProps(props)
      )}
    >
      {subComponentTags('Side')}
      {nonSideChildren}
    </div>
  )
}

Layout.Side = Side
Layout.Body = Body
Layout.Item = Item
Layout.Header = Header
Layout.Footer = Footer

export default Layout
