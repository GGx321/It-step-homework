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
    title: 'Props, Children, Условный рендеринг, Списки',
    description: 'Повторениие',
    tags: ['Повторение', 'Children', 'Условный рендеринг', 'Списки'],
  },
];

export function getHomeworkByPath(path: string): HomeworkConfig | undefined {
  return homeworksConfig.find((homework) => homework.path === path);
}

export function getAllHomeworks(): HomeworkConfig[] {
  return homeworksConfig;
}
