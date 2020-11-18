import React, { createRef, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './NoteCard.module.css';

const NoteCard = ({ text: content, cardId, modifyNoteCardData, token }) => {
  // ***** 개선 방안 찾아보기!! *****
  // textarea 늘어날 때는 늘어나는 scrollHeight만큼 캐치해서 height을 늘려주면 문제없는데.
  // text를 delete 할 때는 scrollHeight가 반응해서 줄어들지가 않기 때문에....
  // 처리해줄 다른 방법이 있는지 찾아보기
  const textareaEl = createRef();
  const [text, setText] = useState(content);
  const [height, setHeight] = useState({});

  useEffect(() => {
    // * 컴포넌트 마운트 할 때, textarea 영역의 스크롤 높이만큼 Card의 height를 설정해줌
    setHeight(textareaEl.current.scrollHeight);
  }, []);

  const handleChangeInput = ({ target }) => {
    setText(target.value);
    // * 스크롤하이트가 변할 떄 textarea의 하이트도 반응해서 변경되도록 설정
    setHeight(`${target.scrollHeight}px`);
  };

  // 🌟 Blur이벤트 발생시 최상단 cardsData에 반영
  const handleChangeNoteText = ({ target }) => {
    modifyNoteCardData(cardId, target.value);

    try {
      axios //
        .post(
          'https://todaying.cf/main/updateNoteText',
          { cardId, text: target.value },
          { headers: { Authorization: `Bearer ${token}` } },
        );
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <textarea
        ref={textareaEl}
        className={styles.textArea}
        placeholder="write here"
        onChange={handleChangeInput}
        onBlur={handleChangeNoteText}
        style={{ height }}
        value={text}
        spellCheck="false"
      />
    </>
  );
};

export default NoteCard;
