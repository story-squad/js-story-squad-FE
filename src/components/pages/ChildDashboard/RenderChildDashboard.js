import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InstructionsModal } from '../../common';
import { modalInstructions } from '../../../utils/helpers';

const RenderChildDashboard = props => {
  const { push } = useHistory();
  const [modalVisible, setModalVisible] = useState(false);

  const handleAcceptMission = () => {
    push('/child/mission-control');
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
        <button
          className="content-box h2 bg-green"
          onClick={handleAcceptMission}
        >
          Accept
          <br />
          the mission
        </button>
        <button className="content-box h2 bg-orange">Leaderboard</button>
        <button className="content-box h2 bg-yellow">
          Story and Drawing
          <br />
          Gallery
        </button>
      </nav>
    </>
  );
};

export default RenderChildDashboard;
