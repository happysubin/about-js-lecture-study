const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  //isArray는 인자가 배열인지 체크해준다
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
  };
};

/*
import React, { useState } from "react";
import "./styles.css";

const content = [
  {
    tab: "Section 1",
    content: "I am the content of the section 1"
  },
  {
    tab: "Section 2",
    content: "I am the content of the section 2"
  }
];

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  //isArray는 인자가 배열인지 체크해준다
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex
  };
};

const App = () => {
  const { currentItem, changeItem } = useTabs(0, content); //기본값을 0이라고 가정
  return (
    <div className="App">
      {content.map((section, index) => (
        <button
          onClick={() => {
            changeItem(index);
          }}
          key={section.tab}
        >
          {section.tab}
        </button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
};
//<input placeholder="name" value={name.value} onChange={name.onChange}/>도 가능
export default App;

*/
