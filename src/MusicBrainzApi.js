import Promise from 'bluebird';

const coverArtArchiveHost = "http://coverartarchive.org";
const musicbrainzHost = "http://musicbrainz.org";

export const fetchArtist = (mbidArtist) => {
    return fetch(musicbrainzHost + "/ws/2/artist/" + mbidArtist + "?fmt=json")
        .then(response => response.json());
};

export const fetchArtists = (mbidArtists) => {
    return Promise.map(mbidArtists, mbid => {
        return fetchArtist(mbid);
    });
}

export const fetchAlbum = (mbidAlbum) => {
    return fetch(`${musicbrainzHost}/ws/2/release-group/${mbidAlbum}?inc=artist-credits&fmt=json`)
        .then(response => response.json());
};

export const fetchAlbums = (mbidAlbums) => {
    return Promise.map(mbidAlbums, mbid => {
        return fetchAlbum(mbid);
    });
};

export const getAlbumArtUrl = (mbidAlbum) => {
    return coverArtArchiveHost + "/release-group/" + mbidAlbum + "/front.jpg";
};

export const fetchSearch = (searchTerm) => {
    return fetch(`${musicbrainzHost}/ws/2/release-group/?query=release%3A${searchTerm}&fmt=json`)
        .then(response => response.json());
}
