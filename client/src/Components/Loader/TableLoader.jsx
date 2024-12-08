import React from "react";

const TableLoader = ({ colCounts }) => {
  return Array.from({ length: 5 }).map((_, index) =>(
    <tr key={index}>
      {Array.from({ length: colCounts }).map((_, i) =>
        <td key={i}>
          <div className="skeleton skeleton-text" />
        </td>
      )}
    </tr>
  ));
};

export default TableLoader;
