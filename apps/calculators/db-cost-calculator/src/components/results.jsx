import React from 'react';

function Results({ result }) {
  const boxStyle = {
    backgroundColor: '#02b087',
    padding: '2rem',
    marginTop: '2rem',
    color: 'white',
    font: 'bold 1.2rem Roboto, sans-serif',
    borderRadius: '0.5rem',
    boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.2)',
  };

  const textStyle = {
    font: 'bold 1.2rem Roboto, sans-serif',
    marginBottom: '1rem',
  };

  return (
    <div style={boxStyle}>
      <p style={textStyle}>The results are in, based on your needs:</p>
      <p>Total cost per month: ${result}</p>
    </div>
  );
}

export default Results;