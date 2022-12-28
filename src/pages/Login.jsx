import React from 'react';
import PropTypes from 'prop-types';
import { GiMusicSpell } from 'react-icons/gi';
import { createUser } from '../services/userAPI';
import LoadingMessage from '../components/LoadingPage';
import '../app.css'

class Login extends React.Component {
  state = {
    loginName: '',
    isButtonDisabled: true,
    loading: false,
  };

  verifyNameSize = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { loginName } = this.state;
      const minLenght = 3;
      const verifyName = loginName.length < minLenght;
      this.setState({ isButtonDisabled: verifyName });
    });
  };

  handleClick = () => {
    const { history } = this.props;
    this.setState(
      { loading: true },
      async () => {
        const { loginName } = this.state;
        await createUser({ name: loginName });
        return history.push('/search');
      },
    );
  };

  render() {
    const {
      isButtonDisabled,
      loginName,
      loading,
    } = this.state;

    if (loading) return <LoadingMessage />;
    return (
      <div data-testid="page-login" className="appLogin">
        <section className="content">
          <p>
            Trybe Tunes
            {' '}
            <GiMusicSpell />
          </p>
          <form>
            <label htmlFor="loginName">
              <input
                type="text"
                name="loginName"
                id="loginName"
                value={ loginName }
                data-testid="login-name-input"
                onChange={ this.verifyNameSize }
              />
            </label>
          </form>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
