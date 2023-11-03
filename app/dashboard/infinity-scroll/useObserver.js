"use client";

import { useEffect } from "react";
export const useObserver = ({
  target, // 감지할 대상 (ref를 넘길 예정)
  onIntersect, // 감지 시 실행할 callback 함수
  root = null,
  rootMargin = "0px",
  threshold = 1,
}) => {
  useEffect(() => {
    let observer;
    if (target && target.current) {
      // 넘어오는 element가 있어야 observer 생성할 수 있게 함
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target, rootMargin, threshold]);
};
