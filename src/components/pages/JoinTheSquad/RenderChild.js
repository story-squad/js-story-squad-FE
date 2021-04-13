import React from 'react';
import { Col, Button } from 'antd';
import Squadup from '../../../assets/images/Squadup.svg';
import wordBubble from '../../../assets/images/match_up_images/wordbubble.svg';
import wordBubbleright from '../../../assets/images/match_up_images/wordBubbleright.svg';
import { useHistory } from 'react-router-dom';

const RenderChild = ({ child, bubbleStyle, childNum }) => {
  const { push } = useHistory();

  const home = e => {
    push('/child/dashboard');
  };
  return (
    <Col className="joinSquad1" xs={24} sm={12}>
      <div className="imgContain1">
        <p className="text">
          Hi! <br></br>My name is {child.ChildName}!
        </p>
        <img
          className="wordBubble"
          src={bubbleStyle === 'right' ? wordBubbleright : wordBubble}
          alt="word bubble"
        />
        <img className="star" src={Squadup} alt="Blast Character Background" />
        <img
          className="child1-avatar"
          src={child.AvatarURL}
          alt="Child 1 Avatar"
        />
      </div>
      {}
      <Button className="back-button" onClick={home}>
        Back
      </Button>
    </Col>
  );
};
export default RenderChild;
