import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { InstructionsModal } from '../../common';
import { modalInstructions } from '../../../utils/helpers';

import adventure_passport from '../../../assets/images/child_dashboard_images/adventure_passport.svg';
import change_your_avatar from '../../../assets/images/child_dashboard_images/change_your_avatar.svg';
import trophy_room from '../../../assets/images/child_dashboard_images/trophy_room.svg';

const RenderChildDashboard = props => {
  const { push } = useHistory();
  const [modalVisible, setModalVisible] = useState(false);

  const handleAcceptMission = e => {
    push('/child/mission-control');
  };

  const handleJoinSquad = e => {
    push('/child/join');
  };

  const handleAdminPage = event => {
    push('/admin');
  };

  const handleTrophyRoom = e => {
    push('/child/trophyroom');
  };

  return (
    <>
      <InstructionsModal //This is the pop up that happens on the child dashboard stop at one pop up
        modalVisible={modalVisible}
        handleCancel={() => {
          setModalVisible(false);
        }}
        handleOk={() => {
          setModalVisible(false);
        }}
        instructions={modalInstructions.childDash}
      />
      <nav>
        <button className="content-box bg-green" onClick={handleAcceptMission}>
          <h2>
            Accept
            <br />
            the mission
          </h2>
        </button>
        <button className="content-box bg-orange">
          <h2>Leaderboard</h2>
        </button>
        <button className="content-box bg-yellow">
          <h2>
            Story and Drawing
            <br />
            Gallery
          </h2>
        </button>
      </nav>
    </>
  );
};

export default RenderChildDashboard;
