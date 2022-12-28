import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import '../search.css';

class Album extends React.Component {
  state = {
    clickedAlbum: undefined,
    tracks: undefined,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const tracks = await getMusics(id);
    this.setState({
      clickedAlbum: tracks[0],
      tracks: tracks.slice(1, tracks.length),
    });
  }

  render() {
    const { clickedAlbum, tracks } = this.state;
    return (
      <div data-testid="page-album" className="fullPageSearch">
        <div>
          <Header />
        </div>
        <section className="resultContent">
          <section className="searchPage" />
          <section className="searchAlbumPage">
            <div className="albumImg">
              <img
                src={ clickedAlbum ? `${clickedAlbum.artworkUrl100}` : 'VAZIO' }
                alt="fotoAlbum"
                className="cardImg"
              />
            </div>
            <div className="albumInformation">
              <p data-testid="artist-name">
                {clickedAlbum ? `Artista: ${clickedAlbum.artistName}` : 'VAZIO'}
              </p>
              <p data-testid="album-name">
                {clickedAlbum ? `Álbum: ${clickedAlbum.collectionName}` : 'VAZIO'}
              </p>
            </div>
            {
              tracks
                ? tracks.map((track) => (
                  <MusicCard
                    key={ track.trackId }
                    track={ track }
                  />))
                : null
            }
          </section>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
