import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import { ProgressBar } from 'react-materialize';
import MovieMoreInfo from '../movieMoreInfo';

let props = {};
beforeEach(() => {
  props = {
    apiStatus: {
      apiLoadingStatus: false,
    },
    movieDetails: {},
  };
});

describe('render', () => {
  it('shallow renders without crashing', () => {
    shallow(<MovieMoreInfo {...props} />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MovieMoreInfo {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('title', () => {
  it('show a progress bar if apiLoadingStatus is true', () => {
    props.apiStatus.apiLoadingStatus = true;

    const wrapper = mount(<MovieMoreInfo {...props} />);
    expect(wrapper).toContainReact(<ProgressBar />);
  });

  it('show modal content if apiLoadingStatus is false', () => {
    const wrapper = mount(<MovieMoreInfo {...props} />);
    const selector = '.App-modal-content';
    expect(wrapper.find(selector)).toExist();
  });
});

describe('release_date year', () => {
  it('show release date year if truthy', () => {
    props.movieDetails = { release_date: '1984-10-31' };

    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-modal-movie-date';
    expect(wrapper.find(selector)).toHaveText('(1984)');
  });
});

describe('vote', () => {
  it('show a # percentage if vote_average and vote_count are falsy', () => {
    props.movieDetails = { vote_average: 0, vote_count: 0 };

    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-movieDetails-vote';
    expect(wrapper.find(selector)).toHaveText('#');
  });
  it('show a percentage if vote_average and vote_count are truthy', () => {
    props.movieDetails = { vote_average: 6.6, vote_count: 6 };

    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-movieDetails-vote';
    expect(wrapper.find(selector)).toHaveText('66%');
  });
});

describe('release_date full', () => {
  it('show release date if truthy', () => {
    props.movieDetails = { release_date: '1984-10-31' };

    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-movieDetails-release';
    expect(wrapper.find(selector)).toHaveText('1984-10-31');
  });
  it('show None if falsy', () => {
    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-movieDetails-release';
    expect(wrapper.find(selector)).toHaveText('None');
  });
});

describe('runtime', () => {
  it('show runtime if truthy', () => {
    props.movieDetails = { runtime: '60' };

    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-movieDetails-runtime';
    expect(wrapper.find(selector)).toHaveText('60 minutes');
  });
  it('show Unknown if falsy', () => {
    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-movieDetails-runtime';
    expect(wrapper.find(selector)).toHaveText('Unknown');
  });
});

describe('videos', () => {
  it('show first 3 trailers with youtube links if any', () => {
    const results = [{
      id: '5a254edec3a3680b9d0cf77f',
      iso_639_1: 'en',
      iso_3166_1: 'US',
      key: '70DUmBQytrc',
      name: 'JURASSIC WORLD 2: Fallen Kingdom Teaser Trailer (2018)',
      site: 'YouTube',
      size: 1080,
      type: 'Teaser',
    }, {
      id: '5a268f68c3a3680b960ec51a',
      iso_639_1: 'en',
      iso_3166_1: 'US',
      key: '7uwWLP9JVeQ',
      name: 'JURASSIC WORLD 2: Fallen Kingdom Trailer Teaser 2 (2018)',
      site: 'YouTube',
      size: 1080,
      type: 'Teaser',
    }, {
      id: '5a2905f0925141032c112f83',
      iso_639_1: 'en',
      iso_3166_1: 'US',
      key: 'qEMjAf_Bf-g',
      name: 'Jurassic World: Fallen Kingdom - Watch The Trailer Now! (Go Behind The Scenes) (HD)',
      site: 'YouTube',
      size: 720,
      type: 'Teaser',
    }, {
      id: '5a2ba7dec3a3680b9a146c87',
      iso_639_1: 'en',
      iso_3166_1: 'US',
      key: 'vn9mMeWcgoM',
      name: 'Jurassic World: Fallen Kingdom - Official Trailer [HD]',
      site: 'DailyMotion',
      size: 1080,
      type: 'Trailer',
    }, {
      id: '5a2ba7dec3a3680b9a146c87',
      iso_639_1: 'en',
      iso_3166_1: 'US',
      key: 'vn9mMeWcgoM',
      name: 'Jurassic World: Fallen Kingdom - Official Trailer [HD]',
      site: 'YouTube',
      size: 1080,
      type: 'Trailer',
    }, {
      id: '5a77b35a0e0a265994009087',
      iso_639_1: 'en',
      iso_3166_1: 'US',
      key: 'NooW_RbfdWI',
      name: 'Jurassic World: Fallen Kingdom - Official Trailer #2 [HD]',
      site: 'YouTube',
      size: 1080,
      type: 'Trailer',
    }, {
      id: '5ad83d7ec3a368718f00e11c',
      iso_639_1: 'en',
      iso_3166_1: 'US',
      key: '1FJD7jZqZEk',
      name: 'Jurassic World: Fallen Kingdom - Final Trailer [HD]',
      site: 'YouTube',
      size: 1080,
      type: 'Trailer',
    }, {
      id: '5ae44e38c3a368714f005d77',
      iso_639_1: 'en',
      iso_3166_1: 'US',
      key: 'fLXqJhWUdCs',
      name: 'Jurassic World: Fallen Kingdom| Movie Trailer | Release Date South Africa: 8 June 2018',
      site: 'YouTube',
      size: 1080,
      type: 'Trailer',
    }];
    props.movieDetails = { videos: { results } };
    const wrapper = shallow(<MovieMoreInfo {...props} />);

    const selector = '.App-modal-videos';
    const html = '<span class="App-modal-videos App-secondary-text-color"><span><a href="https://youtube.com/watch?v=vn9mMeWcgoM" target="_blank" rel="noopener noreferrer">Jurassic World: Fallen Kingdom - Official Trailer [HD]</a></span><span>, <a href="https://youtube.com/watch?v=NooW_RbfdWI" target="_blank" rel="noopener noreferrer">Jurassic World: Fallen Kingdom - Official Trailer #2 [HD]</a></span><span>, <a href="https://youtube.com/watch?v=1FJD7jZqZEk" target="_blank" rel="noopener noreferrer">Jurassic World: Fallen Kingdom - Final Trailer [HD]</a></span></span>';
    expect(wrapper.find(selector)).toHaveHTML(html);
  });
  it('show None if empty results', () => {
    const results = [];
    props.movieDetails = { videos: { results } };

    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-modal-videos';
    expect(wrapper.find(selector)).toHaveText('None');
  });
});

describe('genres', () => {
  it('show a list of genres if any', () => {
    const genres = [{
      id: 28,
      name: 'Action',
    }, {
      id: 12,
      name: 'Adventure',
    }, {
      id: 878,
      name: 'Science Fiction',
    }];
    props.movieDetails = { genres };

    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-modal-genres';
    const html = '<span class="App-modal-genres App-secondary-text-color"><span>Action</span><span>, Adventure</span><span>, Science Fiction</span></span>';
    expect(wrapper.find(selector)).toHaveHTML(html);
  });
  it('show None if empty genres', () => {
    const genres = [];
    props.movieDetails = { genres };

    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-modal-genres';
    expect(wrapper.find(selector)).toHaveText('None');
  });
});

describe('homepage', () => {
  it('show Official Website link if truthy', () => {
    props.movieDetails = { homepage: 'google.com' };

    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-movieDetails-homepage';
    expect(wrapper.find(selector)).toHaveText('Official Website');
  });
  it('show No official link if falsy', () => {
    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-movieDetails-homepage';
    expect(wrapper.find(selector)).toHaveText('No official link');
  });
});

describe('imdb', () => {
  it('show Imdb link if truthy', () => {
    props.movieDetails = { imdb_id: '1' };

    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-movieDetails-imdb';
    expect(wrapper.find(selector)).toHaveText('Imdb');
  });
  it('show No imdb link if falsy', () => {
    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-movieDetails-imdb';
    expect(wrapper.find(selector)).toHaveText('No imdb link');
  });
});

describe('revenue', () => {
  it('show revenue if any', () => {
    const revenue = 3000000000;
    props.movieDetails = { revenue };

    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-modal-revenue';
    expect(wrapper.find(selector)).toHaveText('$3,000,000,000');
  });
  it('show Unkown if revenue is falsy', () => {
    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-modal-revenue';
    expect(wrapper.find(selector)).toHaveText('Unknown');
  });
});

describe('overview', () => {
  it('show overview if any', () => {
    const overview = 'I am an overview';
    props.movieDetails = { overview };

    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-modal-overview';
    expect(wrapper.find(selector)).toHaveText('I am an overview');
  });
  it('show nothing if overview is falsy', () => {
    const wrapper = shallow(<MovieMoreInfo {...props} />);
    const selector = '.App-modal-overview';
    expect(wrapper.find(selector)).not.toExist();
  });
});

describe('cast', () => {
  it('show top five cast if any', () => {
    const cast = [{
      cast_id: 2,
      character: 'Owen Grady',
      credit_id: '55b239bac3a3682ff900f241',
      gender: 2,
      id: 73457,
      name: 'Chris Pratt',
      order: 0,
      profile_path: '/n4DD1AYU7WEMNPLga1TxqnHivn1.jpg',
    }, {
      cast_id: 3,
      character: 'Claire Dearing',
      credit_id: '55b239cfc3a368246c00a2df',
      gender: 1,
      id: 18997,
      name: 'Bryce Dallas Howard',
      order: 1,
      profile_path: '/taWmUeEJvR4j14nydUnVYmhDadT.jpg',
    }, {
      cast_id: 6,
      character: 'Eli Mills',
      credit_id: '58411470c3a36865c60034dc',
      gender: 2,
      id: 28847,
      name: 'Rafe Spall',
      order: 2,
      profile_path: '/7ucsDEWvcMU4SpxtZEaYErPpXHh.jpg',
    }, {
      cast_id: 8,
      character: 'Franklin Webb',
      credit_id: '58411483c3a36865b6003f8d',
      gender: 2,
      id: 1029934,
      name: 'Justice Smith',
      order: 3,
      profile_path: '/9G8pKfvfbqs5fmRo0VtlHqxdVBQ.jpg',
    }, {
      cast_id: 9,
      character: 'Dr. Zia Rodriguez',
      credit_id: '5886948c92514113620048df',
      gender: 1,
      id: 1257819,
      name: 'Daniella Pineda',
      order: 4,
      profile_path: '/qWDRZmVwhQs0oSx05srxABtBrSU.jpg',
    }, {
      cast_id: 19,
      character: 'Sir Benjamin Lockwood',
      credit_id: '5a1757da9251410339006d99',
      gender: 2,
      id: 2505,
      name: 'James Cromwell',
      order: 5,
      profile_path: '/f9HU6zS2K2DCRt2WoJBK61ElqPJ.jpg',
    }, {
      cast_id: 195,
      character: 'Maisie Lockwood',
      credit_id: '5b17d77c0e0a262de2022cb5',
      gender: 0,
      id: 2058708,
      name: 'Isabella Sermon',
      order: 6,
      profile_path: '/xkEb2F825cynGmzhxW4bVO3hwUA.jpg',
    }, {
      cast_id: 7,
      character: 'Gunnar Eversoll',
      credit_id: '5841147d9251417d50003ce3',
      gender: 2,
      id: 13014,
      name: 'Toby Jones',
      order: 7,
      profile_path: '/9FUBqeLZZGz8Jmk9B18LODG6aky.jpg',
    }, {
      cast_id: 11,
      character: 'Ken Wheatley',
      credit_id: '589ffb2fc3a3680306001634',
      gender: 2,
      id: 15854,
      name: 'Ted Levine',
      order: 8,
      profile_path: '/7O3vgqgicfNeGr3leC0qB074fjX.jpg',
    }, {
      cast_id: 14,
      character: 'Dr. Henry Wu',
      credit_id: '5994e4fd92514107ba00422e',
      gender: 2,
      id: 14592,
      name: 'BD Wong',
      order: 9,
      profile_path: '/w7Hs9m6ocS2qlibvrLOvmyCKbAN.jpg',
    }, {
      cast_id: 20,
      character: 'Iris',
      credit_id: '5a17581a0e0a264cd0007129',
      gender: 1,
      id: 400,
      name: 'Geraldine Chaplin',
      order: 10,
      profile_path: '/gr5UwM0nA76SCWDSCXjjSSxclvf.jpg',
    }, {
      cast_id: 12,
      character: 'Dr. Ian Malcolm',
      credit_id: '590005d6c3a368101e0049f7',
      gender: 2,
      id: 4785,
      name: 'Jeff Goldblum',
      order: 11,
      profile_path: '/ceSmXnD0FUSTaq2WIrnZu9caL0t.jpg',
    }, {
      cast_id: 15,
      character: 'InGen Contractor',
      credit_id: '5994e50fc3a36856bd0044e3',
      gender: 2,
      id: 20582,
      name: 'Michael Papajohn',
      order: 12,
      profile_path: '/9nVHCoYxCpGh9pO00xp7SybWd7b.jpg',
    }, {
      cast_id: 16,
      character: 'Jack',
      credit_id: '5994e51e925141079a004240',
      gender: 2,
      id: 589652,
      name: 'Robert Emms',
      order: 13,
      profile_path: '/4wdONknsZLWHpH2NSyk0FyPPO8A.jpg',
    }, {
      cast_id: 17,
      character: 'Lead Mercenary',
      credit_id: '5994e52a92514107c8004373',
      gender: 0,
      id: 1083177,
      name: 'Charlie Rawes',
      order: 14,
      profile_path: null,
    }, {
      cast_id: 18,
      character: 'Russian Bodyguard',
      credit_id: '5a1757750e0a264cca007095',
      gender: 2,
      id: 1481440,
      name: 'Daniel Stisen',
      order: 15,
      profile_path: '/jhyIFfBnM5nLhHdpFiGIW6qk9x5.jpg',
    }, {
      cast_id: 21,
      character: '',
      credit_id: '5a1758c89251410330006cd1',
      gender: 2,
      id: 1654736,
      name: 'Kamil Lemieszewski',
      order: 16,
      profile_path: '/lYd4BVmgQofkLVzDPzKE7RJzjNC.jpg',
    }];
    props.movieDetails = { credits: { cast } };
    const wrapper = mount(<MovieMoreInfo {...props} />);
    const selector = '.App-modal-cast';
    const html = '<ul class="App-modal-cast"><li><b>Chris Pratt</b> (Owen Grady)</li><li><b>Bryce Dallas Howard</b> (Claire Dearing)</li><li><b>Rafe Spall</b> (Eli Mills)</li><li><b>Justice Smith</b> (Franklin Webb)</li><li><b>Daniella Pineda</b> (Dr. Zia Rodriguez)</li></ul>';
    expect(wrapper.find(selector)).toHaveHTML(html);
  });
  it('show nothing if empty cast', () => {
    const cast = [];
    const wrapper = mount(<MovieMoreInfo {...props} />);
    const selector = '.App-modal-cast';
    expect(wrapper.find(selector)).not.toExist();
  });
});
