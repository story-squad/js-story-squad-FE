import React from 'react';
import questionIcon from '../../assets/icons/question.svg';

const InfoButton = ({ setInfoModalVisible }) => {
  const handleClick = () => {
    setInfoModalVisible(true);
  };
  return (
    <button className="info-button" onClick={handleClick}>
      <img src={questionIcon} alt="get info icon"></img>
    </button>
  );
};

export default InfoButton;
