import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';

import { getMissionControlText } from '../../../utils/helpers';
import { getChildTasks, getStory } from '../../../api';
import { tasks } from '../../../state/actions';

import InstructionsModal from '../../common/InstructionsModal';
import StoryViewer from './StoryViewer';
import DrawingSub from './DrawingSub';
import WritingSub from './WritingSub';

const RenderMissionControl = props => {
  //modal state
  const [instructionText, setInstructionText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { hasRead, hasWritten, hasDrawn } = props;
  const { authState } = useOktaAuth();

  // calculate current step
  const currentStep = () => {
    if (!hasRead) {
      return 'read';
    }
    if (hasRead && !hasDrawn) {
      return 'draw';
    }
    if (hasRead && hasDrawn && !hasWritten) {
      return 'write';
    }
    if (hasRead && hasDrawn && hasWritten) {
      return 'done';
    }
  };

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

  // show instructions and modal for each phase
  useEffect(() => {
    setInstructionText(getMissionControlText(currentStep()));
    setShowModal(true);
  }, [hasRead, hasWritten, hasDrawn]);

  // dim/highlight each step number using className
  const stepLiClassName = () => {
    return {
      read: currentStep() === 'read' ? '' : 'off',
      draw: currentStep() === 'draw' ? '' : 'off',
      write: currentStep() === 'write' ? '' : 'off',
    };
  };

  return (
    <div className="mission-container">
      <InstructionsModal
        header={instructionText?.header}
        instructions={instructionText?.text}
        visible={showModal && instructionText?.header && instructionText?.text}
        handleOk={() => setShowModal(false)}
      />
      <div className="shaped-shadow-container">
        <div className="content-box shaped dark">
          <h2 className="mission-header">Your Mission</h2>
          <ol className="mission-steps">
            <li className={stepLiClassName().read}>
              <div className="step-number bg-green">
                <p>1</p>
              </div>
              <p className="step-text text-light">Read</p>
            </li>
            <li className={stepLiClassName().draw}>
              <div className="step-number bg-orange">
                <p>2</p>
              </div>
              <p className="step-text text-light">Draw</p>
            </li>
            <li className={stepLiClassName().write}>
              <div className="step-number bg-yellow">
                <p>3</p>
              </div>
              <p className="step-text text-light">Write</p>
            </li>
          </ol>
        </div>
      </div>
      {currentStep() === 'read' && (
        <StoryViewer
          userInfo={props.userInfo}
          authService={props.authService}
        />
      )}
      {currentStep() === 'draw' && (
        <DrawingSub userInfo={props.userInfo} authService={props.authService} />
      )}
      {currentStep() === 'write' && (
        <WritingSub userInfo={props.userInfo} authService={props.authService} />
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
