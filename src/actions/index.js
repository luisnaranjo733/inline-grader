export const replaceRubric = (rubricName, criteria) => ({
  type: 'REPLACE_RUBRIC',
  rubricName,
  criteria
});

export const updateCriterionGrade = (criterionIndex, value) => ({
  type: 'UPDATE_CRITERION_GRADE',
  criterionIndex,
  value
});

export const updateCriterionComment = (criterionIndex, value) => ({
  type: 'UPDATE_CRITERION_COMMENT',
  criterionIndex,
  value
});

export const addCriterionDefaultComment = (criterionIndex, value) => ({
  type: 'ADD_CRITERION_DEFAULT_COMMENT',
  criterionIndex,
  value
});

export const resetRubric = () => ({
  type: 'RESET_RUBRIC',
});