import React from "react";

const Stars = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <style>{`
        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }

        @keyframes animStar2 {
         from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-3000px);
          }
        }

        .star {
          width: 1px;
          height: 1px;
          background: transparent;
          animation: animStar 50s linear infinite;
        }
        .star-2 {
            width: 2px;
            height: 2px;
            background: transparent;
            animation: animStar 100s linear infinite;
        }
        .star-3 {
            width: 3px;
            height: 3px;
            background: transparent;
            animation: animStar 150s linear infinite;
        }
        .star-4 {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: transparent;
            animation: animStar2 80s linear infinite;
        }
      `}</style>
      <div
        className="star"
        style={{
          boxShadow: Array.from(
            { length: 600 },
            () =>
              `${Math.floor(Math.random() * 2000)}px ${Math.floor(
                Math.random() * 2000
              )}px #FFF`
          ).join(", "),
        }}
      ></div>

      <div
        className="star-2"
        style={{
          boxShadow: Array.from(
            { length: 100 },
            () =>
              `${Math.floor(Math.random() * 2000)}px ${Math.floor(
                Math.random() * 2000
              )}px #FFF`
          ).join(", "),
        }}
      ></div>

      <div
        className="star-3"
        style={{
          boxShadow: Array.from(
            { length: 50 },
            () =>
              `${Math.floor(Math.random() * 2000)}px ${Math.floor(
                Math.random() * 2000
              )}px #FFF`
          ).join(", "),
        }}
      ></div>

      <div
        className="star-4"
        style={{
          boxShadow: Array.from(
            { length: 50 },
            () =>
              `${Math.floor(Math.random() * 3000)}px ${Math.floor(
                Math.random() * 3000
              )}px #FFF`
          ).join(", "),
        }}
      ></div>
    </div>
  );
};

export default Stars;
