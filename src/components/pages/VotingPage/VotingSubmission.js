import React, { useState, useEffect } from 'react';
import { EmojiPicker, SubmissionViewer } from '../../common';
import thumbIcon from '../../../assets/icons/thumbsup.svg';
import { emojiLimit } from '../../../utils/constants';

const VotingSubmission = ({
  number,
  submissionId,
  selectedValue,
  setSelectedValue,
  imgSrc,
  submissionType,
  setEmojis,
  selectedEmojis,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(submissionId === selectedValue);
  }, [submissionId, selectedValue]);

  return (
    <div
      className={`submission content-box center-content ${
        isSelected ? 'selected border-dark' : 'dark'
      }`}
    >
      <p className="margin-bottom-2 font-display keep-font-size">
        {submissionType} {number}
      </p>
      <SubmissionViewer src={imgSrc} modalButtonText="Back to Voting">
        <p>
          Choose up to {emojiLimit} different emojis to express how you feel
          about this story.
        </p>
        <EmojiPicker
          getEmojiString={setEmojis}
          defaultEmojis={selectedEmojis}
        />
      </SubmissionViewer>
      <div className="select-container">
        {isSelected ? (
          <div className="center-content-flex">
            <img className="thumb-up" src={thumbIcon} alt="thumbs up icon" />
            <p className="font-display margin-0">Good Choice!</p>
          </div>
        ) : (
          <button
            className="secondary small text-dark"
            onClick={() => setSelectedValue(submissionId)}
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default VotingSubmission;
