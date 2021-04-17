import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { Header } from '../../common';
import { Button } from 'antd';
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

  // TODO The previous component used a useEffect that would send the submit API call if authState changed, I'm unsure if it's needed -- I haven't re-implemented it yet
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
      {/*  TODO decide whether the countdown is necessary or not, and scrap or implement the functionality accordingly */}
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
