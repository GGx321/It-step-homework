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
];

export function getHomeworkByPath(path: string): HomeworkConfig | undefined {
  return homeworksConfig.find((homework) => homework.path === path);
}

export function getAllHomeworks(): HomeworkConfig[] {
  return homeworksConfig;
}
