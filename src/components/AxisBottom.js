import { timeWeek } from 'd3'

export const AxisBottom = ({ xScale, innerHeight, tickFormat }) => {
  return (
    <>
      {xScale.ticks(timeWeek.every(1)).map((tickValue) => (
        //We can wrap each tick mark in a group so we can add text. by shift the group to the xScale tick mark we eleminate the need for specifying the x1 and x2 in the line element
        <g
          className='tick'
          key={tickValue}
          transform={`translate(${xScale(tickValue)}, 0)`}>
          {
            //xScale.ticks() returns an array of tick points divided along the xScale, we can map thoes tick marks and use SVG Line element to draw a grid.
            //We specify the x1(The X axes on the top) and x2(The X axes on the bottom) to be the xScale tick value. This way they end and start equally on top and bottom
            //we specify the y1 and y 2 to be the from 0(the bottom of the group) to {innerHeight} the top of the group.
          }
          <line y1='0' y2={innerHeight} stroke='black' />
          <text
            dy='.71em'
            y={innerHeight + 3}
            style={{ textAnchor: 'middle', fontSize: '0.6em' }}>
            {new Date(tickValue).toLocaleDateString()}
          </text>
        </g>
      ))}
    </>
  )
}
