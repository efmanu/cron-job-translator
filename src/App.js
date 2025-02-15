import React, { useState } from 'react';
import cronstrue from 'cronstrue';
import './App.css';

function App() {
  const [cronExpression, setCronExpression] = useState('');
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState('');

  const handleCronTranslation = (value) => {
    setCronExpression(value);
    try {
      if (value.trim()) {
        const translated = cronstrue.toString(value);
        setExplanation(translated);
        setError('');
      } else {
        setExplanation('');
        setError('');
      }
    } catch (err) {
      setError('Invalid cron expression');
      setExplanation('');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>✨ Cron Expression Translator ✨</h1>
        <div className="cron-input">
          <textarea
            placeholder="Enter your cron expression (e.g., '*/5 * * * *')"
            value={cronExpression}
            onChange={(e) => handleCronTranslation(e.target.value)}
          />
        </div>
        <div className="result">
          {error ? (
            <div className="error">{error}</div>
          ) : (
            explanation && (
              <div className="explanation">
                <h2>Translation:</h2>
                <p>{explanation}</p>
              </div>
            )
          )}
        </div>
        <div className="helper">
          <h3>Cron Format:</h3>
          <p className="format-intro">A cron expression consists of five or six fields:</p>
          
          <table className="format-table">
            <tbody>
              <tr>
                <td>Minutes</td>
                <td>0-59</td>
                <td>When in the minute should this run</td>
              </tr>
              <tr>
                <td>Hours</td>
                <td>0-23</td>
                <td>Which hour of the day</td>
              </tr>
              <tr>
                <td>Day of Month</td>
                <td>1-31</td>
                <td>Which day of the month</td>
              </tr>
              <tr>
                <td>Month</td>
                <td>1-12 or JAN-DEC</td>
                <td>Which month of the year</td>
              </tr>
              <tr>
                <td>Day of Week</td>
                <td>0-6 or SUN-SAT</td>
                <td>Which day of the week (0 = Sunday)</td>
              </tr>
            </tbody>
          </table>

          <div className="special-chars">
            <h4>Special Characters:</h4>
            <ul>
              <li><code>*</code> - Any value</li>
              <li><code>,</code> - Value list separator (e.g., "1,3,5")</li>
              <li><code>-</code> - Range of values (e.g., "1-5")</li>
              <li><code>/</code> - Step values (e.g., "*/5")</li>
              <li><code>@yearly</code> - Run once a year (0 0 1 1 *)</li>
              <li><code>@monthly</code> - Run once a month (0 0 1 * *)</li>
              <li><code>@weekly</code> - Run once a week (0 0 * * 0)</li>
              <li><code>@daily</code> - Run once a day (0 0 * * *)</li>
              <li><code>@hourly</code> - Run once an hour (0 * * * *)</li>
            </ul>
          </div>

          <div className="examples">
            <h4>Examples:</h4>
            <ul>
              <li><code>* * * * *</code> - Every minute</li>
              <li><code>0 * * * *</code> - Every hour</li>
              <li><code>0 0 * * *</code> - Every day at midnight</li>
              <li><code>*/15 * * * *</code> - Every 15 minutes</li>
              <li><code>0 2 * * *</code> - Every day at 2 AM</li>
              <li><code>0 9-17 * * MON-FRI</code> - Every hour from 9 AM to 5 PM, Monday to Friday</li>
              <li><code>0 0 * * MON</code> - Every Monday at midnight</li>
              <li><code>0 0 1,15 * *</code> - 1st and 15th of every month</li>
            </ul>
          </div>
        </div>

        <div className="analysis-section">
          <h3>How to Analyze Cron Jobs</h3>
          
          <div className="analysis-block">
            <h4>1. Frequency Analysis</h4>
            <p>Check how often your cron job runs:</p>
            <ul>
              <li>High frequency (every minute/hour) may impact system performance</li>
              <li>Low frequency might miss critical updates</li>
              <li>Consider business hours vs. off-hours scheduling</li>
            </ul>
          </div>

          <div className="analysis-block">
            <h4>2. Resource Impact</h4>
            <p>Consider these factors:</p>
            <ul>
              <li>CPU usage during execution</li>
              <li>Memory requirements</li>
              <li>Disk I/O operations</li>
              <li>Network bandwidth usage</li>
            </ul>
          </div>

          <div className="analysis-block">
            <h4>3. Common Patterns</h4>
            <table className="patterns-table">
              <tbody>
                <tr>
                  <td><code>0 0 * * *</code></td>
                  <td>Daily maintenance tasks</td>
                </tr>
                <tr>
                  <td><code>0 */4 * * *</code></td>
                  <td>Regular monitoring</td>
                </tr>
                <tr>
                  <td><code>0 1 * * 0</code></td>
                  <td>Weekly backups</td>
                </tr>
                <tr>
                  <td><code>0 0 1 * *</code></td>
                  <td>Monthly reports</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="analysis-block">
            <h4>4. Best Practices</h4>
            <ul>
              <li>Log all cron job executions and their outcomes</li>
              <li>Set up monitoring for failed executions</li>
              <li>Implement error handling and retries</li>
              <li>Consider timezone implications</li>
              <li>Avoid overlapping executions for long-running jobs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 