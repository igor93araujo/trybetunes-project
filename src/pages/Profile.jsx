import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import '../profile.css';

class Profile extends React.Component {
  state = {
    loading: false,
    userInfos: {},
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    const userInfo = await getUser();

    this.setState({
      loading: false,
      userInfos: userInfo,
    });
  }

  render() {
    const {  userInfos } = this.state;
    const { name, description, email, image } = userInfos;
    return (
      <div data-testid="page-profile" className="fullPageSearch">
        <Header />
        <section className="profilePage">
          <div>
            <img
              src={ image }
              alt="userImage"
              data-testid="profile-image"
            />
          </div>
          <p className="profileTitles">Nome</p>
          <p>
            {name}
          </p>
          <p className="profileTitles">Email</p>
          <p>
            {email}
          </p>
          <p className="profileTitles">Descrição</p>
          <p>
            { description }
          </p>
          <Link to="/profile/edit" className="editLink">
            Editar perfil
          </Link>
        </section>
      </div>
    );
  }
}

export default Profile;
