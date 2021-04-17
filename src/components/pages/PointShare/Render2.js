import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { Header } from '../../common';
import { Button, notification } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { submitPoints } from '../../../api/index';

import { SubmissionViewerModal } from '../../common';
import { InstructionsModal } from '../../common';
import { modalInstructions } from '../../../utils/helpers';

import ChildRow from './ChildRow';
import usePointShare from './usePointShare';

const PointShare = props => {
  const { push } = useHistory();

  const [pointsLeft, portfolioPoints, handleUpdatePoints] = usePointShare();
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  const { authState } = useOktaAuth();

  const backToJoin = e => {
    push('/child/join');
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <>
      {/* Header requires countDown={true}  */}
      {showModal && (
        <SubmissionViewerModal
          showModal={showModal}
          content={modalContent}
          closeModal={() => setShowModal(false)}
        />
      )}
      <Header
        title="SHARE POINTS"
        displayMenu={true}
        pointsRemaining={true}
        points={pointsLeft}
        teamName={true}
      />
      <QuestionCircleOutlined
        className="question-icon"
        onClick={() => setModalVisible(true)}
      />
      <InstructionsModal
        modalVisible={modalVisible}
        handleCancel={() => setModalVisible(false)}
        handleOk={() => setModalVisible(false)}
        instructions={modalInstructions.sharePoints}
      />
      <div className="point-share-container">
        <ChildRow
          child={props.team.child1}
          childNum={'childOne'}
          points={portfolioPoints}
          updatePoints={handleUpdatePoints}
          bgVariable={'burnt-sienna'}
        />
        <ChildRow
          child={props.team.child2}
          childNum={'childTwo'}
          points={portfolioPoints}
          updatePoints={handleUpdatePoints}
          bgVariable={'bright-sun'}
        />
        <Button
          className="point-share-orange-btn abs-left"
          onClick={backToJoin}
        >
          Back
        </Button>
        <Button
          selection="#eb7d5bbb"
          className="point-share-orange-btn abs-right"
          type="primary"
          size="large"
          onClick={handleSubmit}
        >
          Match Up!
        </Button>
      </div>
    </>
  );
};

export default connect(
  state => ({
    child: state.child,
    team: state.team,
  }),
  {}
)(PointShare);
