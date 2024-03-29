export const Marks = ({ data, yScale, xScale, yValue, innerHeight }) => {
  return (
    <>
      {data.map((d) => (
        <rect
          className='mark'
          key={d.x0}
          y={yScale(yValue(d))}
          x={xScale(d.x0)}
          width={xScale(d.x1) - xScale(d.x0)}
          height={innerHeight - yScale(yValue(d))}>
          <title>
            Date: {d.x1.toString()}
            {'\n'}
            Vaccinations: {yValue(d)}
          </title>
        </rect>
      ))}
    </>
  )
}
