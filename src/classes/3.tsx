import HomeworkPage from '../components/HomeworkPage';
import WeatherWidget from './components/WeatherWidget';
import CatWidget from './components/CatWidget';

interface WeatherData {
  temperature: number;
  weather: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  location: {
    city: string;
    country: string;
  };
}

export default function Classes3() {
  const handleWeatherUpdate = (weatherData: WeatherData) => {
    return weatherData;
  };

  return (
    <HomeworkPage>
      <div className="weather-cat-container">
        <h2>Погода и котики</h2>

        {/* Weather Section */}
        <WeatherWidget onWeatherUpdate={handleWeatherUpdate} />

        {/* Cat Section */}
        <CatWidget />
      </div>
    </HomeworkPage>
  );
}
