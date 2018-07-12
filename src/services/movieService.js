import env from '../environments/config';

const movieServiceInitializer = function () {
  if (window
    && (!window.ReactMovieDb
        || !window.ReactMovieDb.services
        || !window.ReactMovieDb.services.movieService)) {
    const service = {
      async requestWrapper(request, initialize) {
        if (!request) {
          throw new Error('Missing request');
        }

        if (!this.ready && !initialize) {
          throw new Error('The API is not initialized, run getConfiguration first');
        }

        let response = {};
        let json = {};

        response = await fetch(request);

        if (response) {
          json = await response.json();
        }

        if (response.status >= 400 || response.status === 0) {
          throw json;
        }

        return json;
      },
      addImagePath(results) {
        if (!results) {
          return results;
        }

        if (!this.ready) {
          return results;
        }

        const imagePathBuilder = (result) => {
          const buildedPath = {};

          if (result.backdrop_path) {
            buildedPath.backdrop_path = `${this.configuration.images.secure_base_url}${this.configuration.images.backdrop_sizes[2]}${result.backdrop_path}`;
          }
          if (result.logo_path) {
            buildedPath.logo_path = `${this.configuration.images.secure_base_url}${this.configuration.images.logo_sizes[1]}${result.logo_path}`;
          }
          if (result.poster_path) {
            buildedPath.poster_path = `${this.configuration.images.secure_base_url}${this.configuration.images.poster_sizes[2]}${result.poster_path}`;
          }
          if (result.profile_path) {
            buildedPath.profile_path = `${this.configuration.images.secure_base_url}${this.configuration.images.profile_sizes[1]}${result.profile_path}`;
          }
          if (result.still_path) {
            buildedPath.still_path = `${this.configuration.images.secure_base_url}${this.configuration.images.still_sizes[2]}${result.still_path}`;
          }

          return buildedPath;
        };

        let updatedResults;
        if (Array.isArray(results)) {
          updatedResults = results.map(result => ({ ...result, ...imagePathBuilder(result) }));
        } else {
          updatedResults = { ...results, ...imagePathBuilder(results) };
        }

        return updatedResults;
      },
      async getConfiguration() {
        const request = `https://api.themoviedb.org/3/configuration?${this.key}`;

        this.configuration = await this.requestWrapper(request, true);
        this.ready = true;
        return this.configuration;
      },
      async getMovieNowPlaying(page) {
        if (page && typeof page !== 'number') {
          throw new Error('page must be a number');
        }

        let requestPage = page;

        if (!page || page <= 0) {
          requestPage = 1;
        }

        const request = `https://api.themoviedb.org/3/movie/now_playing?${this.key}&page=${requestPage}`;

        const response = await this.requestWrapper(request);
        response.results = this.addImagePath(response.results);
        return response;
      },
      async getMovieDetails(id) {
        if (typeof id !== 'number') {
          throw new Error('id must be a number');
        }

        const request = `https://api.themoviedb.org/3/movie/${id}?${this.key}&append_to_response=videos,credits`;

        let response = await this.requestWrapper(request);
        response = this.addImagePath(response);
        return response;
      },
      reset() {
        this.configuration = {};
        this.ready = false;
      },
      configuration: {},
      key: `api_key=${env.MOVIE_DB_API_KEY}`,
      ready: false,
    };

    // Add the service to the global variable
    // making it accessible easily from anywhere
    window.reactMovieDb = window.reactMovieDb
      ? {
        ...window.reactMovieDb,
        services: {
          movieService: service,
        },
      }
      : {
        services: {
          movieService: service,
        },
      };
  }

  // initialize
  // load api configuration
  const serviceInitializer = async function (skip) {
    const service = window.reactMovieDb.services.movieService;
    if (skip || service.ready) {
      return service;
    }

    await service.getConfiguration();
    return service;
  };

  return serviceInitializer;
};

export default movieServiceInitializer();
