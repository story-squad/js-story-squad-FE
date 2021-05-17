import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { connect } from 'react-redux';
import { submitPoints } from '../../../api/index';

import { InstructionsModal, SubmissionModal } from '../../common';
import { modalInstructions, modalPush } from '../../../utils/helpers';

import ChildRow from './ChildRow';
import usePointShare from './usePointShare';

const PointShare = props => {
  const { push } = useHistory();

  const [pointsLeft, portfolioPoints, handleUpdatePoints] = usePointShare();
  const [modalVisible, setModalVisible] = useState(false);

  const [submissionModalSrc, setSubmissionModalSrc] = useState('');
  const [isSubmissionModalVisible, setIsSubmissionModalVisible] = useState(
    false
  );

  const { authState } = useOktaAuth();

  const closeModal = () => {
    setModalVisible(false);
    modalPush(push, '/child/match-up');
  };

  const handleOpenSubmissionModal = src => {
    setSubmissionModalSrc(src);
    setIsSubmissionModalVisible(true);
  };

  const handleCloseSubmissionModal = () => {
    setSubmissionModalSrc('');
    setIsSubmissionModalVisible(false);
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
      setModalVisible(true);
    }
  };

  return (
    <>
      <InstructionsModal
        visible={modalVisible}
        handleOk={closeModal}
        header={modalInstructions.sharePointsSubmission.header}
        instructions={modalInstructions.sharePointsSubmission.text}
      />
      {!modalVisible && (
        <SubmissionModal
          isModalVisible={isSubmissionModalVisible}
          src={submissionModalSrc}
          onClose={handleCloseSubmissionModal}
        />
      )}
      <div className={`point-share ${isSubmissionModalVisible && 'hidden'}`}>
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
          onOpenSubmissionModal={handleOpenSubmissionModal}
        />
        <ChildRow
          child={props.team.child2}
          childNum={'childTwo'}
          points={portfolioPoints}
          updatePoints={handleUpdatePoints}
          onOpenSubmissionModal={handleOpenSubmissionModal}
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
