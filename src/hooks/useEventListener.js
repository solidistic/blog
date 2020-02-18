import { useRef, useEffect } from "react";

// TODO!

const useEventListener = (eventName, handler, elem = window) => {
  const savedHandler = useRef();

  useEffect(() => {
    console.log("MOI");
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!(elem && elem.addEventListener)) return;
    console.log("hello?");

    const eventListener = event => savedHandler.current(event);

    elem.addEventListener(eventName, eventListener);

    return () => {
      elem.removeEventListener(eventName, eventListener);
    };
  }, [eventName, elem]);
};

export default useEventListener;
