const getValueForType = type => {
  console.log("asd", type);
  switch (type) {
    case "header":
      return "#\u0020";
    case "block":
      return "```\n\n```";
    case "link":
      return '[Link text](http://www.google.com\u0020"Title text")';
    case "image":
      return "![Minion](https://octodex.github.com/images/minion.png)";
    default:
      return new Error("Invalid element");
  }
};

export const insertToTextarea = (elemRef, type, cursorAfter = "END") => {
  if (!elemRef && elemRef.current.value) return;

  let value;
  const lineBreakElements = ["header", "codeBlock"];
  let [initSelectionStart, initSelectionEnd] = getCursorLocation(elemRef);

  const previousChar = elemRef.current.value[initSelectionStart - 1];
  const beforePreviousChar = elemRef.current.value[initSelectionStart - 2];

  if (
    lineBreakElements.includes(type) &&
    previousChar &&
    previousChar !== "\n"
  ) {
    // check if user is creating subtitle
    if (
      type === "header" &&
      previousChar === "\u0020" &&
      beforePreviousChar === "#"
    ) {
      value = getValueForType(type);
      initSelectionStart = initSelectionStart - 1;
      initSelectionEnd = initSelectionEnd - 1;
    } else {
      // break line if other conditions are not valid
      value = `\n${getValueForType(type)}`;
    }
  } else value = getValueForType(type);

  if (!value) return;

  const textBegin = elemRef.current.value.substring(0, initSelectionStart);
  const textEnd = elemRef.current.value.substring(
    initSelectionEnd,
    elemRef.current.value.length
  );

  elemRef.current.focus();

  if (cursorAfter.toUpperCase() === "CENTER") {
    elemRef.current.value = textBegin + value + textEnd;
    elemRef.current.selectionStart =
      initSelectionStart + value.length - value.length / 2;
    elemRef.current.selectionEnd =
      initSelectionEnd + value.length - value.length / 2;
  } else if (cursorAfter.toUpperCase() === "END") {
    elemRef.current.value = textBegin + value + textEnd;
    elemRef.current.selectionStart = initSelectionStart + value.length;
    elemRef.current.selectionEnd = initSelectionEnd + value.length;
  }
};

export const getCursorLocation = elemRef => {
  const initSelectionStart = elemRef.current.selectionStart;
  const initSelectionEnd = elemRef.current.selectionEnd;
  return [initSelectionStart, initSelectionEnd];
};
