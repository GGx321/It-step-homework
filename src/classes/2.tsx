import {
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  Navigate,
  Outlet,
  NavLink,
} from 'react-router-dom';
import { createContext, useContext, useState } from 'react';
import HomeworkPage from '../components/HomeworkPage';

// Дані про продукти
const products = [
  {
    id: 1,
    name: 'Laptop',
    description: 'Потужний ноутбук для роботи та ігор',
    price: 25000,
  },
  {
    id: 2,
    name: 'Phone',
    description: 'Смартфон з відмінною камерою',
    price: 15000,
  },
  {
    id: 3,
    name: 'Headphones',
    description: 'Бездротові навушники з шумопоглинанням',
    price: 3000,
  },
];

// Контекст для авторизації
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Контекст для кошика
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: { id: number; name: string; price: number }) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Хук для роботи з відносними шляхами
function useRelativePaths() {
  const basePath = '/classes/2';

  const getPath = (path: string) => {
    if (path.startsWith('/')) {
      return `${basePath}${path}`;
    }
    return `${basePath}/${path}`;
  };

  return { getPath, basePath };
}

// Компонент головної сторінки
function HomePage() {
  const { getPath } = useRelativePaths();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-800">
          Ласкаво просимо!
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          Ознайомтесь з нашими продуктами
        </p>
        <Link
          to={getPath('/products')}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
        >
          Переглянути продукти
        </Link>
      </div>
    </div>
  );
}

// Компонент списку продуктів
function ProductsPage() {
  const { getPath } = useRelativePaths();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Наші продукти</h1>
          <Link
            to={getPath('/')}
            className="rounded-lg bg-gray-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-gray-700"
          >
            На головну
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="mb-4 text-gray-600">{product.description}</p>
              <p className="mb-4 text-2xl font-bold text-blue-600">
                {product.price} грн
              </p>
              <Link
                to={getPath(`/products/${product.id}`)}
                className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
              >
                Деталі
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Компонент деталей продукту
function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPath } = useRelativePaths();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">
            Продукт не знайдено
          </h1>
          <button
            onClick={() => navigate(getPath('/products'))}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
          >
            Повернутися до продуктів
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <button
              onClick={() => navigate(getPath('/products'))}
              className="rounded-lg bg-gray-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-gray-700"
            >
              Back to Products
            </button>
          </div>
          <p className="mb-4 text-xl text-gray-600">{product.description}</p>
          <p className="mb-6 text-3xl font-bold text-blue-600">
            {product.price} грн
          </p>

          <div className="mb-6 flex space-x-4">
            <button
              onClick={() => {
                addToCart(product);
                navigate(getPath('/cart'));
              }}
              className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>

          <div className="border-t pt-6">
            <div className="mb-4 flex space-x-4">
              <NavLink
                to={getPath(`/products/${product.id}`)}
                end
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`
                }
              >
                Деталі
              </NavLink>
              <NavLink
                to={getPath(`/products/${product.id}/reviews`)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`
                }
              >
                Відгуки
              </NavLink>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

// Компонент відгуків (вкладений маршрут)
function ProductReviews() {
  const { getPath } = useRelativePaths();
  const { isLoggedIn } = useAuth();

  // Автоматичний редірект якщо користувач не авторизований
  if (!isLoggedIn) {
    return <Navigate to={getPath('/login')} replace />;
  }

  const reviews = [
    {
      id: 1,
      author: 'Іван',
      text: 'Відмінний продукт! Дуже задоволений покупкою.',
      rating: 5,
    },
    {
      id: 2,
      author: 'Марія',
      text: 'Якість на висоті, рекомендую всім.',
      rating: 4,
    },
    {
      id: 3,
      author: 'Петро',
      text: 'Хороший продукт за свої гроші.',
      rating: 4,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">
        Відгуки про продукт
      </h3>
      {reviews.map((review) => (
        <div key={review.id} className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-semibold text-gray-800">{review.author}</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-600">{review.text}</p>
        </div>
      ))}
    </div>
  );
}

// Компонент сторінки логіну
function LoginPage() {
  const navigate = useNavigate();
  const { getPath } = useRelativePaths();
  const { login } = useAuth();

  const handleLogin = () => {
    login();
    navigate(getPath('/products'));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Вхід
        </h1>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Пароль
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-700"
          >
            Увійти
          </button>
        </div>
        <div className="mt-6 text-center">
          <Link to={getPath('/')} className="text-blue-600 hover:text-blue-800">
            Повернутися на головну
          </Link>
        </div>
      </div>
    </div>
  );
}

// Компонент кошика (додатково для швидких студентів)
function CartPage() {
  const navigate = useNavigate();
  const { getPath } = useRelativePaths();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-800">Кошик</h1>
              <button
                onClick={() => navigate(getPath('/products'))}
                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
              >
                Продовжити покупки
              </button>
            </div>
            <div className="py-12 text-center">
              <p className="mb-4 text-xl text-gray-600">Ваш кошик порожній</p>
              <p className="text-gray-500">
                Додайте товари з каталогу продуктів
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">
              Кошик ({getTotalItems()} товарів)
            </h1>
            <button
              onClick={() => navigate(getPath('/products'))}
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
            >
              Продовжити покупки
            </button>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">{item.price} грн</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="rounded-full bg-gray-200 p-1 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="rounded-full bg-gray-200 p-1 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                  >
                    Видалити
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold text-gray-800">
                Загальна сума: {getTotalPrice()} грн
              </div>
              <button className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
                Оформити замовлення
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Провайдер для кошика
function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: { id: number; name: string; price: number }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Провайдер для авторизації
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const value: AuthContextType = {
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Індикатор кількості товарів у кошику
function CartIndicator() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  return (
    <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
      {totalItems}
    </span>
  );
}

// Головний компонент додатку
function App() {
  const { getPath } = useRelativePaths();

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-md">
            <div className="mx-auto max-w-6xl px-4">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center space-x-8">
                  <Link
                    to={getPath('/')}
                    className="text-xl font-bold text-gray-800"
                  >
                    Магазин
                  </Link>
                  <div className="flex space-x-4">
                    <NavLink
                      to={getPath('/products')}
                      className={({ isActive }) =>
                        `rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`
                      }
                    >
                      Продукти
                    </NavLink>
                    <NavLink
                      to={getPath('/cart')}
                      className={({ isActive }) =>
                        `rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`
                      }
                    >
                      Кошик
                      <CartIndicator />
                    </NavLink>
                  </div>
                </div>
                <Link
                  to={getPath('/login')}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
                >
                  Увійти
                </Link>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />}>
              <Route path="reviews" element={<ProductReviews />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default function Classes2() {
  return (
    <HomeworkPage>
      <App />
    </HomeworkPage>
  );
}
