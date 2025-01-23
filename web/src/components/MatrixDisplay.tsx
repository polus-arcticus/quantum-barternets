import React from 'react';
import * as math from 'mathjs';

const MatrixDisplay = ({ matrix, precision = 1 }) => {
  if (!matrix) return <div>Loading...</div>;
  console.log('matrix', matrix)

  // Convert to array if it's a mathjs matrix

  const data = matrix.toArray();
  return (
    <div className="overflow-x-auto font-mono">
      <table className="border-collapse">
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td className="pr-2 text-gray-500 select-none">
                {i === 0 ? '⎡' : i === data.length-1 ? '⎣' : '⎢'}
              </td>
              {row.map((val, j) => (
                <td key={j} className="px-2 text-right">
                  {math.format(val, { precision })}
                </td>
              ))}
              <td className="pl-2 text-gray-500 select-none">
                {i === 0 ? '⎤' : i === data.length-1 ? '⎦' : '⎥'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixDisplay;
