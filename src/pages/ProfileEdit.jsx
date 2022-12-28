import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import LoadingMessage from '../components/LoadingPage';
import '../profile.css';

class ProfileEdit extends React.Component {
  state = {
    isButtonDisabled: true,
    userName: '',
    userEmail: '',
    userDescription: '',
    userImage: '',
    loading: false,
  };

  async componentDidMount() {
    const userInfo = await getUser();
    const { name, email, description, image } = userInfo;
    this.setState({
      userName: name,
      userEmail: email,
      userDescription: description,
      userImage: image,
    });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState(
      { [name]: value },
      this.verifyUserInfos,
    );
  };

  handleClick = () => {
    const { history } = this.props;
    this.setState(
      { loading: true },
      async () => {
        const {
          userName,
          userEmail,
          userDescription,
          userImage } = this.state;

        await updateUser({
          name: userName,
          email: userEmail,
          image: userImage,
          description: userDescription,
        });
        return history.push('/profile');
      },
    );
  };

  verifyUserInfos = () => {
    const {
      userName,
      userEmail,
      userDescription,
      userImage } = this.state;

    const validName = userName.length > 0;
    const validEmail = userEmail.length > 0;
    const validDesc = userDescription.length > 0;
    const validImg = userImage.length > 0;

    this.setState({
      isButtonDisabled: !(validName && validDesc && validEmail && validImg),
    });
  };

  render() {
    const {
      isButtonDisabled,
      userName,
      userEmail,
      userDescription,
      userImage,
      loading } = this.state;

    return (
      <section className="fullPageSearch">
        <div data-testid="page-profile-edit">
          <Header />
        </div>
        {
          loading && <LoadingMessage />
        }
        <section className="profileEditPage">
          <div className="imageEdit">
            <img
              type="image"
              src={ userImage }
              alt={ userName }
              className="profileImage"
              />
              </div>
            <input
              data-testid="edit-input-image"
              name="userImage"
              id="userImage"
              value={ userImage }
              type="text"
              onChange={ this.handleChange }
              placeholder="Link para nova imagem"
            />
          <form>
            <div>
              <spam>Seu nome </spam>
              <input
                type="userName"
                name="userName"
                id="userName"
                value={ userName }
                data-testid="edit-input-name"
                placeholder="nome"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <spam>Seu email </spam>
              <input
                type="userEmail"
                name="userEmail"
                id="userEmail"
                value={ userEmail }
                data-testid="edit-input-email"
                placeholder="nome@test.com"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <spam>Fale sobre você </spam>
              <textarea
                type="userDescription"
                name="userDescription"
                id="userDescription"
                value={ userDescription }
                data-testid="edit-input-description"
                placeholder="descrição"
                cols="30"
                rows="10"
                onChange={ this.handleChange }
              />
            </div>
            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ isButtonDisabled }
              onClick={ this.handleClick }
            >
              Editar perfil
            </button>
          </form>
        </section>
      </section>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
