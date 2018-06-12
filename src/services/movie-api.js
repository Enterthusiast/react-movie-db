import env from '../environments/config'

const movieService = function() {

    let service = {
        getConfiguration: async function() {
            let response = {};
            const request = `https://api.themoviedb.org/3/configuration?api_key=${env.MOVIE_DB_API_KEY}`
            try {
                this.configuration = {
                    ...await fetch(request).then(response => response.json())
                };
                response = this.configuration;
                this.ready = true;
            } catch(error) {
                response = error;
            }
            return response;
        },
        configuration: {},
        ready: false
    }

    return service;
}

export default movieService();