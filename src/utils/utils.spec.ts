import {
  preprocessFilters,
  applyFilters,
  type ResponseFiltersType,
} from './utils';

describe('Filter Utilities', () => {
  describe('preprocessFilters', () => {
    it('should create a map from filter array', () => {
      const filters: ResponseFiltersType = [
        {
          id: 'nameId',
          condition: 'equals',
          value: 'Timmy',
        },
        {
          id: 'birthdayId',
          condition: 'greater_than',
          value: '2024-02-23T05:01:47.691Z',
        },
      ];
      const processedFilters = preprocessFilters(filters);
      expect(processedFilters instanceof Map).toBeTruthy();
      expect(processedFilters.get('nameId')).toEqual(filters[0]);
      expect(processedFilters.get('birthdayId')).toEqual(filters[1]);
    });
  });

  describe('applyFilters', () => {
    it('should return false if response meets all filter criteria', () => {
      const response = {
        questions: [
          {
            id: 'nameId',
            name: "What's your name?",
            type: 'ShortAnswer',
            value: 'Timmy',
          },
          {
            id: 'birthdayId',
            type: 'DatePicker',
            value: '2024-02-22T05:01:47.691Z',
          },
        ],
      };
      const filters = new Map();
      filters.set('nameId', {
        id: 'nameId',
        name: "What's your name?",
        condition: 'equals',
        value: 'Timmy',
      });
      filters.set('birthdayId', {
        id: 'birthdayId',
        condition: 'greater_than',
        value: '2024-02-23T05:01:47.691Z',
      });

      expect(applyFilters(response, filters)).toBeFalsy();
    });

    it('should return true if response meets all filter criteria', () => {
      const response = {
        questions: [
          {
            id: 'nameId',
            name: "What's your name?",
            type: 'ShortAnswer',
            value: 'Timmy',
          },
          {
            id: 'birthdayId',
            type: 'DatePicker',
            value: '2024-02-22T05:01:47.691Z',
          },
        ],
      };
      const filters = new Map();
      filters.set('nameId', {
        id: 'nameId',
        name: "What's your name?",
        condition: 'equals',
        value: 'Timmy',
      });
      filters.set('birthdayId', {
        id: 'birthdayId',
        condition: 'less_than',
        value: '2024-02-23T05:01:47.691Z',
      });

      expect(applyFilters(response, filters)).toBeTruthy();
    });

    it('should return false if response does not meet all filter criteria', () => {
      const response = {
        questions: [
          {
            id: 'nameId',
            name: "What's your name?",
            type: 'ShortAnswer',
            value: 'John',
          },
          { id: 'ageId', type: 'Number', value: 29 },
        ],
      };
      const filters = new Map();
      filters.set('nameId', {
        id: 'nameId',
        name: "What's your name?",
        condition: 'equals',
        value: 'John',
      });
      filters.set('ageId', {
        id: 'ageId',
        condition: 'greater_than',
        value: 30,
      });

      expect(applyFilters(response, filters)).toBeFalsy();
    });
  });
});
