import React from 'react';
import Squadup from '../../../assets/images/Squadup.svg';
import wordBubble from '../../../assets/images/match_up_images/wordbubble.svg';
import wordBubbleright from '../../../assets/images/match_up_images/wordBubbleright.svg';

const RenderChild = ({ child, bubbleStyle, childNum }) => {
  return (
    <div className="join-squad-child">
      <p>
        Hi, I'm {child.ChildName}!
        <br />
        Nice to meet you!
      </p>
      <img
        className={`word-bubble-${childNum}`}
        src={bubbleStyle === 'right' ? wordBubbleright : wordBubble}
        alt="word bubble"
      />
      <img
        className={`star-bg-${childNum}`}
        src={Squadup}
        alt="blast character background"
      />
      <img
        className={`child-avatar-${childNum}`}
        src={child.AvatarURL}
        alt="child avatar"
      />
    </div>
  );
};

export default RenderChild;
