import movieService from '../movieService';

describe('requestWrapper', () => {
    beforeEach(() => {
        movieService.reset();
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
        fetch.mockResponseOnce(JSON.stringify(), { status: 200 });
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

describe('getConfiguration', () => {
    beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify({ data: '12345' }, { status: 300 }));
        movieService.reset();
    })

    it('populate movieService.configuration', async () => {
        await movieService.getConfiguration();
        // expect(movieService.ready).toBe(true);
        // expect(movieService.configuration).toEqual({ url: 'localhost' });
    });

})