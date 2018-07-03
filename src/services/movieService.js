import env from '../environments/config'

const movieServiceInitializer = function() {

    let service = {
        requestWrapper: async function(request, initialize) {
            if(!request){
                throw new Error('Missing request');
            }

            if(!this.ready && !initialize){
                throw new Error('The API is not initialized, run getConfiguration first');
            }

            let response = {};
            let json = {};

            response = await fetch(request);

            if(response) {
                json = await response.json();
            }

            if(response.status >= 400 || response.status === 0) {
                throw json;
            }
            
            return json;
        },
        addImagePath(results) {

            if(!results) {
                return results;
            }

            if(!this.ready) {
                return results;
            }

            const imagePathBuilder = (result, resultWithPath) => {
                if(resultWithPath.backdrop_path) {
                    resultWithPath.backdrop_path = `${this.configuration.images.secure_base_url}${this.configuration.images.backdrop_sizes[2]}${result.backdrop_path}`;
                }
                if(resultWithPath.logo_path) {
                    resultWithPath.logo_path = `${this.configuration.images.secure_base_url}${this.configuration.images.logo_sizes[1]}${result.logo_path}`;
                }
                if(resultWithPath.poster_path) {
                    resultWithPath.poster_path = `${this.configuration.images.secure_base_url}${this.configuration.images.poster_sizes[2]}${result.poster_path}`;
                }
                if(resultWithPath.profile_path) {
                    resultWithPath.profile_path = `${this.configuration.images.secure_base_url}${this.configuration.images.profile_sizes[1]}${result.profile_path}`;
                }
                if(resultWithPath.still_path) {
                    resultWithPath.still_path = `${this.configuration.images.secure_base_url}${this.configuration.images.still_sizes[2]}${result.still_path}`;
                }
            }

            if(Array.isArray(results)) {
                results = results.map(result => {
                    let resultWithPath = {
                        ...result
                    }

                    imagePathBuilder(result, resultWithPath);
    
                    return {
                        ...resultWithPath,
                    }
                })
            } else {
                let resultWithPath = {
                    ...results
                }

                imagePathBuilder(results, resultWithPath);

                results = resultWithPath;
            }

            return results;
        },
        getConfiguration: async function() {
            const request = `https://api.themoviedb.org/3/configuration?${this.key}`

            this.configuration = await this.requestWrapper(request, true);
            this.ready = true;
            return this.configuration;
        },
        getMovieNowPlaying: async function(page) {
            if(page && typeof page !== 'number') {
                throw new Error('page must be a number')
            }

            if(!page || page <= 0) {
                page = 1;
            }

            const request = `https://api.themoviedb.org/3/movie/now_playing?${this.key}&page=${page}`

            let response = await this.requestWrapper(request);
            response.results = this.addImagePath(response.results);
            return response;
        },
        getMovieDetails: async function(id) {
            if(typeof id !== 'number') {
                throw new Error('id must be a number')
            }

            const request = `https://api.themoviedb.org/3/movie/${id}?${this.key}&append_to_response=videos,credits`
            
            let response = await this.requestWrapper(request);
            response = this.addImagePath(response);
            return response;
        },
        reset: function() {
            this.configuration = {};
            this.ready = false;
        },
        configuration: {},
        key: `api_key=${env.MOVIE_DB_API_KEY}`,
        ready: false
    }

    // initialize
    // load api configuration
    const serviceInitializer = async function() {
        await service.getConfiguration();
        return service;
    }
          
    return serviceInitializer;
}

export default movieServiceInitializer();