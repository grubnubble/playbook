import React from 'react'
import Time from '../_time.jsx'

const TimeStamp = () => {
  return (
    <div>
      <Time
          date={new Date()}
          size="sm"
      />

      <br />

      <Time
          date={new Date().getTime()}
          size="sm"
      />
    </div>
  )
}

export default TimeStamp
