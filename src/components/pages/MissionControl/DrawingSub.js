import React from 'react';
import { connect } from 'react-redux';
import { UploadDocs } from '../../common';
import { postNewDrawingSub } from '../../../api/index';
import { tasks } from '../../../state/actions';

export const DrawingSub = props => {
  // TODO add event to occur after submit if needed, or remove
  const handleSubmit = () => null;

  return (
    <div className="content-box-mission bg-orange">
      <div className="grid-left">
        {/* Add src when asset is ready */}
        <img className="drawing-img" alt="child superhero making a drawing" />
      </div>
      <div className="grid-right">
        <h2 className="text-align-left small">Instructions</h2>
        <p className="small">
          With your paper and pencil, draw your favorite scene from the story
          you just read. Make sure you write a caption describing which part of
          the story you chose to draw. When you're finished, snap a photo and
          upload your masterpiece!
        </p>
        <div className="upload-docs">
          <UploadDocs
            uploadButtonText="Add image"
            uploadButtonClassname="uploadButton add-more-uploads"
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
)(DrawingSub);
