import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useOktaAuth } from '@okta/okta-react';
import { getProfileData } from '../../../api';
// import ParentNavTopBar from '../../common/ParentNavTop';
// import NewProgressCharts from '../../common/ProgressChart';
import NewChildCard from '../../common/ChildCard';
import AccountSettings from '../ParentAccountSettings/AccountSettingsContainer';
import { connect } from 'react-redux';
import { setParent } from '../../../state/actions/parentActions';

const RenderNewParentDashboard = props => {
  const { authState } = useOktaAuth();
  const { setParent } = props;

  useEffect(() => {
    getProfileData(authState).then(res => {
      setParent({
        ...res[0],
        children: res.filter(user => user.type !== 'Parent'),
      });
    });
  }, [setParent, authState]);

  return (
    <div>
      <Layout className="newparent-dashboard">
        {/* <ParentNavTopBar /> */}
        <Layout>
          <div className="ProgressContainer">
            <div className="ProgressHeader center-content">
              <h2>Progress Charts</h2>
            </div>
            <div className="ProgressBoxContainer">
              <div className="ProgressBox">
                {/* <NewProgressCharts /> */}
                <br />
                <h4>Progress Chart will be displayed here!</h4>
                <br />
                <br />
              </div>
            </div>
          </div>

          <div className="child-container">
            <NewChildCard props={props} />
          </div>
          <div>
            <AccountSettings />
          </div>
        </Layout>
      </Layout>
    </div>
  );
};

export default connect(null, { setParent: setParent })(
  RenderNewParentDashboard
);
