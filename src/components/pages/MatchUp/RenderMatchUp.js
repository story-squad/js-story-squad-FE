import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import FaceoffContent from './FaceoffContent';
import { InstructionsModal } from '../../common';
import { modalInstructions } from '../../../utils/helpers';

const RenderMatchUp = props => {
  const { push } = useHistory();
  const [faceoffs, setFaceoffs] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    if (props.child.VotesRemaining <= 9) {
      setModalVisible(false);
    }
    setFaceoffs(props.faceoffs);
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
      <QuestionCircleOutlined
        className="question-icon"
        onClick={() => {
          setModalVisible(true);
        }}
      />
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
        {faceoffs.length === 4 && (
          <div className="grid-2-col">
            <FaceoffContent
              custom_date={props.custom_date}
              content={faceoffs[0]}
              backgroundColor={'#C9E952'}
              votesRemaining={props.votesRemaining}
              votesNeededToUnlock={7}
              dayNeededToUnlock={5}
              hourNeededToUnlock={18}
            />
            <FaceoffContent
              custom_date={props.custom_date}
              content={faceoffs[1]}
              backgroundColor={'#e97451'}
              votesRemaining={props.votesRemaining}
              votesNeededToUnlock={7}
            />
            <FaceoffContent
              custom_date={props.custom_date}
              content={faceoffs[2]}
              backgroundColor={'#ffde3b'}
              votesRemaining={props.votesRemaining}
              votesNeededToUnlock={8}
            />
            <FaceoffContent
              custom_date={props.custom_date}
              content={faceoffs[3]}
              backgroundColor={'#438eac'}
              votesRemaining={props.votesRemaining}
              votesNeededToUnlock={9}
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
