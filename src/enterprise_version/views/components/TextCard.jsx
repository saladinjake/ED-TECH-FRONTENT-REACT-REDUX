import React, { Component } from "react";

const TextCard = ({ content }) => {
  return (
    <div className="">
      <div className="text-11" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default TextCard;
