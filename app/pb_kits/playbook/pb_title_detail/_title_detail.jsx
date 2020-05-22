/* @flow */

import React from 'react'
import classnames from 'classnames'

import {
  Body,
  Title,
} from '../'

import {
  buildCss,
  buildDataProps,
} from '../utilities/props'

type TitleDetailProps = {
  align?: 'left' | 'center' | 'right',
  className?: String,
  data?: object,
  detail: String,
  id?: String,
  title: String,
}

const TitleDetail = ({
  align = 'left',
  className,
  data = {},
  detail,
  id,
  title,
}: TitleDetailProps) => {
  const dataProps = buildDataProps(data)
  const pbCss = buildCss('pb_title_detail_kit', align)

  return (
    <div
        {...dataProps}
        className={classnames(className, pbCss)}
        id={id}
    >
      <Title
          size={4}
          text={title}
      />
      <Body
          color="light"
          text={detail}
      />
    </div>
  )
}

export default TitleDetail
