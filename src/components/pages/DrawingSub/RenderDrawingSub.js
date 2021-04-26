import React from 'react';
import { connect } from 'react-redux';
import { UploadDocs } from '../../common/';
import { postNewDrawingSub } from '../../../api/index';
import { tasks } from '../../../state/actions';

export const RenderDrawingSub = props => {
  // TODO add event to occur after submit if needed, or remove
  const handleSubmit = () => null;

  return (
    <div className="content-box-mission bg-orange">
      {/* left */}
      <div></div>
      {/* right */}
      <div>
        <h2 className="text-align-left">Pencils Ready!</h2>
        <p className="small">
          <span>Prompt: </span>
          {props.tasks.story.drawingPrompt}
        </p>
        <UploadDocs
          submitButtonClassname="orange-submit-button"
          uploadButtonText="Upload Drawing"
          uploadButtonClassname="uploadButton"
          fileName="drawing"
          apiAxios={postNewDrawingSub}
          submissionId={props.tasks.id}
          storyId={props.tasks.story_id}
          setSubmitted={props.setHasDrawn}
          maxLength={1}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default connect(
  state => ({
    tasks: state.tasks,
    hasDrawn: state.tasks.hasDrawn,
  }),
  {
    setHasDrawn: tasks.setHasDrawn,
  }
)(RenderDrawingSub);
