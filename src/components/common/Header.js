import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { global } from '../../state/actions';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';

const ChildMenu = props => {
  const { push } = useHistory();
  const { authService } = useOktaAuth();

  const switchUsers = () => {
    props.clearUsers();
    push('/');
  };

  return (
    <Menu {...props}>
      <Menu.Item key="1">
        <Link to="/child/dashboard">Home</Link>
      </Menu.Item>
      <Menu.Item key="2" disabled={true}>
        Help
      </Menu.Item>
      <Menu.Item key="3" onClick={switchUsers}>
        Change User
      </Menu.Item>
      <Menu.Item key="4" onClick={() => authService.logout()}>
        Log Out
      </Menu.Item>
    </Menu>
  );
};

const Header = ({ clearUsers }) => {
  // const targetTime = new Date().getTime() + 300;
  // CountDown component requires 'target' property, currently not functional
  return (
    <header>
      <h1>STORY SQUAD</h1>
      <Dropdown
        overlay={<ChildMenu clearUsers={clearUsers} />}
        trigger={['click']}
        className="menu-button"
      >
        <Button className="menu" icon={<MenuOutlined />} type="default" />
      </Dropdown>
    </header>
  );
};

export default connect(state => ({ team: state.team }), {
  clearUsers: global.clearUsers,
})(Header);
