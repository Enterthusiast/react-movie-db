import env from '../environments/config'

const movieService = function() {

    let service = {
        requestWrapper: async function(request, initialize) {
            if(this.ready || initialize) {
                let response = {};
                let json = {};
    
                try {
                    response = await fetch(request);
                    json = await response.json();
    
                    if(!response || response.status >= 400 || response.status === 0) {
                        throw(json);
                    } else { 
                        response = json;
                    }
                } catch(error) {
                    response = error;
                }
    
                this.latestResponse = response;
                return response;
            } else {
                throw({message: 'The API is not initialized, run getConfiguration first'})
            }
        },
        getConfiguration: async function() {
            let response = {};

            const request = `https://api.themoviedb.org/3/configuration?${this.key}`
            try {
                this.configuration = await this.requestWrapper(request, true);
                response = this.configuration;
                this.ready = true;
            } catch (error) {
                response = error;
            }
            
            return response;
        },
        getMovieNowPlaying: async function() {
            let response = {};

            const request = `https://api.themoviedb.org/3/movie/now_playing?${this.key}`
            try {
                response = await this.requestWrapper(request);
            } catch(error) {
                response = error;
            }
            return response;
        },
        latestResponse: {},
        configuration: {},
        key: `api_key=${env.MOVIE_DB_API_KEY}`,
        ready: false
    }

    return service;
}

export default movieService();