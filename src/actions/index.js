export const addCriterion = (criterion) => ({
  type: 'APPEND_CRITERION',
  criterion
});

export const updateRubricName = (rubricName) => ({
  type: 'UPDATE_RUBRIC_NAME',
  rubricName
});

export const updateCriterionGrade = (criterionIndex, value) => ({
  type: 'UPDATE_CRITERION_GRADE',
  criterionIndex,
  value
});