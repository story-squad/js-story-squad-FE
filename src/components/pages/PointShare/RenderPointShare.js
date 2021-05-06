import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { submitPoints } from '../../../api/index';

import { SubmissionViewerModal, InstructionsModal } from '../../common';
import { modalInstructions } from '../../../utils/helpers';

import ChildRow from './ChildRow';
import usePointShare from './usePointShare';

const PointShare = props => {
  const { push } = useHistory();

  const [pointsLeft, portfolioPoints, handleUpdatePoints] = usePointShare();
  // TODO could probably abstract this into a useModal hook
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  const { authState } = useOktaAuth();

  const openModal = content => {
    setModalContent(content);
    setShowModal(true);
  };

  const backToJoin = e => {
    push('/child/join');
  };

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    if (pointsLeft === 0) {
      const formattedTeamPoints = [
        {
          WritingPoints: portfolioPoints.childOne.story,
          DrawingPoints: portfolioPoints.childOne.illustration,
          MemberID: props.child.memberId,
          SubmissionID: props.team.child1.SubmissionID,
        },
        {
          WritingPoints: portfolioPoints.childTwo.story,
          DrawingPoints: portfolioPoints.childTwo.illustration,
          MemberID: props.child.memberId,
          SubmissionID: props.team.child2.SubmissionID,
        },
      ];
      // TODO throws a 403 error if 'duplicate,' this error needs handling on the FE
      submitPoints(authState, formattedTeamPoints);
    }
  };

  return (
    <>
      <InstructionsModal
        modalVisible={modalVisible}
        handleCancel={() => setModalVisible(false)}
        handleOk={() => setModalVisible(false)}
        instructions={modalInstructions.sharePoints}
      />
      <div className="point-share">
        <div className="shaped-shadow-container">
          <div className="content-box shaped dark">
            <h2>Points Sharing</h2>
            <p>This part should explain how it works</p>
          </div>
        </div>
        <ChildRow
          child={props.team.child1}
          childNum={'childOne'}
          points={portfolioPoints}
          updatePoints={handleUpdatePoints}
          bgVariable={'burnt-sienna'}
          openModal={openModal}
        />
        <ChildRow
          child={props.team.child2}
          childNum={'childTwo'}
          points={portfolioPoints}
          updatePoints={handleUpdatePoints}
          bgVariable={'bright-sun'}
          openModal={openModal}
        />
        <div className="center-content">
          <button onClick={handleSubmit}>Submit Points</button>
        </div>
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
