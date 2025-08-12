export interface classesConfig {
  id: string;
  path: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export const classesConfig: classesConfig[] = [
  {
    id: '1',
    path: '/classes/1',
    title: 'Практика',
    description: 'Продолжаем routes',
    date: '12 августа',
    tags: ['Практика', 'React', 'Routes'],
  },
];

export function getClassByPath(path: string): classesConfig | undefined {
  return classesConfig.find((classItem) => classItem.path === path);
}

export function getAllClasses(): classesConfig[] {
  return classesConfig;
}
