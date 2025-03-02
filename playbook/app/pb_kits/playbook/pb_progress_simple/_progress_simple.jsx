/* @flow */
import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

type ProgressSimpleProps = {
  align?: "left" | "center" | "right",
  className?: string | array<string>,
  dark?: boolean,
  data?: string,
  id?: string,
  max?: string,
  muted: boolean,
  percent: string,
  value: number,
  variant?: "default" | "positive" | "negative" | "warning",
  width: string,
}

const ProgressSimple = (props: ProgressSimpleProps) => {
  const {
    align,
    className,
    dark = false,
    max,
    muted = false,
    percent = '',
    value,
    variant = 'default',
    width = '100%',
  } = props
  const styles = {
    width: width,
  }

  const variantStyle = variant == 'default' ? '' : variant

  const valueStyles = {
    width: percent ? `${percent}%` : `${(value * 100) / max}%`,
  }

  const wrapperClass = classnames(
    buildCss('pb_progress_simple_wrapper', align, { dark: dark }),
    globalProps(props),
    className
  )

  const kitClass = classnames(
    buildCss('pb_progress_simple_kit', { muted }, variantStyle, align),
    className
  )

  return (
    <div className={wrapperClass}>
      <div
          className={kitClass}
          data-value={value}
          style={styles}
      >
        <div
            className="progress_simple_value"
            style={valueStyles}
        />
      </div>
    </div>
  )
}

export default ProgressSimple
