import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { emojiList, emojiLimit } from '../../utils/constants';

const Emoji = props => {
  const { emoji, handleClick } = props;
  return (
    <button className="Emoji" onClick={() => handleClick(emoji)}>
      {emoji}
    </button>
  );
};
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
    <div className="EmojiPicker">
      <Card title="Give Feedback" className="emoji-feedback-card">
        <div>
          {selectedEmojis.map(emoji => (
            <Emoji emoji={emoji} handleClick={handleRemoveEmoji} />
          ))}
        </div>
      </Card>
      <Card className="emoji-selection-card">
        {emojiList.map(emoji => (
          <Emoji emoji={emoji} handleClick={handleAddEmoji} />
        ))}
      </Card>
    </div>
  );
};
export default EmojiPicker;
