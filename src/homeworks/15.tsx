import HomeworkPage from '../components/HomeworkPage';
import { ThemeProvider } from './components/ThemeContext15';
import { AuthProvider } from './components/AuthContext';
import { LanguageProvider } from './components/LanguageContext15';
import Header15 from './components/Header15';
import Main15 from './components/Main15';
import Footer15 from './components/Footer15';

export default function Homework15() {
  return (
    <HomeworkPage>
      {/* Обгортаємо додаток у провайдери Context API */}
      <LanguageProvider>
        <AuthProvider>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col">
              <Header15 />
              <Main15 />
              <Footer15 />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </LanguageProvider>
    </HomeworkPage>
  );
}
