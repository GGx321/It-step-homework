import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50 py-5 text-center">
      <div className="mx-auto max-w-6xl px-5">
        <p className="mb-2.5 text-gray-500">© 2025 It-step homework</p>
        <a
          href="https://github.com/GGx321/It-step-homework.git"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 no-underline transition-colors duration-200 hover:text-blue-800 hover:underline"
        >
          View on GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
