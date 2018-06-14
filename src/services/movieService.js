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
    
                    this.latestResponse = response;
    
                    if(!response || response.status >= 400 || response.status === 0) {
                        throw new Error(json);
                    } else { 
                        return json;
                    }
                } catch(error) {
                    throw new Error(error);
                }
            } else {
                throw new Error({message: 'The API is not initialized, run getConfiguration first'});
            }
        },
        addImagePath(results) {

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
            
            if(this.ready && results) {
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
            }

            return results;
        },
        getConfiguration: async function() {
            const request = `https://api.themoviedb.org/3/configuration?${this.key}`
            try {
                this.configuration = await this.requestWrapper(request, true);
                this.ready = true;
                return this.configuration;
            } catch (error) {
                throw new Error(error);
            }
        },
        getMovieNowPlaying: async function() {
            const request = `https://api.themoviedb.org/3/movie/now_playing?${this.key}`
            try {
                let response = await this.requestWrapper(request);
                response.results = this.addImagePath(response.results);
                return response;
            } catch(error) {
                throw new Error(error);
            }
        },
        getMovieDetails: async function(id) {
            const request = `https://api.themoviedb.org/3/movie/${id}?${this.key}&append_to_response=videos,credits`
            try {
                let response = await this.requestWrapper(request);
                response = this.addImagePath(response);
                return response;
            } catch(error) {
                throw new Error(error);
            }
        },
        latestResponse: {},
        configuration: {},
        key: `api_key=${env.MOVIE_DB_API_KEY}`,
        ready: false
    }

    return service;
}

export default movieService();