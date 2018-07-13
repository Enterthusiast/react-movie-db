const movieService = function () {
  const service = {
    async requestWrapper(request) {
      return request;
    },
    addImagePath(results) {
      return results;
    },
    async getConfiguration() {
      this.ready = true;
      return this.configuration;
    },
    async getMovieNowPlaying() {
      return {
        results: [
          { original_title: 'movie 1', id: 1 },
          { original_title: 'movie 2', id: 2 },
          { original_title: 'movie 3', id: 3 },
        ],
        page: 5,
        total_pages: 10,
      };
    },
    async getMovieDetails() {
      return { original_title: 'title details' };
    },
    reset() {
      this.configuration = {};
      this.ready = false;
    },
    configuration: {},
    key: 'api_key=12345',
    ready: false,
  };

  return service;
};

export default movieService();
