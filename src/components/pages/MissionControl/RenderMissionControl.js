import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { InstructionsModal } from '../../common';
import { getMissionControlText } from '../../../utils/helpers';
import draw_icon from '../../../assets/icons/draw_icon.svg';
import read_icon from '../../../assets/icons/read_icon.svg';
import write_icon from '../../../assets/icons/write_icon.svg';
import Checkbox from './Checkbox';

import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { getChildTasks, getStory } from '../../../api';
import { tasks } from '../../../state/actions';

const RenderMissionControl = props => {
  //modal state
  const [instructionText, setInstructionText] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const { hasRead, hasWritten, hasDrawn } = props;

  const { push } = useHistory();
  const { authState } = useOktaAuth();

  /**
   * On initial render, checks to see if tasks in state (id, hasRead, hasWritten, etc)
   * if not, calls getChildTasks -> getOrInitSubmission on backend
   *    (returns a childs task data)
   * calls getStory
   */
  useEffect(() => {
    if (props.tasks.id === null || props.devMode.isDevModeActive) {
      getChildTasks(authState, props.child.id, props.child.cohortId).then(
        res => {
          props.setTasks(res);
        }
      );

      getStory(authState, props.child.cohortId).then(res => {
        props.setSubmissionInformation(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInstructionText(getMissionControlText(hasRead, hasDrawn, hasWritten));
    setShowButton(!hasRead || (hasWritten && hasDrawn));
  }, [hasRead, hasWritten, hasDrawn]);

  // Will be for when we are checking whether or not the child has completed a task
  function handleChecked(e) {
    return `checked=${e.target.checked}`;
  }

  // directs user to go in order; Read/Draw/Write
  const handleReadStory = e => {
    e.stopPropagation();
    push('/child/story');
  };
  const handleDraw = e => {
    e.stopPropagation();
    if (!hasDrawn && hasRead) {
      push('/child/drawing-sub');
    }
  };
  const handleWrite = e => {
    e.stopPropagation();
    if (!hasWritten && hasRead && hasDrawn) {
      push('/child/writing-sub');
    }
  };

  return (
    <>
      <InstructionsModal
        modalVisible={modalVisible}
        handleCancel={() => {
          setModalVisible(false);
        }}
        handleOk={() => {
          setModalVisible(false);
        }}
        instructions={instructionText}
        style={{ fontSize: '2rem' }}
        showOkButton={showButton}
      />
      <div className="mission-container">
        <div className="shaped-shadow-container">
          <div className="content-box shaped dark">
            <h2>Your Mission</h2>
            <ol className="mission-steps">
              <li>
                <div className="step-number bg-green">
                  <p>1</p>
                </div>
                <p className="step-text">Read</p>
              </li>
              <li>
                <div className="step-number bg-orange">
                  <p>2</p>
                </div>
                <p className="step-text">Draw</p>
              </li>
              <li>
                <div className="step-number bg-yellow">
                  <p>3</p>
                </div>
                <p className="step-text">Write</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(
  state => ({
    child: state.child,
    tasks: state.tasks,
    hasRead: state.tasks.hasRead,
    hasWritten: state.tasks.hasWritten,
    hasDrawn: state.tasks.hasDrawn,
    devMode: state.devMode,
  }),
  {
    setTasks: tasks.setTasks,
    setSubmissionInformation: tasks.setSubmissionInformation,
  }
)(RenderMissionControl);
