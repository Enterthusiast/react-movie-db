const movieService = function() {

    let service = {
        requestWrapper: async function(request, initialize) {
            return request;
        },
        addImagePath(results) {

            return results;
        },
        getConfiguration: async function() {
            this.ready = true;
            return this.configuration;
        },
        getMovieNowPlaying: async function(page) {
            return {
                results: [
                    {original_title: 'movie 1', id: 1},
                    {original_title: 'movie 2', id: 2},
                    {original_title: 'movie 3', id: 3}
                ],
                page: 5,
                total_pages: 10
            };
        },
        getMovieDetails: async function(id) {
            return { original_title: 'title details' };
        },
        reset: function() {
            this.configuration = {};
            this.ready = false;
        },
        configuration: {},
        key: `api_key=12345`,
        ready: false
    }

    return service;
}

export default movieService();