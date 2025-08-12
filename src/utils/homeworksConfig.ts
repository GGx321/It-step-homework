export interface HomeworkConfig {
  id: string;
  path: string;
  title: string;
  description: string;
  tags: string[];
}

export const homeworksConfig: HomeworkConfig[] = [
  {
    id: '1',
    path: '/homeworks/1',
    title: 'Практика',
    description: 'Повторениие',
    tags: ['Повторение', 'Children', 'Условный рендеринг', 'Списки'],
  },
  {
    id: '2',
    path: '/homeworks/2',
    title: 'useState, обробники подій',
    description: ' Мініпроєкт “Інтерактивні компоненти”',
    tags: ['useState', 'обработчики событий'],
  },
  {
    id: '3',
    path: '/homeworks/3',
    title: 'useEffect, api request',
    description: 'useEffect — основи, useEffect + fetch',
    tags: ['useEffect', 'api', 'контекст'],
  },
  {
    id: '4',
    path: '/homeworks/4',
    title: 'useState для форм, практика',
    description: 'Комбінування useState + події + робота с формами',
    tags: ['useState', 'форми', 'події'],
  },
  {
    id: '5',
    path: '/homeworks/5',
    title: 'debounce',
    description: 'React + useEffect + debounce',
    tags: ['debounce', 'оптимізація', 'події'],
  },
];

export function getHomeworkByPath(path: string): HomeworkConfig | undefined {
  return homeworksConfig.find((homework) => homework.path === path);
}

export function getAllHomeworks(): HomeworkConfig[] {
  return homeworksConfig;
}
