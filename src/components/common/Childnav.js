import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import { Button, Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { global } from '../../state/actions';
import { useOktaAuth } from '@okta/okta-react';
import ChildAvatar from './ChildAvatar';

const ChildMenu = props => {
  const { push } = useHistory();
  // const { authService } = useOktaAuth(); // https://github.com/okta/okta-react/blob/okta-react-4.0.0/README.md#migrating-from-3x-to-4x
  // augment "oktaAuth" to behave like "authService"
  const { authState, oktaAuth } = useOktaAuth();
  oktaAuth.getUser = oktaAuth.token.getUserInfo;
  oktaAuth.logout = oktaAuth.signOut;
  oktaAuth.isAuthenticated = authState.isAuthenticated;
  const authService = oktaAuth;
  // end augmentation

  const switchUsers = () => {
    props.clearUsers();
    push('/');
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/child/dashboard">Home</Link>
        </li>
        <li>Help</li>
        <li>
          <button onClick={switchUsers}>Change User</button>
        </li>
        <li>
          <button onClick={() => authService.logout()}>Log Out</button>
        </li>
        {/* Temporary navigation for user testing */}
        {process.env.REACT_APP_ENV === 'development' && (
          <>
            <li>
              <Link to="/child/join">Squad</Link>
            </li>
            <li>
              <Link to="/child/match-up">Matchup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const Hamburger = ({ clearUsers }) => {
  const history = useHistory();
  // hide navigation menu on certain pages
  const showNav = () => {
    switch (history.location.pathname) {
      case '':
      case '/login':
        return false;
      default:
        return true;
    }
  };
console.log(ChildAvatar);
  return (
    <header>
      <h1>STORY SQUAD</h1>
      {showNav() && (
        <Dropdown
          overlay={<ChildMenu clearUsers={clearUsers} />}
          trigger={['hover']}
          placement="bottomCenter"
        >
          <a
            className="parent-avatar"
            data-testid="parent-avatar"
            onClick={e => e.preventDefault()}
          >
            <img src={ChildAvatar} alt="Dropdown Menu" />
          </a>
        </Dropdown>

        // <Dropdown
        //   overlay={<ChildMenu clearUsers={clearUsers} />}
        //   trigger={['click']}
        // >
        //   <Button className="menu" icon={<MenuOutlined />} type="default" />
        // </Dropdown>
      )}
    </header>
  );
};

export default connect(state => ({ team: state.team }), {
  clearUsers: global.clearUsers,
})(Hamburger);
