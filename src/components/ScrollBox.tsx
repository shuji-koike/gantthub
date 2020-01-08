import React, { useEffect, useRef } from "react";
import styled from "styled-components";

export interface ScrollBoxEvent {
  x: number;
  y: number;
}

export const ScrollBox: React.FC<{
  onScroll?: (e: ScrollBoxEvent) => ScrollBoxEvent;
}> = function ({ onScroll, children }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const current = ref.current!;
    const listener = (event: Event) => {
      if (event.target !== current) return;
      const width = current.scrollWidth! - current.clientWidth!;
      const height = current.scrollHeight! - current.clientHeight!;
      const e = {
        x: current.scrollLeft! / width,
        y: current.scrollTop! / height,
      };
      if (onScroll) {
        const ret = onScroll(e);
        current.scrollTo({
          left: e.x !== ret.x ? ret.x * width : undefined,
          top: e.y !== ret.y ? ret.y * height : undefined,
        });
      }
    };
    current.addEventListener("scroll", listener, true);
    return () => current.removeEventListener("scroll", listener);
  }, [onScroll]);
  return <StyledDiv ref={ref}>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
`;
