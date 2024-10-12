import React, { useState, useEffect } from 'react';

const JotFormEmbed = () => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let script: HTMLScriptElement;

    if (showForm) {
      // Create and append the script only when the form needs to be shown
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://form.jotform.com/jsform/242754750521556';
      script.async = true;

      // Append the script to the specific div container instead of document body
      const formContainer = document.getElementById('jotform-form-container');
      formContainer.appendChild(script);
    }

    return () => {
      // Cleanup: Remove the script and clear the form container when unmounting
      const formContainer = document.getElementById('jotform-form-container');
      if (formContainer && script) {
        formContainer.removeChild(script);
        formContainer.innerHTML = ''; // Clear the container
      }
    };
  }, [showForm]);

  const handleButtonClick = () => {
    setShowForm((prev) => !prev); // Toggle form visibility
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        {showForm ? 'Hide Form' : 'Show Form'}
      </button>

      {/* A dedicated div where the form will be rendered */}
      <div id="jotform-form-container" style={{ marginTop: '20px' }}>
        {showForm && <p>Form will appear here.</p>}
      </div>
    </div>
  );
};

export default JotFormEmbed;
