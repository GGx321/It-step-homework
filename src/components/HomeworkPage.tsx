import React from 'react';
import { useLocation } from 'react-router-dom';
import PageShell from './PageShell';
import { getHomeworkByPath } from '../utils/homeworksConfig';

interface HomeworkPageProps {
  children: React.ReactNode;
}

export const HomeworkPage: React.FC<HomeworkPageProps> = ({ children }) => {
  const location = useLocation();
  const homework = getHomeworkByPath(location.pathname);

  return (
    <PageShell>
      {homework && (
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          {homework.title}
        </h1>
      )}
      {children}
    </PageShell>
  );
};

export default HomeworkPage;
