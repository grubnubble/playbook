// Prop categories
const spacingProps = ({
  marginRight,
  marginLeft,
  marginTop,
  marginBottom,
  marginX,
  marginY,
  margin,
  paddingRight,
  paddingLeft,
  paddingTop,
  paddingBottom,
  paddingX,
  paddingY,
  padding,
}) => {
  let css = ''
  css += marginRight ? `mr_${marginRight} ` : ''
  css += marginLeft ? `ml_${marginLeft} ` : ''
  css += marginTop ? `mt_${marginTop} ` : ''
  css += marginBottom ? `mb_${marginBottom} ` : ''
  css += marginX ? `mx_${marginX} ` : ''
  css += marginY ? `my_${marginY} ` : ''
  css += margin ? `m_${margin} ` : ''
  css += paddingRight ? `pr_${paddingRight} ` : ''
  css += paddingLeft ? `pl_${paddingLeft} ` : ''
  css += paddingTop ? `pt_${paddingTop} ` : ''
  css += paddingBottom ? `pb_${paddingBottom} ` : ''
  css += paddingX ? `px_${paddingX} ` : ''
  css += paddingY ? `py_${paddingY} ` : ''
  css += padding ? `p_${padding} ` : ''
  return css
}

const darkProps = ({ dark }) => {
  let css = ''
  css += dark ? 'dark' : ''
  return css
}

const numberSpacingProps = ({ numberSpacing }) => {
  let css = ''
  css += numberSpacing ? `ns_${numberSpacing} ` : ''
  return css
}

const maxWidthProps = ({ maxWidth }) => {
  let css = ''
  css += maxWidth ? `max_width_${maxWidth } ` : ''
  return css
}

const zIndexProps = ({ zIndex }) => {
  let css = ''
  css += zIndex ? `z_index_${zIndex } ` : ''
  return css
}

const shadowProps = ({ shadow }) => {
  let css = ''
  css += shadow ? `shadow_${shadow} ` : ''
  return css
}

const lineHeightProps = ({ lineHeight }) => {
  let css = ''
  css += lineHeight ? `line_height_${lineHeight} ` : ''
  return css
}

const displayProps = ({ display }) => {
  let css = ''
  css += display ? `display_${display} ` : ''
  return css
}

const cursorProps = ({ cursor }) => {
  let css = ''
  css += cursor ? `cursor_${cursor} ` : ''
  return css
}

// All Exported as a single function
export const globalProps = (props, defaultProps = {}) => {
  const allProps = { ...props, ...defaultProps }
  return spacingProps(allProps) + darkProps(allProps) + maxWidthProps(allProps) + zIndexProps(allProps) + numberSpacingProps(allProps) + shadowProps(allProps) + lineHeightProps(allProps) + cursorProps(allProps) + displayProps(allProps)
}

export const deprecatedProps = (kit, props = []) => {
  if (process.env.NODE_ENV === 'development') {
    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    props.forEach((prop) => {
      console.warn(`${kit} Kit: The prop '${prop}' is deprecated and will be removed in a future release!`)
    })
  }
}
