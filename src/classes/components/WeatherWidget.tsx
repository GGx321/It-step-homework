import { useState } from 'react';
import axios from 'axios';
import { fetchWeatherApi } from 'openmeteo';

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

interface WeatherWidgetProps {
  onWeatherUpdate: (weather: WeatherData) => void;
}

export default function WeatherWidget({ onWeatherUpdate }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to get user's current location
  const getCurrentLocation = (): Promise<{
    latitude: number;
    longitude: number;
  }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      console.log('Requesting geolocation...');

      const options = {
        enableHighAccuracy: false, // Changed to false for faster response
        timeout: 15000, // Increased timeout
        maximumAge: 300000, // 5 minutes cache
      };

      // Try with different options if first attempt fails
      const tryGeolocation = (attemptNumber: number = 1) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('✅ Location obtained successfully:', position.coords);
            console.log('Accuracy:', position.coords.accuracy, 'meters');
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error(
              `❌ Geolocation error (attempt ${attemptNumber}):`,
              error,
            );
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);

            // Try different approach on second attempt
            if (attemptNumber === 1 && (error.code === 1 || error.code === 2)) {
              console.log('🔄 Retrying with different options...');
              setTimeout(() => {
                tryGeolocation(2);
              }, 1000);
              return;
            }

            let errorMessage = 'Unknown error';

            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage =
                  'Доступ к геолокации запрещен. Проверьте настройки macOS: Системные настройки → Конфиденциальность → Службы геолокации';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage =
                  'Информация о местоположении недоступна. Проверьте настройки macOS.';
                break;
              case error.TIMEOUT:
                errorMessage =
                  'Превышено время ожидания получения местоположения.';
                break;
              default:
                errorMessage = `Неизвестная ошибка: ${error.message}`;
            }

            reject(new Error(errorMessage));
          },
          options,
        );
      };

      tryGeolocation();
    });
  };

  // Function to get city and country from coordinates
  const getLocationInfo = async (
    latitude: number,
    longitude: number,
  ): Promise<{ city: string; country: string }> => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=ru`,
      );

      const data = response.data;
      const address = data.address;

      // Try to get city name from different fields
      const city =
        address.city ||
        address.town ||
        address.village ||
        address.county ||
        'Неизвестный город';
      const country = address.country || 'Неизвестная страна';

      return { city, country };
    } catch (err) {
      console.error('Error getting location info:', err);
      return { city: 'Неизвестный город', country: 'Неизвестная страна' };
    }
  };

  // Function to fetch weather data
  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      setLoadingWeather(true);
      setError(null);

      const params = {
        latitude: latitude,
        longitude: longitude,
        current: 'temperature_2m,weather_code',
        timezone: 'auto',
      };

      const url = 'https://api.open-meteo.com/v1/forecast';
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];

      const current = response.current();
      if (!current) {
        throw new Error('No current data available');
      }

      const temperatureVar = current.variables(0);
      const weatherCodeVar = current.variables(1);

      if (!temperatureVar || !weatherCodeVar) {
        throw new Error('Weather variables not available');
      }

      const temperatureArray = temperatureVar.valuesArray();
      const weatherCodeArray = weatherCodeVar.valuesArray();

      if (
        !temperatureArray ||
        !weatherCodeArray ||
        temperatureArray.length === 0 ||
        weatherCodeArray.length === 0
      ) {
        throw new Error('Weather data arrays are empty or unavailable');
      }

      const temperature = temperatureArray[0]; // Current temperature
      const weatherCode = weatherCodeArray[0]; // Current weather code

      // Convert weather code to description
      const getWeatherDescription = (code: number): string => {
        if (code === 0) return 'Clear sky';
        if (code >= 1 && code <= 3) return 'Partly cloudy';
        if (code >= 45 && code <= 48) return 'Foggy';
        if (code >= 51 && code <= 55) return 'Drizzle';
        if (code >= 56 && code <= 57) return 'Freezing drizzle';
        if (code >= 61 && code <= 65) return 'Rain';
        if (code >= 66 && code <= 67) return 'Freezing rain';
        if (code >= 71 && code <= 75) return 'Snow';
        if (code >= 77 && code <= 77) return 'Snow grains';
        if (code >= 80 && code <= 82) return 'Rain showers';
        if (code >= 85 && code <= 86) return 'Snow showers';
        if (code >= 95 && code <= 95) return 'Thunderstorm';
        if (code >= 96 && code <= 99) return 'Thunderstorm with hail';
        return 'Unknown';
      };

      const coordinates = {
        latitude: response.latitude() || 0,
        longitude: response.longitude() || 0,
      };

      // Get city and country information
      const locationInfo = await getLocationInfo(
        coordinates.latitude,
        coordinates.longitude,
      );

      const weatherData = {
        temperature: temperature,
        weather: getWeatherDescription(weatherCode),
        coordinates: coordinates,
        location: locationInfo,
      };

      setWeather(weatherData);
      onWeatherUpdate(weatherData);
    } catch (err) {
      setError(
        `Error fetching weather: ${err instanceof Error ? err.message : 'Unknown error'}`,
      );
    } finally {
      setLoadingWeather(false);
    }
  };

  const handleGetLocation = () => {
    setError(null);
    getCurrentLocation()
      .then((location) => fetchWeather(location.latitude, location.longitude))
      .catch((err) => setError(`Ошибка геолокации: ${err.message}`));
  };

  const handleForceRefresh = () => {
    setError(null);
    console.log('🔄 Force refreshing geolocation...');
    // Force a fresh geolocation request
    setTimeout(() => {
      getCurrentLocation()
        .then((location) => fetchWeather(location.latitude, location.longitude))
        .catch((err) => setError(`Ошибка геолокации: ${err.message}`));
    }, 500);
  };

  return (
    <div className="weather-section">
      <div className="weather-controls mb-4">
        <button
          onClick={handleGetLocation}
          className="mr-2 rounded-lg bg-green-500 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-green-600"
        >
          Получить мою локацию
        </button>
        <button
          onClick={handleForceRefresh}
          className="rounded-lg bg-yellow-500 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-yellow-600"
        >
          Принудительно обновить
        </button>
      </div>

      {loadingWeather ? (
        <p>Загружаем погоду...</p>
      ) : weather ? (
        <div className="weather-info">
          <p>
            <strong>Temperature:</strong> {weather.temperature.toFixed(0)}°C
          </p>
          <p>
            <strong>Weather:</strong> {weather.weather}
          </p>
          <p>
            <strong>City:</strong> {weather.location.city}
          </p>
          <p>
            <strong>Country:</strong> {weather.location.country}
          </p>
          <p>
            <strong>Coordinates:</strong>{' '}
            {weather.coordinates.latitude.toFixed(2)}°N,{' '}
            {weather.coordinates.longitude.toFixed(2)}°E
          </p>
        </div>
      ) : (
        <p>
          Местоположение: <strong>Неизвестно</strong>
        </p>
      )}

      {/* Error Display */}
      {error && (
        <div className="error-message">
          <p style={{ color: 'red' }}>{error}</p>
          {error.includes('macOS') && (
            <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
              <p className="mb-2 font-medium text-blue-800">
                🔧 Как исправить проблему с геолокацией на macOS:
              </p>
              <ol className="list-inside list-decimal space-y-1 text-sm text-blue-700">
                <li>
                  Откройте <strong>Системные настройки</strong>
                </li>
                <li>
                  Перейдите в <strong>Конфиденциальность и безопасность</strong>
                </li>
                <li>
                  Выберите <strong>Службы геолокации</strong>
                </li>
                <li>Убедитесь, что ваш браузер включен в список</li>
                <li>Если браузера нет - добавьте его вручную</li>
                <li>Перезапустите браузер</li>
              </ol>
              <p className="mt-2 text-sm text-blue-700">
                После изменения настроек попробуйте кнопку "Принудительно
                обновить"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
