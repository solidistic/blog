import { useRef, useEffect } from "react";

const useEventListener = (eventName, handler, elem = window) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!(elem && elem.addEventListener)) return;

    const eventListener = event => savedHandler.current(event);

    elem.addEventListener(eventName, eventListener);

    return () => {
      elem.removeEventListener(eventName, eventListener);
    };
  }, [eventName, elem]);
};

export default useEventListener;
