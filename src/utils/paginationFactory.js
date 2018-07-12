const paginationFactory = {
  buildPagination: (dataList) => {
    const pagePrevious = (dataList.page - 1) > 0 ? dataList.page - 1 : null;
    const pageNext = (dataList.page + 1) <= dataList.total_pages ? dataList.page + 1 : null;

    const pageList = [];
    if (dataList.page - 2 < 1) {
      for (let i = 1; i <= Math.min(5, dataList.total_pages); i += 1) {
        pageList.push(i);
      }
    } else if (dataList.page + 2 >= dataList.total_pages) {
      for (let i = Math.max(1, dataList.total_pages - 4); i <= dataList.total_pages; i += 1) {
        pageList.push(i);
      }
    } else {
      for (let i = dataList.page - 2; i <= dataList.page + 2; i += 1) {
        pageList.push(i);
      }
    }
    return {
      previous: pagePrevious,
      next: pageNext,
      list: pageList,
      current: dataList.page,
      total: dataList.total_pages,
    };
  },
};

export default paginationFactory;
