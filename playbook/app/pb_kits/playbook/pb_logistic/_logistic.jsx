/* @flow */

import React from 'react'
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime.js'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Icon from '../pb_icon/_icon'
import Title from '../pb_title/_title'

const dateString = (value: DateTime) => {
  const month = value.toMonthNum()
  const day = value.toDay()

  return ` · ${month}/${day}`
}

type LogisticProps = {
  aria?: object,
  className?: string,
  dark?: boolean,
  data?: object,
  date: string,
  id?: string,
  link?: string,
  projectName?: string,
  projectNumber?: number,
}

const Logistic = (props: LogisticProps) => {
  const { aria = {},
    className,
    dark = false,
    data = {},
    date,
    id,
    link,
    projectName,
    projectNumber } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const formattedDate = new DateTime({ value: date })
  const classes = classnames(
    buildCss('pb_logistic_kit', { dark }),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Body color="light">
        <Caption text="Project" />
        <Icon
            fixedWidth
            icon="home"
        />

        {` ${projectNumber}`}

        <Choose>
          <When condition={link}>
            <a
                className="pb_logistic_kit_links"
                href={link}
            >
              <Choose>
                <When condition={date}>
                  <Title
                      size={4}
                      tag="span"
                      text={' ' + projectName + dateString(formattedDate)}
                  />
                </When>
                <Otherwise>
                  <Title
                      size={4}
                      tag="span"
                      text={' ' + projectName}
                  />
                </Otherwise>
              </Choose>
            </a>
          </When>
          <Otherwise>
            <Choose>
              <When condition={date}>
                <Title
                    dark={dark}
                    size={4}
                    tag="span"
                    text={' ' + projectName + dateString(formattedDate)}
                />
              </When>
              <Otherwise>
                <Title
                    dark={dark}
                    size={4}
                    tag="span"
                    text={' ' + projectName}
                />
              </Otherwise>
            </Choose>
          </Otherwise>
        </Choose>
      </Body>
    </div>
  )
}

export default Logistic
