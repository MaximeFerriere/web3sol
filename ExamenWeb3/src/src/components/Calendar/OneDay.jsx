import React from "react";

const OneDay = ({ disas }) => {
  return (
    <li>
      {disas.date} - {disas.name}
    </li>
  );
};

export default OneDay;
