import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InstructionsModal } from '../../common';
import { Modal } from 'antd';
import { modalInstructions } from '../../../utils/helpers';

const RenderChildDashboard = () => {
  const { push } = useHistory();
  const [modalVisible, setModalVisible] = useState(true);

  const handleAcceptMission = () => {
    push('/child/mission-control');
  };

  return (
    <div className="child-dashboard">
         <Modal
        visible={true}
        //onCancel={handleCancel}
        // afterClose={() => pin.clear()}
        centered="true"
        width="25vw"
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
       <InstructionsModal
        visible={modalVisible}
        handleOk={() => {
          setModalVisible(false);
        }}
        header={modalInstructions.childDash.header}
        instructions={modalInstructions.childDash.text}
      />
      </Modal>
      
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
