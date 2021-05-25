import React, { useState, useEffect } from 'react';
import { emojiList, emojiLimit } from '../../utils/constants';
import emojiIcon from '../../assets/icons/emoji.svg';

const EmojiPicker = props => {
  const { getEmojiString, defaultEmojis } = props;
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  //If parent component wants to get this state, pass cb into props. Converts Array to String of emojis to match backend data type.
  useEffect(() => {
    if (getEmojiString) {
      getEmojiString(selectedEmojis);
    }
  }, [selectedEmojis, getEmojiString]);

  useEffect(() => {
    if (defaultEmojis) {
      setSelectedEmojis(defaultEmojis);
    }
    // eslint-disable-next-line
  }, []);

  const handleToggleEmoji = emoji => {
    if (selectedEmojis.length < emojiLimit && !selectedEmojis.includes(emoji)) {
      setSelectedEmojis([...selectedEmojis, emoji]);
    } else if (selectedEmojis.includes(emoji)) {
      handleRemoveEmoji(emoji);
    }
  };

  const handleRemoveEmoji = emoji => {
    setSelectedEmojis(
      selectedEmojis.filter(selectedEmoji => selectedEmoji !== emoji)
    );
  };

  const handleKeyboardVisible = () => {
    setKeyboardVisible(!keyboardVisible);
  };

  return (
    <div className="emoji-picker">
      {keyboardVisible && (
        <div className="emoji-keyboard-position">
          <div className="emoji-keyboard-container">
            <div className="emoji-keyboard">
              {emojiList.map((emoji, i) => (
                <Emoji
                  key={i}
                  emoji={emoji}
                  selectedEmojis={selectedEmojis}
                  handleClick={handleToggleEmoji}
                />
              ))}
            </div>
            <div className="done-button-container">
              <button
                className="done-button font-size-32"
                onClick={handleKeyboardVisible}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="selected-emojis">
        {selectedEmojis.map((emoji, i) => (
          <Emoji key={i} emoji={emoji} handleClick={handleRemoveEmoji} />
        ))}
        <button
          className="emoji-keyboard-button"
          onClick={handleKeyboardVisible}
        >
          <img src={emojiIcon} alt="emoji keyboard icon" />
          <span>keyboard</span>
        </button>
      </div>
    </div>
  );
};

const Emoji = props => {
  const { emoji, handleClick, selectedEmojis } = props;
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (selectedEmojis !== undefined) {
      setIsSelected(selectedEmojis.includes(emoji));
    }
  }, [selectedEmojis, emoji]);

  return (
    <button
      className={`emoji ${isSelected ? 'selected' : ''}`}
      onClick={() => handleClick(emoji)}
    >
      {emoji}
    </button>
  );
};

export default EmojiPicker;
