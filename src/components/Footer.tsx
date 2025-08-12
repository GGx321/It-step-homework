import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#f8f9fa',
        padding: '20px 0',
        textAlign: 'center',
        borderTop: '1px solid #e9ecef',
        marginTop: 'auto',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <p style={{ margin: '0 0 10px 0', color: '#6c757d' }}>
          © 2024 It-step homework
        </p>
        <a
          href="https://github.com/GGx321/It-step-homework.git"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#007bff',
            textDecoration: 'none',
            fontSize: '14px',
          }}
        >
          View on GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
