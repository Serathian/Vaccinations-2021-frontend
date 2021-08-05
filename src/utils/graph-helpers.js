import { max } from 'd3'

export const getDaysArray = (start, end) => {
  let arr = []
  for (const i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
    arr.push(new Date(i))
  }
  return arr
}

export const getYScaleDomain = (
  vaccinationBuckets,
  filteredCasesData,
  yValueVaccine,
  yValueCases
) => {
  const vaccineMax = max(vaccinationBuckets, yValueVaccine)
  const casesMax = max(filteredCasesData, yValueCases)

  return vaccineMax > casesMax ? vaccineMax : casesMax
}
