// istanbul ignore file
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './state';

import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';

import { Security } from '@okta/okta-react';

// import './styles/index.scss';
import 'antd/dist/antd.less';
import './styles/less/index.less';

// Helpers
import { config, genRestore, oktaAuth } from './utils/oktaConfig';
import SecureRoute from './components/common/SecureRoute';

//Components
import {
  ChildLoadingComponent,
  ParentLoadingComponent,
  Header,
  Footer,
} from './components/common';
import { AddChild } from './components/pages/AddChild';
import { ChildDashboard } from './components/pages/ChildDashboard';
import { Help } from './components/pages/Help';
// import { LandingPage } from './components/pages/LandingPage';
import { MissionControl } from './components/pages/MissionControl';
import { ProfileSelect } from './components/pages/ProfileSelect';
import { NotFoundPage } from './components/pages/NotFound';
import { ParentDashboard } from './components/pages/ParentDashboard';
import { ParentFaq } from './components/pages/ParentFaq';
import { ParentSettings } from './components/pages/FamilySettings';
import LoginCallbackLoader from './components/common/LoginCallbackLoader';
import { TrophyRoom } from './components/pages/TrophyRoom';
import FaceoffReveal from './components/pages/Animations/FaceoffReveal';
import { ParentContact } from './components/pages/ParentContact';
import { EditPlayers } from './components/pages/EditPlayers';
// Gameification Components
import { JoinTheSquad } from './components/pages/JoinTheSquad';
import { PointShare } from './components/pages/PointShare';
import { MatchUp } from './components/pages/MatchUp';
import { VotingPage } from './components/pages/VotingPage';

// Note: for demo/developer purposes ONLY
import ModerationTest from './components/pages/ModerationTest/ModerationTest';
import AdminDashboard from './components/pages/AdminDashboard';
import LoginContainer from './components/pages/Login/LoginContainer';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  // Declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // useHistory at this level to ensure we have security around our routes.
  const history = useHistory();
  const restoreOriginalUri = genRestore(history);
  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };
  // corsErrorModalOpen is instantiated here but is then passed down to the login 
  // component and is called there. Right now this is causing a warning in the terminal
  // it may be the case that this state object may want to be instantiated
  // in the login component to avoid this error.
  // eslint-disable-next-line
  const [corsErrorModalOpen, setCorsErrorModalOpen] = React.useState(false);

  return (
    <Security
      {...config}
      oktaAuth={oktaAuth}
      onAuthRequired={authHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      {/* // <Security oktaAuth={oktaAuth} onAuthRequired={authHandler} restoreOriginalUri={restoreOriginalUri}> */}

      
      <Header />
      <div className="footer-flex">
        <main role="main">
          <Switch>
            {/* <Route path="/login" component={LoginContainer} /> */}
            <Route
              path="/login"
              render={() => <LoginContainer {...{ setCorsErrorModalOpen }} />}
            />

            <Route path="/implicit/callback" component={LoginCallbackLoader} />
            {/* any of the routes you need secured should be registered as SecureRoutes */}
            <SecureRoute
              path="/"
              exact
              component={() => (
                <ProfileSelect LoadingComponent={ChildLoadingComponent} />
              )}
            />
            <SecureRoute
              path="/child/dashboard"
              component={() => (
                <ChildDashboard LoadingComponent={ChildLoadingComponent} />
              )}
            />
            <SecureRoute path="/scoreboard" component={FaceoffReveal} />
            <SecureRoute
              path="/child/mission-control"
              component={() => (
                <MissionControl LoadingComponent={ChildLoadingComponent} />
              )}
            />
            <SecureRoute
              path="/parent/add-child"
              component={() => (
                <AddChild LoadingComponent={ParentLoadingComponent} />
              )}
            />
            <SecureRoute
              path="/parent/edit-players"
              component={() => (
                <EditPlayers LoadingComponent={ParentLoadingComponent} />
              )}
            />
            <SecureRoute
              path="/parent/dashboard"
              exact
              component={() => (
                <ParentDashboard LoadingComponent={ParentLoadingComponent} />
              )}
            />
            <SecureRoute
              path="/parent/faq"
              exact
              component={() => (
                <ParentFaq LoadingComponent={ParentLoadingComponent} />
              )}
            />
            <SecureRoute
              path="/parent/contact"
              exact
              component={() => (
                <ParentContact LoadingComponent={ParentLoadingComponent} />
              )}
            />
            <SecureRoute
              path="/parent/settings"
              exact
              component={() => (
                <ParentSettings LoadingComponent={ParentLoadingComponent} />
              )}
            />
            <SecureRoute
              path="/child/help"
              exact
              component={() => (
                <Help LoadingComponent={ChildLoadingComponent} />
              )}
            />
            <SecureRoute
              path="/child/join"
              exact
              component={() => (
                <JoinTheSquad LoadingComponent={ChildLoadingComponent} />
              )}
            />
            <SecureRoute
              path="/child/point-share"
              exact
              component={() => (
                <PointShare LoadingComponent={ChildLoadingComponent} />
              )}
            />
            <SecureRoute
              path="/child/match-up"
              exact
              component={() => (
                <MatchUp LoadingComponent={ChildLoadingComponent} />
              )}
            />
            <SecureRoute
              path="/child/match-up/squad-vote"
              exact
              component={() => (
                <VotingPage LoadingComponent={ChildLoadingComponent} />
              )}
            />
            <SecureRoute
              path="/child/trophyroom"
              exact
              component={() => (
                <TrophyRoom LoadingComponent={ChildLoadingComponent} />
              )}
            />
            <SecureRoute exact path="/moderation" component={ModerationTest} />
            <SecureRoute exact path="/admin" component={AdminDashboard} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Security>
  );
}
