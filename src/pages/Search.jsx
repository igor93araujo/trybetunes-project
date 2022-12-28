import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingMessage from '../components/LoadingPage';
import '../search.css';

class Search extends React.Component {
  state = {
    itemSearch: '',
    isButtonDisabled: true,
    result: [],
    loading: false,
    search: '',
    albumEncontrado: true,
  };

  verifySearchSize = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { itemSearch } = this.state;
      const minLenght = 2;
      const verifySearch = itemSearch.length < minLenght;
      this.setState({ isButtonDisabled: verifySearch });
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    this.setState(
      { loading: true },
      async () => {
        const { itemSearch } = this.state;
        const search = await searchAlbumsAPI(itemSearch);
        this.setState(
          {
            result: search,
            itemSearch: '',
            loading: false,
            search: itemSearch,
          },
          () => {
            if (search.length === 0) {
              this.setState({ albumEncontrado: false });
            }
          },
        );
      },
    );
  };

  handleKeyPress =(event) => {
    event.preventDefault();
    event.key === "Enter" && this.handleClick();
  }

  render() {
    const {
      isButtonDisabled,
      itemSearch,
      result,
      loading,
      search,
      albumEncontrado,
    } = this.state;

    return (
      <section className="fullPageSearch">
        <div data-testid="page-search">
          <Header />
        </div>
        <section className="searchFullPage">
          <section className="searchPage">
            <form>
              <input
                type="text"
                name="itemSearch"
                id="itemSearch"
                value={ itemSearch }
                data-testid="search-artist-input"
                onChange={ this.verifySearchSize }
                placeholder="Digite o nome do artista"
              />
            </form>
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ isButtonDisabled }
              onClick={ this.handleClick }
              onKeyUp={ (event) => this.handleKeyPress(event)}
            >
              Pesquisar
            </button>
          </section>
          <section className="searchResult">
            <div>
              <p className="album">{`Resultado de álbuns de: ${search}`}</p>
            </div>
            <div className="searchSongs">
              {loading ? (<LoadingMessage />)
                : (
                  result.map(({
                    collectionName, collectionId, artworkUrl100, artistName,
                  }) => (
                    <section key={ collectionId } className="musicCard">
                      <div key={ collectionId }>
                        <Link
                          to={ `/album/${collectionId}` }
                          className="cardColletionLink"
                          data-testid={ `link-to-album-${collectionId}` }
                        >
                          <img
                            src={ artworkUrl100 }
                            alt={ collectionName }
                            className="cardImg"
                          />
                        </Link>
                        <div className="cardInfo">
                          <p
                            key={ collectionId }
                          >
                            {collectionName}
                          </p>
                          <p className="cardArtName">{artistName}</p>
                        </div>
                        <Link
                          to={ `/album/${collectionId}` }
                          className="cardColletionLink"
                          data-testid={ `link-to-album-${collectionId}` }
                        >
                          Ir para o album
                        </Link>
                      </div>
                    </section>
                  ))
                ) }
            </div>
            {albumEncontrado ? null : (<p>Nenhum álbum foi encontrado</p>) }
          </section>
        </section>
      </section>
    );
  }
}

export default Search;
