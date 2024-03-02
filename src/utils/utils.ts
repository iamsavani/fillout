export type FilterClauseType = {
  id: string;
  condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
  value: number | string | Date;
};

export type ResponseFiltersType = FilterClauseType[];

export const preprocessFilters = (
  filters: ResponseFiltersType,
): Map<string, FilterClauseType> => {
  const filterMap = new Map<string, FilterClauseType>();
  filters.forEach((filter) => {
    filterMap.set(filter.id, filter);
  });
  return filterMap;
};

export const applyFilters = (
  response: any,
  filters: Map<string, FilterClauseType>,
): boolean => {
  return Array.from(filters.values()).every((filter) => {
    const question = response.questions.find((q) => q.id === filter.id);
    if (!question) return false;

    let questionValue = question.value;
    let filterValue = filter.value;

    if (question.type === 'DatePicker') {
      questionValue = new Date(questionValue);
      filterValue = new Date(filterValue);
    } else if (!isNaN(Number(questionValue))) {
      questionValue = Number(questionValue);
      filterValue = Number(filterValue);
    }

    switch (filter.condition) {
      case 'equals':
        return questionValue === filterValue;
      case 'does_not_equal':
        return questionValue !== filterValue;
      case 'greater_than':
        return questionValue > filterValue;
      case 'less_than':
        return questionValue < filterValue;
      default:
        return false;
    }
  });
};
