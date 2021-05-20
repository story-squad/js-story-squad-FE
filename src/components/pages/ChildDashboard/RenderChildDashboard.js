import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InstructionsModal } from '../../common';
import { modalInstructions } from '../../../utils/helpers';

const RenderChildDashboard = () => {
  const { push } = useHistory();
  const [modalVisible, setModalVisible] = useState(true);

  const handleAcceptMission = () => {
    push('/child/mission-control');
  };

  return (
    <div className="child-dashboard">
      <InstructionsModal
        visible={modalVisible}
        handleOk={() => {
          setModalVisible(false);
        }}
        header={modalInstructions.childDash.header}
        instructions={modalInstructions.childDash.text}
      />
      <nav>
        <button
          className="accept-mission content-box border h2 bg-green"
          onClick={handleAcceptMission}
        >
          Accept
          <br />
          the mission
        </button>
        <button className="content-box border h2 bg-orange">Leaderboard</button>
        <button className="content-box border h2 bg-yellow">
          Story and Drawing
          <br />
          Gallery
        </button>
      </nav>
    </div>
  );
};

export default RenderChildDashboard;
