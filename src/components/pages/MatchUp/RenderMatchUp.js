import React, { useState, useEffect } from 'react';
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

  return (
    <>
      {modalVisible && (
        <InstructionsModal
          visible={modalVisible}
          handleOk={() => {
            setModalVisible(false);
          }}
          instructions={modalInstructions.matchUp}
        />
      )}
      <div className="matchup-container">
        <div className="shaped-shadow-container responsive-box">
          <div className="matchup-info content-box dark shaped center-content responsive-box">
            <h2>The Match Up</h2>
            <p>201 points to win</p>
            <div className="flex space-between tablet-large-column align-center margin-bottom-2">
              {faceoffs.length === 4 && (
                <>
                  <div className="flex space-between align-center">
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
                  </div>
                  <div className="flex space-between align-center">
                    <p className="h2 text-light">VS</p>
                  </div>
                  <div className="flex space-between align-center">
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
                  </div>
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
              setInfoModalVisible={setModalVisible}
              handleVote={handleVote}
            />
            <FaceoffContent
              custom_date={props.custom_date}
              content={faceoffs[1]}
              backgroundColor={'orange'}
              votesRemaining={props.votesRemaining}
              votesNeededToUnlock={0}
              setInfoModalVisible={setModalVisible}
              handleVote={handleVote}
            />
            <FaceoffContent
              custom_date={props.custom_date}
              content={faceoffs[2]}
              backgroundColor={'yellow'}
              votesRemaining={props.votesRemaining}
              votesNeededToUnlock={1}
              setInfoModalVisible={setModalVisible}
              handleVote={handleVote}
            />
            <FaceoffContent
              custom_date={props.custom_date}
              content={faceoffs[3]}
              backgroundColor={'blue'}
              votesRemaining={props.votesRemaining}
              votesNeededToUnlock={2}
              setInfoModalVisible={setModalVisible}
              handleVote={handleVote}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default RenderMatchUp;
