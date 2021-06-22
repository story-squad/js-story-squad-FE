import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import { Button, Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { global } from '../../state/actions';
import { useOktaAuth } from '@okta/okta-react';

const ChildMenu = props => {
  const { push } = useHistory();
  const { authService } = useOktaAuth();

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

const Header = ({ clearUsers }) => {
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

  return (
    <header>
      <h1>STORY SQUAD</h1>
      {showNav() && (
        <Dropdown
          overlay={<ChildMenu clearUsers={clearUsers} />}
          trigger={['click']}
        >
          <Button className="menu" icon={<MenuOutlined />} type="default" />
        </Dropdown>
      )}
    </header>
  );
};

export default connect(state => ({ team: state.team }), {
  clearUsers: global.clearUsers,
})(Header);
