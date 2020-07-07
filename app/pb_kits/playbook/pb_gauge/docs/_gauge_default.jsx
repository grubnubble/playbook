import React from 'react'
import { Gauge } from '../../'

const chartData = [
  { name: 'Point1', value: 45 },
]

const GaugeDefault = () => (
  <div>
    <Gauge
        chartData={chartData}
        id="gauge-default"
    />
  </div>
)

export default GaugeDefault
