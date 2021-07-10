import React from 'react';
import { Typography, Menu, Dropdown, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import { global } from '../../state/actions';
import parent_avatar from '../../assets/icons/parent_avatar.svg';

const { Title } = Typography;

const ChildHeader = props => {
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
    <Menu >
      <Menu.Item key="1" onClick={() => push('/parent/dashboard')}>
        Home
      </Menu.Item>
      <Menu.Item key="2" onClick={() => push('/child/dashboard')}>
        Help
      </Menu.Item>
      <Menu.Item key="3" onClick={switchUsers}>
        Change User
      </Menu.Item>
      <Menu.Item key="4" onClick={() => push('/child/join')}>
        Squad
      </Menu.Item>
      <Menu.Item key="5" onClick={() => push('/child/match-up')}>
        Match Up
      </Menu.Item>
      <Menu.Item key="6" onClick={() => authService.logout()}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

const ChildNav = props => {
  
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
        <nav>
          <Dropdown
            overlay={<ChildHeader clearUsers={props.clearUsers} />}
            trigger={['hover']}
            placement="bottomCenter"
          >
            <a
              className="parent-avatar"
              data-testid="parent-avatar"
              onClick={e => e.preventDefault()}
            >
              <img src={parent_avatar} alt="Dropdown Menu" />
            </a>
          </Dropdown>
        </nav>
      )}
    </header>
  );
};

export default connect(state => ({ team: state.team }), {
  clearUsers: global.clearUsers,
})(ChildNav);

// import { Link, useHistory } from 'react-router-dom';
// import { Button, Dropdown } from 'antd';
// import { MenuOutlined } from '@ant-design/icons';
// import { connect } from 'react-redux';
// import { global } from '../../state/actions';
// import { useOktaAuth } from '@okta/okta-react';
// import ChildAvatar from './ChildAvatar';

// const ChildMenu = props => {
//   const { push } = useHistory();
//   // const { authService } = useOktaAuth(); // https://github.com/okta/okta-react/blob/okta-react-4.0.0/README.md#migrating-from-3x-to-4x
//   // augment "oktaAuth" to behave like "authService"
//   const { authState, oktaAuth } = useOktaAuth();
//   oktaAuth.getUser = oktaAuth.token.getUserInfo;
//   oktaAuth.logout = oktaAuth.signOut;
//   oktaAuth.isAuthenticated = authState.isAuthenticated;
//   const authService = oktaAuth;
//   // end augmentation

//   const switchUsers = () => {
//     props.clearUsers();
//     push('/');
//   };

//   return (
//     <nav>
//       <ul>
//         <li>
//           <button onClick={push('/child/dashboard')}>Home</button>
//         </li>
//         <li>
//           <button onClick={push('/child/dashboard')}>Help</button>
//         </li>
//         <li>
//           <button onClick={switchUsers}>Change User</button>
//         </li>
//         <li>
//           <button onClick={() => authService.logout()}>Log Out</button>
//         </li>
//         {/* Temporary navigation for user testing */}
//         {process.env.REACT_APP_ENV === 'development' && (
//           <>
//             <li>
//               <button onClick={push('/child/join')}>Squad</button>
//             </li>
//             <li>
//               <button onClick={push('/child/match-up')}>Squad</button>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// const Hamburger = ({ clearUsers }) => {
//   const history = useHistory();
//   // hide navigation menu on certain pages
//   const showNav = () => {
//     switch (history.location.pathname) {
//       case '':
//       case '/login':
//         return false;
//       default:
//         return true;
//     }
//   };

//   return (
//     <header>
//       <h1>STORY SQUAD</h1>
//       {showNav() && (
//         <Dropdown
//           overlay={<ChildMenu clearUsers={clearUsers} />}
//           trigger={['hover']}
//           placement="bottomCenter"
//         >
//           <a
//             className="parent-avatar"
//             data-testid="parent-avatar"
//             onClick={e => e.preventDefault()}
//           >
//             <img src={ChildAvatar} alt="Dropdown Menu" />
//           </a>
//         </Dropdown>

//         // <Dropdown
//         //   overlay={<ChildMenu clearUsers={clearUsers} />}
//         //   trigger={['click']}
//         // >
//         //   <Button className="menu" icon={<MenuOutlined />} type="default" />
//         // </Dropdown>
//       )}
//     </header>
//   );
// };

// export default connect(state => ({ team: state.team }), {
//   clearUsers: global.clearUsers,
// })(Hamburger);
