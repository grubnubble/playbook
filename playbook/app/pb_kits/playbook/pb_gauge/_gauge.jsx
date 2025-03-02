/* @flow */

import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import Highcharts from 'highcharts'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import pbChart from '../plugins/pb_chart'

type GaugeProps = {
  aria: Object,
  className?: string,
  chartData?: array,
  dark?: Boolean,
  data?: Object,
  disableAnimation: boolean,
  fullCircle: boolean,
  height: string,
  id?: string,
  max: number,
  min: number,
  prefix: string,
  showLabels: boolean,
  style: string,
  suffix: string,
  title: string,
  tooltipHtml: string,
  colors: array,
}

const Gauge = (props: GaugeProps) => {
  const {
    aria = {},
    className,
    chartData = [{ name: 'Name', value: 0 }],
    dark = false,
    data = {},
    disableAnimation = false,
    fullCircle = false,
    height = null,
    id,
    max = 100,
    min = 0,
    prefix = '',
    showLabels = false,
    style = 'solidgauge',
    suffix = '',
    title = '',
    tooltipHtml = '<span style="font-weight: bold; color:{point.color};">●</span>{point.name}: ' + '<b>{point.y}</b>',
    colors = [],
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const css = buildCss({
    'pb_gauge_kit': true,
  })
  // Runs first time component Renders
  useEffect(() => {
    const formattedChartData = chartData.map((obj) => {
      obj.y = obj.value
      delete obj.value
      return obj
    })

    new pbChart('.selector', {
      id: id,
      chartData: formattedChartData,
      circumference: fullCircle ? [0, 360] : [-100, 100],
      dark,
      disableAnimation: disableAnimation,
      height: height,
      min: min,
      max: max,
      prefix: prefix,
      title: title,
      suffix: suffix,
      showLabels: showLabels,
      style: style,
      tooltipHtml: tooltipHtml,
      type: 'gauge',
      colors: colors,
    })
  }, [])

  const componentDidMount = useRef(false)
  // Doesn't run the first time but runs every subsequent render
  useEffect(() => {
    if (componentDidMount.current) {
      Highcharts.charts.forEach((chart) => {
        if (chart && chart.renderTo.id === id) {
          chart.series[0].setData([chartData[0].value])
          chart.series[0].data[0].name = chartData[0].name
        }
      })
    } else {
      componentDidMount.current = true
    }
  }, [chartData])
  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(css, globalProps(props), className)}
        id={id}
    />
  )
}

export default Gauge
