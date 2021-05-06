import React from 'react';
import avatarStar from '../../../assets/images/match_up_images/avatar-star.png';
import talkBubble1 from '../../../assets/images/match_up_images/talk-bubble-1.svg';
import talkBubble2 from '../../../assets/images/match_up_images/talk-bubble-2.svg';

const RenderChild = ({ child, childNum }) => {
  return (
    <div className={`join-squad-child`}>
      <p className={`child-${childNum}`}>
        Hi, I'm {child.ChildName}!
        <br />
        Nice to meet you!
      </p>
      <img
        className={`talk-bubble child-${childNum}`}
        src={childNum === 1 ? talkBubble1 : talkBubble2}
        alt="word bubble"
      />
      <div className={`star-bg-container flex-container child-${childNum}`}>
        <img
          className={`star-bg`}
          src={avatarStar}
          alt="star blast background"
        />
      </div>
      <div
        className={`child-avatar-container flex-container child-${childNum}`}
      >
        <img
          className={`child-avatar`}
          src={child.AvatarURL}
          alt="child avatar"
        />
      </div>
      {childNum === 1 && (
        <p className="user-indicator text-light font-display">(You)</p>
      )}
    </div>
  );
};

export default RenderChild;
