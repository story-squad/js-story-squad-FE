import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';

import { getMissionControlText } from '../../../utils/helpers';
import { getChildTasks, getStory } from '../../../api';
import { tasks } from '../../../state/actions';

import StoryViewer from '../../pages/StoryPrompt/RenderStoryViewer';

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

  // dim/highlight each step number using className
  const stepLiClassName = () => {
    let className = { read: 'off', draw: 'off', write: 'off' };
    if (!hasRead) {
      className.read = '';
    }
    if (hasRead && !hasDrawn) {
      className.draw = '';
    }
    if (hasRead && hasDrawn && !hasWritten) {
      className.write = '';
    }
    return className;
  };

  return (
    <div className="mission-container">
      <div className="shaped-shadow-container">
        <div className="content-box shaped dark">
          <h2>Your Mission</h2>
          <ol className="mission-steps">
            <li className={stepLiClassName().read}>
              <div className="step-number bg-green">
                <p>1</p>
              </div>
              <p className="step-text">Read</p>
            </li>
            <li className={stepLiClassName().draw}>
              <div className="step-number bg-orange">
                <p>2</p>
              </div>
              <p className="step-text">Draw</p>
            </li>
            <li className={stepLiClassName().write}>
              <div className="step-number bg-yellow">
                <p>3</p>
              </div>
              <p className="step-text">Write</p>
            </li>
          </ol>
        </div>
      </div>
      {!hasRead && (
        <StoryViewer
          userInfo={props.userInfo}
          authService={props.authService}
        />
      )}
    </div>
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
