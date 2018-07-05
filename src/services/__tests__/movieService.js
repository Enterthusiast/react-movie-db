import movieServiceInitializer from '../movieService';

let movieService = {};

describe('requestWrapper', () => {
    beforeEach(async () => {
        movieService = await movieServiceInitializer(true);
    })

    it('fails with empty request', async () => {
        let failed = false;
        try {
            await movieService.requestWrapper();
        } catch (e) {
            failed = true;
        }
        expect(failed).toBe(true);
    });
    it('fails with request and movieService.ready false (default) and initialize falsy', async () => {
        let failed = false;
        try {
            await movieService.requestWrapper('willNotBeUsed', undefined);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBe(true);
    });
    it('succeed with movieService.ready true', async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });
        movieService.ready = true;
        let failed = false;
        try {
            await movieService.requestWrapper('request200');
        } catch (e) {
            failed = true;
        }
        expect(failed).toBe(false);
    });
    it('succeed with initialize true', async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });
        movieService.ready = true;
        let failed = false;
        try {
            await movieService.requestWrapper('request200', true);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBe(false);
    });
    it('fails with status >= 400', async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        let failed = false;
        try {
            await movieService.requestWrapper('request400', true);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBe(true);
    });
    it('fails with status === 0', async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 0 });
        let failed = false;
        try {
            await movieService.requestWrapper('request0', true);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBe(true);
    });
    it('succeed with status >= 200', async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });
        let failed = false;
        try {
            await movieService.requestWrapper('request200', true);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBe(false);
    });
})

describe('addImagePath', () => {

    beforeEach(() => {
        movieService.reset();
    })

    it('return unaltered result if result is falsy', async () => {
        expect(movieService.addImagePath(undefined)).toEqual(undefined);
    });

    it('return unaltered result if movieService.ready === false', async () => {
        const mockResult = { backdrop_path: '/iambackdrop' };
        expect(movieService.addImagePath(mockResult)).toEqual(mockResult);
    });

    it('return array of objects with built paths if given an array of objects with known image paths', async () => {
        movieService.ready = true;
        movieService.configuration = {
            "images": {
              "base_url": "http://image.tmdb.org/t/p/",
              "secure_base_url": "https://image.tmdb.org/t/p/",
              "backdrop_sizes": [
                "w300",
                "w780",
                "w1280",
                "original"
              ],
              "logo_sizes": [
                "w45",
                "w92",
                "w154",
                "w185",
                "w300",
                "w500",
                "original"
              ],
              "poster_sizes": [
                "w92",
                "w154",
                "w185",
                "w342",
                "w500",
                "w780",
                "original"
              ],
              "profile_sizes": [
                "w45",
                "w185",
                "h632",
                "original"
              ],
              "still_sizes": [
                "w92",
                "w185",
                "w300",
                "original"
              ]
            },
            "change_keys": []
        }
        const mockResult = [
            { 
                name: "object1",
                backdrop_path: '/iambackdrop',
                logo_path: '/iamlogo',
                poster_path: '/iamposter',
                profile_path: '/iamprofile',
                still_path: '/iamstill',
            },
            { 
                name: "object2",
                backdrop_path: '/iambackdrop',
                logo_path: '/iamlogo',
                poster_path: '/iamposter',
                profile_path: '/iamprofile',
                still_path: '/iamstill',
            },
        ];
        const mockResultExpected = [
            {
                backdrop_path: "https://image.tmdb.org/t/p/w1280/iambackdrop",
                logo_path: "https://image.tmdb.org/t/p/w92/iamlogo",
                name: "object1",
                poster_path: "https://image.tmdb.org/t/p/w185/iamposter",
                profile_path: "https://image.tmdb.org/t/p/w185/iamprofile",
                still_path: "https://image.tmdb.org/t/p/w300/iamstill"
            },
            {
                backdrop_path: "https://image.tmdb.org/t/p/w1280/iambackdrop",
                logo_path: "https://image.tmdb.org/t/p/w92/iamlogo",
                name: "object2",
                poster_path: "https://image.tmdb.org/t/p/w185/iamposter",
                profile_path: "https://image.tmdb.org/t/p/w185/iamprofile",
                still_path: "https://image.tmdb.org/t/p/w300/iamstill"
            }
        ];
        expect(movieService.addImagePath(mockResult)).toEqual(mockResultExpected);
    });

    it('return object with built paths if given an object with known image paths', async () => {
        movieService.ready = true;
        movieService.configuration = {
            "images": {
              "base_url": "http://image.tmdb.org/t/p/",
              "secure_base_url": "https://image.tmdb.org/t/p/",
              "backdrop_sizes": [
                "w300",
                "w780",
                "w1280",
                "original"
              ],
              "logo_sizes": [
                "w45",
                "w92",
                "w154",
                "w185",
                "w300",
                "w500",
                "original"
              ],
              "poster_sizes": [
                "w92",
                "w154",
                "w185",
                "w342",
                "w500",
                "w780",
                "original"
              ],
              "profile_sizes": [
                "w45",
                "w185",
                "h632",
                "original"
              ],
              "still_sizes": [
                "w92",
                "w185",
                "w300",
                "original"
              ]
            },
            "change_keys": []
        }
        const mockResult = { 
            backdrop_path: '/iambackdrop',
            logo_path: '/iamlogo',
            poster_path: '/iamposter',
            profile_path: '/iamprofile',
            still_path: '/iamstill',
        };
        const mockResultExpected = {
            backdrop_path: "https://image.tmdb.org/t/p/w1280/iambackdrop",
            logo_path: "https://image.tmdb.org/t/p/w92/iamlogo",
            poster_path: "https://image.tmdb.org/t/p/w185/iamposter",
            profile_path: "https://image.tmdb.org/t/p/w185/iamprofile",
            still_path: "https://image.tmdb.org/t/p/w300/iamstill"
        };
        expect(movieService.addImagePath(mockResult)).toEqual(mockResultExpected);
    });

})

describe('getConfiguration', () => {
    beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify({ url: 'localhost' }), { status: 200 });
        movieService.reset();
    })

    it('populate movieService.configuration', async () => {
        await movieService.getConfiguration();
        expect(movieService.ready).toBe(true);
        expect(movieService.configuration).toEqual({ url: 'localhost' });
    });

})

describe('getMovieNowPlaying', () => {
    beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });
        movieService.reset();
    })

    it('fails with page !== undefined and page !== number', async () => {
        movieService.ready = true;
        let failed = false;
        try {
            await movieService.getMovieNowPlaying('iamastring');
        } catch (e) {
            failed = true;
        }
        expect(failed).toBe(true);
    });

})

describe('getMovieDetails', () => {
    beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });
        movieService.reset();
    })

    it('fails with id !== number', async () => {
        let failed = false;
        try {
            await movieService.getMovieDetails('iamastring');
        } catch (e) {
            failed = true;
        }
        expect(failed).toBe(true);
    });

})

describe('reset', () => {
    beforeEach(() => {
        movieService.reset();
        movieService.configuration = { iam: "not empty" };
        movieService.ready = true;
    })

    it('fails if movieService is not back to initial state', async () => {
        movieService.reset();
        expect(movieService.configuration).toEqual({});
        expect(movieService.ready).toBe(false);
    });

})