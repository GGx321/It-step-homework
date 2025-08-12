export const translations = {
  ua: {
    header: {
      title: 'Заголовок додатку',
      toggleTheme: 'Перемкнути тему'
    },
    profile: {
      title: 'Профіль користувача',
      email: 'Email',
      changeName: 'Змінити ім\'я'
    },
    app: {
      title: 'Застосунок з контекстами',
      description: 'Демонстрація UserContext та ThemeContext'
    },
    theme: {
      light: 'Світла',
      dark: 'Темна'
    }
  },
  en: {
    header: {
      title: 'App Header',
      toggleTheme: 'Toggle Theme'
    },
    profile: {
      title: 'User Profile',
      email: 'Email',
      changeName: 'Change Name'
    },
    app: {
      title: 'Context API App',
      description: 'UserContext and ThemeContext demo'
    },
    theme: {
      light: 'Light',
      dark: 'Dark'
    }
  }
};

export type Language = 'ua' | 'en';
export type TranslationKey = keyof typeof translations.ua;
