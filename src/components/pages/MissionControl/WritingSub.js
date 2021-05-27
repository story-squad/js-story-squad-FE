import React from 'react';
import { connect } from 'react-redux';

import { UploadDocs } from '../../common';
import { postNewWritingSub } from '../../../api/index';
import { tasks } from '../../../state/actions';

export const WritingSub = props => {
  // TODO add event to occur after submit if needed, or remove
  const handleSubmit = () => null;

  return (
    <div className="content-box-mission bg-yellow">
      <div className="grid-left">
        {/* Add src when asset is ready */}
        <img className="writing-img" alt="child superhero writing a story" />
      </div>
      <div className="grid-right">
        <h2 className="text-align-left">Pencils Ready!</h2>
        <p className="small">{props.tasks.story.writingPrompt}</p>
        <UploadDocs
          uploadButtonText="Upload Story"
          uploadButtonClassname="uploadButton"
          fileName="pages"
          apiAxios={postNewWritingSub}
          submissionId={props.tasks.id}
          storyId={props.tasks.story_id}
          setSubmitted={props.setHasWritten}
          maxLength={5}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default connect(
  state => ({
    tasks: state.tasks,
  }),
  {
    setHasWritten: tasks.setHasWritten,
  }
)(WritingSub);
