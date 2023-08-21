"use client";

import { onLogout } from "../../util/onLogout";

const Example = () => {
  return (
    <div style={{ height: "200vh" }}>
      <button
        onClick={() => {
          onLogout();
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default Example;
