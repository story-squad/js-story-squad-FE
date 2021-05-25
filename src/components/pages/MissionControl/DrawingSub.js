import React from 'react';
import { connect } from 'react-redux';
import { UploadDocs } from '../../common';
import { postNewDrawingSub } from '../../../api/index';
import { tasks } from '../../../state/actions';
import drawHero from '../../../assets/images/mission_control_images/draw-hero.png';

export const DrawingSub = props => {
  // TODO add event to occur after submit if needed, or remove
  const handleSubmit = () => null;

  return (
    <div className="content-box-mission bg-orange">
      <div className="grid-left">
        <img
          className="drawing-img"
          src={drawHero}
          alt="child superhero making a drawing"
        />
      </div>
      <div className="grid-right">
        <h2 className="text-align-left">Pencils Ready!</h2>
        <p className="small">Draw your favorite part of the story.</p>
        <UploadDocs
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
)(DrawingSub);
