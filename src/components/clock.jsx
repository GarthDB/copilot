import React from 'react'

let output

const renderTime = () => {
  const currentTime = new Date()
  let diem = 'AM'
  let h = currentTime.getHours()
  let m = currentTime.getMinutes()
  let s = currentTime.getSeconds()

  if (h === 0) {
    h = 12
  } else if (h > 12) {
    h = h - 12
    diem = 'PM'
  }

  if (m < 10) {
    m = '0' + m
  }
  if (s < 10) {
    s = '0' + s
  }
  output = {
    hours: h,
    minutes: m,
    seconds: s,
    diem
  }
  return output
}

export default class Clock extends React.Component {
  constructor(...args) {
    super(...args)
    this.displayName = 'Clock'
    this.state = renderTime()
    this.tick = this.tick.bind(this);
  }
  componentWillMount() {
    this.intervals = []
  }
  componentWillUnmount() {
    this.intervals.map(clearInterval)
  }
  setInterval() {
    this.intervals.push(setInterval.apply(null, arguments))
  }
  componentDidMount() {
    this.setInterval(this.tick, 1000)
  }
  tick() {
    renderTime()
    this.setState({ hours: output.hours, minutes: output.minutes, seconds: output.seconds, diem: output.diem })
  }
  render() {
    return (
      <div className='clock'>
        { this.state.hours }:{ this.state.minutes } { this.state.diem }
      </div>
    )
  }
}
