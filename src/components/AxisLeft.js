export const AxisLeft = ({ yScale }) => {
  return (
    <>
      {yScale.ticks().map((tickValue) => (
        //Now we take the yScale and access the domain object(which is the country we passed in earlier line 36) and we map them and extract the tickvalue
        //we can use the yScale(tickvalue) to get the starting point of each bar and offset it by  half of the yScale.bandwidth to center the text in each bar
        <g className='tick'>
          <text
            key={tickValue}
            style={{ textAnchor: 'end' }}
            dy='.32em'
            x='-3'
            y={yScale(tickValue)}>
            {tickValue}
          </text>
        </g>
      ))}
    </>
  )
}
