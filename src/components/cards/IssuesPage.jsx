import React, { useState, useEffect } from 'react';
//import './css pages/Dashboard.css';

function IssuesPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace this with your actual API endpoint to fetch all issues
    fetch('/api/issues/all')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setIssues(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading issues...</div>;
  }

  if (error) {
    return <div>Error fetching issues: {error.message}</div>;
  }

  return (
    <div className="issues-page">
      <h1>Vehicle Issues</h1>
      {issues.length > 0 ? (
        <ul>
          {issues.map(issue => (
            <li key={issue.id}>
              {issue.description} - Reported on: {issue.reportedDate} - Status: {issue.status}
              {/* Add links to view details or resolve issues */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No issues reported.</p>
      )}
      {/* You can add filtering by status, severity, etc. */}
    </div>
  );
}

export default IssuesPage;