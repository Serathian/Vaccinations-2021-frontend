import { line, curveLinear } from 'd3'

export const Lines = ({
  data,
  yScale,
  xScale,
  yValue,
  xValue,
  circleRadius = 5,
}) => {
  return (
    <g className='line'>
      <path
        d={line()
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))
          .curve(curveLinear)(data)}
      />
      {data.map((d) => (
        <circle cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius}>
          <title>
            Date: {xValue(d).toString()}
            {'\n'}
            Num Cases: {yValue(d)}
          </title>
        </circle>
      ))}
    </g>
  )
}
