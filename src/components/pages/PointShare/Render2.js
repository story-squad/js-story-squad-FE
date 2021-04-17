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
      {/* {state.showModal && (
        <SubmissionViewerModal
          showModal={state.showModal}
          content={state.modalContent}
          closeModal={() => dispatch({ type: SET_SHOW_MODAL, payload: false })}
        />
      )} */}
      <Header
        title="SHARE POINTS"
        displayMenu={true}
        pointsRemaining={true}
        points={pointsLeft}
        teamName={true}
      />
      <QuestionCircleOutlined
        className="question-icon"
        onClick={() => {
          // dispatch({ type: SET_MODAL_VISIBLE, payload: true });
        }}
      />
      <InstructionsModal
        // modalVisible={state.modalVisible}
        handleCancel={() => {
          // dispatch({ type: SET_MODAL_VISIBLE, payload: false });
        }}
        handleOk={() => {
          // dispatch({ type: SET_MODAL_VISIBLE, payload: false });
        }}
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
          className="point-share-orange-btn abs-right"
          onClick={backToJoin}
        >
          Back
        </Button>
        <Button
          selection="#eb7d5bbb"
          className="point-share-orange-btn abs-left"
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
