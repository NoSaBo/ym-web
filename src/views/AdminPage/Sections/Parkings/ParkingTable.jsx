import React from "react";
import Row from "../Employees/Row";


const ParkingsTable = ({ currentParkings }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>OWNER</th>
            <th>TOKEN</th>
            <th>RETURNED</th>
          </tr>
        </thead>
        <tbody>
          {currentParkings.map((parking, index) => (
            <Row
              key={index}
              value={parking}
              index={index}
              parking={parking}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParkingsTable;
