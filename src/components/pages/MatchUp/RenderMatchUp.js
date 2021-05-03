import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import FaceoffContent from './FaceoffContent';
import { ChildAvatar, InstructionsModal } from '../../common';
import {
  modalInstructions,
  getTeamsFromFaceoffs,
} from '../../../utils/helpers';

const RenderMatchUp = props => {
  const { push } = useHistory();
  const [faceoffs, setFaceoffs] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [teams, setTeams] = useState({});

  useEffect(() => {
    if (props.child.VotesRemaining <= 9) {
      setModalVisible(false);
    }
    setFaceoffs(props.faceoffs);
    setTeams(getTeamsFromFaceoffs(props.faceoffs));
  }, [props]);
  const handleVote = e => {
    e.preventDefault();
    push('/child/match-up/squad-vote');
  };
  const back2Dash = e => {
    e.preventDefault();
    push('/child/dashboard');
  };

  return (
    <>
      {/* <QuestionCircleOutlined
        className="question-icon"
        onClick={() => {
          setModalVisible(true);
        }}
      /> */}
      {modalVisible && (
        <InstructionsModal
          modalVisible={modalVisible}
          handleCancel={() => {
            setModalVisible(false);
          }}
          handleOk={() => {
            setModalVisible(false);
          }}
          instructions={modalInstructions.matchUp}
        />
      )}
      <div className="matchup-container">
        <div className="shaped-shadow-container">
          <div className="content-box dark shaped center-content">
            <h2>The Match Up</h2>
            <p>201 points to win</p>
            <div className="flex space-between align-center margin-bottom-2">
              {faceoffs.length === 4 && (
                <>
                  <ChildAvatar
                    src={teams[1][0].AvatarURL}
                    name={teams[1][0].Name}
                    fontColor={'light'}
                  />
                  <ChildAvatar
                    src={teams[1][1].AvatarURL}
                    name={teams[1][1].Name}
                    fontColor={'light'}
                  />
                  <p className="h2 text-light">VS</p>
                  <ChildAvatar
                    src={teams[2][0].AvatarURL}
                    name={teams[2][0].Name}
                    fontColor={'light'}
                  />
                  <ChildAvatar
                    src={teams[2][1].AvatarURL}
                    name={teams[2][1].Name}
                    fontColor={'light'}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        {faceoffs.length === 4 && (
          <div className="grid grid-2-col">
            <FaceoffContent
              custom_date={props.custom_date}
              content={faceoffs[0]}
              backgroundColor={'green'}
              votesRemaining={props.votesRemaining}
              votesNeededToUnlock={-1}
              dayNeededToUnlock={5}
              hourNeededToUnlock={18}
            />
            <FaceoffContent
              custom_date={props.custom_date}
              content={faceoffs[1]}
              backgroundColor={'orange'}
              votesRemaining={props.votesRemaining}
              votesNeededToUnlock={0}
            />
            <FaceoffContent
              custom_date={props.custom_date}
              content={faceoffs[2]}
              backgroundColor={'yellow'}
              votesRemaining={props.votesRemaining}
              votesNeededToUnlock={1}
            />
            <FaceoffContent
              custom_date={props.custom_date}
              content={faceoffs[3]}
              backgroundColor={'blue'}
              votesRemaining={props.votesRemaining}
              votesNeededToUnlock={2}
            />
          </div>
        )}
        <Button className="back-button" onClick={back2Dash}>
          Back
        </Button>
        <Button
          className={'vote-button ' + (props.canVote ? '' : 'disabled')}
          onClick={handleVote}
          disabled={props.canVote ? false : true}
        >
          Vote!
          <br />
          {props.child.VotesRemaining} votes left
        </Button>
      </div>
    </>
  );
};

export default RenderMatchUp;
