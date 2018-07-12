import PaginationFactory from '../paginationFactory';

describe('PaginationFactory', () => {
  describe('buildPagination', () => {
    it('return coherent but useless results with bad data', async () => {
      const dataList = {
        page: null,
        total_pages: null,
      };
      const paginationData = PaginationFactory.buildPagination(dataList);
      const paginationDataExpected = {
        current: null,
        list: [],
        next: null,
        previous: null,
        total: null,
      };
      expect(paginationData).toEqual(paginationDataExpected);
    });
    it('return current, list, next, previous, total with good data', async () => {
      const dataList = {
        page: 5,
        total_pages: 10,
      };
      const paginationData = PaginationFactory.buildPagination(dataList);
      const paginationDataExpected = {
        current: 5,
        list: [3, 4, 5, 6, 7],
        next: 6,
        previous: 4,
        total: 10,
      };
      expect(paginationData).toEqual(paginationDataExpected);
    });
    it('do not break on first page', async () => {
      const dataList = {
        page: 1,
        total_pages: 10,
      };
      const paginationData = PaginationFactory.buildPagination(dataList);
      const paginationDataExpected = {
        current: 1,
        list: [1, 2, 3, 4, 5],
        next: 2,
        previous: null,
        total: 10,
      };
      expect(paginationData).toEqual(paginationDataExpected);
    });
    it('do not break on last page', async () => {
      const dataList = {
        page: 10,
        total_pages: 10,
      };
      const paginationData = PaginationFactory.buildPagination(dataList);
      const paginationDataExpected = {
        current: 10,
        list: [6, 7, 8, 9, 10],
        next: null,
        previous: 9,
        total: 10,
      };
      expect(paginationData).toEqual(paginationDataExpected);
    });
    it('do not break on first page plus one', async () => {
      const dataList = {
        page: 2,
        total_pages: 10,
      };
      const paginationData = PaginationFactory.buildPagination(dataList);
      const paginationDataExpected = {
        current: 2,
        list: [1, 2, 3, 4, 5],
        next: 3,
        previous: 1,
        total: 10,
      };
      expect(paginationData).toEqual(paginationDataExpected);
    });
    it('do not break on last page minus one', async () => {
      const dataList = {
        page: 9,
        total_pages: 10,
      };
      const paginationData = PaginationFactory.buildPagination(dataList);
      const paginationDataExpected = {
        current: 9,
        list: [6, 7, 8, 9, 10],
        next: 10,
        previous: 8,
        total: 10,
      };
      expect(paginationData).toEqual(paginationDataExpected);
    });
  });
});
