import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import Results from './Results';
import { mathLogic } from './mathLogic';

function App() {
  const styles = {
    backgroundColor: 'white',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const tableStyles = {
    backgroundColor: 'darkblue',
    width: '80%',
    margin: '0 auto',
    borderCollapse: 'collapse',
    border: '1px solid white',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const thStyles = {
    backgroundColor: 'white',
    font: '0.8rem Roboto, sans-serif',
    color: 'darkblue',
    padding: '1rem',
    textAlign: 'left',
    borderBottom: '1px solid white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  };

  const tdStyles = {
    color: 'white',
    font: 'bold 0.9rem Roboto, sans-serif',
    padding: '1rem',
    borderBottom: '1px solid white',
  };

  const inputStyles = {
    backgroundColor: 'white',
    border: 'none',
    color: 'black',
    font: '0.9rem Roboto, sans-serif',
    width: '100%',
    padding: '0.5rem',
    boxSizing: 'border-box',
  };

  const buttonStyles = {
    alignItems: 'center',
    backgroundColor: '#bf0202',
    color: 'white',
    font: 'bold 0.9rem Roboto, sans-serif',
    border: 'none',
    borderRadius: '8px',
    padding: '1rem',
    marginTop: '1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease-in-out',
    width: '100px',
  };

  const resetButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#02b087',
    color: 'white',
  };

  const headerStyle = {
    marginBottom: '-1rem',
    textAlign: 'center',
    font: 'bold 2rem/1.5 Roboto, sans-serif',
  };

  const subheaderStyle = {
    font: '1.5rem Roboto, sans-serif',
    marginBottom: '4rem',
    fontSize: '1.5rem',
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#555',
  };

  const tooltipStyle = {
    display: 'inline-block',
    marginLeft: '8px',
    padding: '2px 6px',
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    color: '#333',
    fontSize: '12px',
    lineHeight: 1,
    textAlign: 'center',
    cursor: 'help',
  };

  return (
    <div>
      <h1 style={headerStyle}>Database Calculator</h1>
      <h2 style={subheaderStyle}>Determine how much the database would cost as per your needs</h2>
      <div style={styles}>
        <form>
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={thStyles}>Parameter</th>
                <th style={thStyles}>Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: 'Number of companies',
                  defaultValue: 200,
                  tooltip:
                    'The estimated number of companies which will be participating in the usage of the marketplace.',
                  inputName: 'numCompany',
                },
                {
                  label: 'Number of users per company',
                  defaultValue: 1,
                  tooltip: 'An estimate of the number of users in each company.',
                  inputName: 'numUsersperCompany',
                },
                {
                  label: 'Percentage of active users',
                  defaultValue: 80,
                  tooltip:
                    'An estimate of 80% has been set to default to estimate the percentage of total users created who are actively using the marketplace.',
                  inputName: 'numUsersActive',
                },
                {
                  label: 'Number of listings per user per month',
                  defaultValue: 10,
                  tooltip: 'The number of listings each user has (per month).',
                  inputName: 'numListings',
                },
                {
                  label: 'Number of chat rooms opened per listing',
                  defaultValue: 5,
                  tooltip: 'Both buy and sell are included.',
                  inputName: 'numRooms',
                },
                {
                  label: 'Number of messages per chat',
                  defaultValue: 10,
                  tooltip: 'An estimate of the number of messages in a chat room.',
                  inputName: 'numMessages',
                },
                {
                  label: 'Number of categories',
                  defaultValue: 25,
                  tooltip: 'Number of categories in the marketplace system.',
                  inputName: 'numCategories',
                },
                {
                  label: 'Number of Parameters per category',
                  defaultValue: 10,
                  tooltip: 'The estimated number of parameters in each category.',
                  inputName: 'numParams',
                },
              ].map(({ label, defaultValue, tooltip, inputName }) => (
                <tr key={label}>
                  <td style={tdStyles}>
                    {label}
                    <Tippy content={tooltip} theme="custom-white-box">
                      <span className="tooltip-icon" style={tooltipStyle}>
                        i
                      </span>
                    </Tippy>
                  </td>
                  <td style={tdStyles}>
                    <input type="number" defaultValue={defaultValue} style={inputStyles} />
                  </td>
                </tr>
              ))}
              {/* submit and reset buttons */}
              <tr>
                <td colSpan="2" style={{ textAlign: 'right' }}>
                  <button type="submit" style={buttonStyles}>
                    Calculate
                  </button>
                  <button
                    type="reset"
                    style={{
                      ...resetButtonStyles,
                      marginLeft: '1rem',
                    }}
                  >
                    Reset
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td colSpan="2">
                  <Results />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default App;
