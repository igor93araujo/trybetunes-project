import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GiMusicSpell } from 'react-icons/gi';
import { BsSearch, BsPersonLinesFill } from 'react-icons/bs';
import { TbStar } from 'react-icons/tb';
import { getUser } from '../services/userAPI';
import LoadingMessage from './LoadingPage';
import '../header.css';

class Header extends Component {
  state = {
    loading: true,
    id: [],
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const getUserName = await getUser();
      this.setState({
        loading: false,
        id: getUserName,
      });
    });
  }

  render() {
    const {
      loading,
      id,
    } = this.state;

    if (loading) return <LoadingMessage />;
    return (
      <section className="header">
        <div className="header-title">
        <p>
          Trybe Tunes
          {' '}
          <GiMusicSpell />
        </p>
        </div>
        <section>
          <nav>
            <Link
              to="/search"
              data-testid="link-to-search"
              className="link"
            >
              <BsSearch />
              Pesquisa
            </Link>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
              className="link"
            >
              <TbStar />
              Favoritas
            </Link>
            <Link
              to="/profile"
              data-testid="link-to-profile"
              className="link"
            >
              <BsPersonLinesFill />
              Perfil
            </Link>
          </nav>
        </section>
        <div data-testid="header-component" className="headerName">
          <p data-testid="header-user-name">{id.name}</p>
          <Link
            to="/"
            className="link"
          >
            Sair
          </Link>
        </div>
      </section>
    );
  }
}

export default Header;
