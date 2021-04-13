import React from 'react';
import { Col, Button } from 'antd';
import Squadup from '../../../assets/images/Squadup.svg';
import wordBubble from '../../../assets/images/match_up_images/wordbubble.svg';
import wordBubbleright from '../../../assets/images/match_up_images/wordBubbleright.svg';
import { useHistory } from 'react-router-dom';

const useStyles = childNum => {
  return {
    joinSquad: childNum === 1 ? 'joinSquad1' : 'joinSquad2',
    imgContain: childNum === 1 ? 'imgContain1' : 'imgContain2',
    text: 'text',
    wordBubble: childNum === 1 ? 'wordBubble' : 'wordBubble2',
    star: 'star',
    childAvatar: childNum === 1 ? 'child1-avatar' : 'child2-avatar',
    button: 'back-button',
  };
};

const RenderChild = ({ child, bubbleStyle, childNum }) => {
  const { push } = useHistory();
  const classes = useStyles(childNum);

  const home = e => {
    push('/child/dashboard');
  };
  const teamVote = e => {
    push('/child/point-share');
  };

  return (
    <Col className={classes.joinSquad} xs={24} sm={12}>
      <div className={classes.imgContain}>
        <p className={classes.text}>
          Hi! <br></br>My name is {child.ChildName}!
        </p>
        <img
          className={classes.wordBubble}
          src={bubbleStyle === 'right' ? wordBubbleright : wordBubble}
          alt="word bubble"
        />
        <img
          className={classes.star}
          src={Squadup}
          alt="Blast Character Background"
        />
        <img
          className={classes.childAvatar}
          src={child.AvatarURL}
          alt="Child 1 Avatar"
        />
      </div>
      <div className="button">
        {childNum === 1 ? (
          <Button className={classes.button} onClick={home}>
            Back
          </Button>
        ) : (
          <Button
            selection="#eb7d5bbb"
            className="sharePoints"
            type="primary"
            size="large"
            onClick={teamVote}
          >
            Share Points
          </Button>
        )}
      </div>
    </Col>
  );
};
export default RenderChild;
