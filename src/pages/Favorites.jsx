import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import LoadingMessage from '../components/LoadingPage';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import '../search.css';
import '../favorites.css';

class Favorites extends React.Component {
  state = {
    loading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    const getSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs: getSongs,
    });

    this.setState({
      loading: false,
    });
  }

  removeFavSongs = async (track) => {
    this.setState({
      loading: true,
    });

    await removeSong(track);

    const getSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs: getSongs,
      loading: false,
    });
  };

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <section className="fullPageSearch">
        <div data-testid="page-favorites">
          <Header />
        </div>
        <section>
          <section className="searchPage" />
          <div className="favoriteSongsPage">
            {
              loading ? <LoadingMessage /> : null
            }
            <div>
              {
                favoriteSongs.map((track) => (
                  <MusicCard
                    key={ track.trackId }
                    track={ track }
                    removeCard={ () => this.removeFavSongs(track) }
                  />
                ))
              }
            </div>
          </div>
        </section>
      </section>
    );
  }
}

Favorites.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default Favorites;
