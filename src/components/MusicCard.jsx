import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../app.css';
import '../search.css';
import LoadingMessage from './LoadingPage';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    favorite: false,
  };

  async componentDidMount() {
    this.setState({
      favorite: await this.recoveryAlbums(),
    });
  }

  handleChange = async ({ target: { checked } }) => {
    const { track } = this.props;
    this.setState({
      loading: true,
    });

    if (checked) {
      await addSong(track);
    } else {
      await removeSong(track);
    }
    this.setState({
      loading: false,
      favorite: checked,
    });
  };

  recoveryAlbums = async () => { // Função para verificar se o trackId da musica marcada é igual ao trackid da musica salva no array
    const { track: { trackId } } = this.props;
    const savedSongs = await getFavoriteSongs();
    return savedSongs.map((song) => song.trackId).includes(trackId);
  };

  render() {
    const { track: {
      trackId,
      trackName,
      previewUrl,
    }, removeCard } = this.props;
    const { loading, favorite } = this.state;
    return (
      <div className="musicPlayer">
          <p className="trackName">{ trackName }</p>
        <div className="trackId">
          <p>{ trackId }</p>
        </div>
        <div className="audioTag">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
          <label htmlFor="favoriteSong" className="inputDiv">
            <p>Favorita</p>
            <input
              type="checkbox"
              name="favoriteSong"
              id="favoriteSong"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ removeCard || this.handleChange }
              checked={ favorite }
            />
          </label>
        <div>
          {
            loading ? <LoadingMessage /> : null
          }
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
  removeCard: PropTypes.func.isRequired,
};

export default MusicCard;
