import React from "react";
import moment from "moment";

const Playground = () => {
  const now = moment().format("D/MM/YYYY");
  return (
    <div>
      <h2>Leikkikenttä ja testilaboratorio</h2>
      <p>{now}</p>
    </div>
  );
};

export default Playground;