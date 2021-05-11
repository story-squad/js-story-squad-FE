import React, { useState, useEffect } from 'react';
import { emojiList, emojiLimit } from '../../utils/constants';
import emojiIcon from '../../assets/icons/emoji.svg';

const EmojiPicker = props => {
  const { getChildState } = props;
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  //If parent component wants to get this state, pass cb into props. Converts Array to String of emojis to match backend data type.
  useEffect(() => {
    const selectedEmojisString = selectedEmojis.join('') + ',';
    if (getChildState) {
      getChildState(selectedEmojisString);
    }
  }, [selectedEmojis, getChildState]);
  const handleAddEmoji = emoji => {
    if (selectedEmojis.length < emojiLimit && !selectedEmojis.includes(emoji)) {
      setSelectedEmojis([...selectedEmojis, emoji]);
    }
  };
  const handleRemoveEmoji = emoji => {
    setSelectedEmojis(
      selectedEmojis.filter(selectedEmoji => selectedEmoji !== emoji)
    );
  };
  return (
    <div className="emoji-picker center-self">
      <div className="selected-emojis">
        {selectedEmojis.map(emoji => (
          <Emoji emoji={emoji} handleClick={handleRemoveEmoji} />
        ))}
        <button className="emoji-keyboard-button">
          <img src={emojiIcon} alt="emoji keyboard icon" />
          <span>keyboard</span>
        </button>
      </div>
      {emojiList.map(emoji => (
        <Emoji emoji={emoji} handleClick={handleAddEmoji} />
      ))}
    </div>
  );
};

const Emoji = props => {
  const { emoji, handleClick } = props;
  return (
    <button className="emoji" onClick={() => handleClick(emoji)}>
      {emoji}
    </button>
  );
};

export default EmojiPicker;
