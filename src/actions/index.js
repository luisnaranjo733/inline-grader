export const addRubric = (rubric) => ({
  type: 'ADD_RUBRIC',
  rubric
})

export const updateCriteriaGrade = (criteriaIndex, value) => ({
  type: 'UPDATE_CRITERIA_GRADE',
  criteriaIndex,
  value
})