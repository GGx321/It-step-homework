import type { ReactNode } from 'react';
import HomeworkPage from '../components/HomeworkPage';
// ===============================
// 1. Props та багаторазовість компонент, children
// ===============================

// Компонент ArticleCard з пропсами title, description, author
interface ArticleCardProps {
  title: string;
  description: string;
  author: string;
}

function ArticleCard({ title, description, author }: ArticleCardProps) {
  return (
    <>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>
        <i>Автор: {author}</i>
      </p>
    </>
  );
}

// Обгортка CardWrapper з children для стилізації
interface CardWrapperProps {
  children: ReactNode;
}

function CardWrapper({ children }: CardWrapperProps) {
  return (
    <div className="m-2 rounded-lg border-2 border-gray-300 bg-white p-4 shadow-sm">
      {children}
    </div>
  );
}

// ===============================
// 2. Умовний рендерінг
// ===============================

// Компонент AlertBox з умовним рендерінгом кольорів
interface AlertBoxProps {
  status: 'success' | 'error' | 'warning';
  text: string;
  bold?: boolean;
}

function AlertBox({ status, text, bold = false }: AlertBoxProps) {
  // Визначаємо колір тексту залежно від статусу
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <p className={`${getStatusColor()} ${bold ? 'font-bold' : ''}`}>{text}</p>
  );
}

// ===============================
// 3. Рендеринг списків
// ===============================

// Масив товарів
const products = [
  { id: 1, name: 'Ноутбук', price: 28000, inStock: true },
  { id: 2, name: 'Навушники', price: 1200, inStock: false },
  { id: 3, name: 'Книга', price: 250, inStock: true },
  { id: 4, name: 'Миша', price: 800, inStock: true },
  { id: 5, name: 'Клавіатура', price: 1500, inStock: false },
];

// Компонент ProductCard для відображення товару
interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  className?: string;
}

function ProductCard({
  name,
  price,
  inStock,
  className = '',
}: ProductCardProps) {
  return (
    <div
      className={`${className} ${inStock ? '' : 'text-gray-500 opacity-50'}`}
    >
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-xl font-bold text-blue-600">{price} грн</p>
      <p className={`text-sm ${inStock ? 'text-green-600' : 'text-red-600'}`}>
        {inStock ? '✅ В наявності' : '❌ Немає в наявності'}
      </p>
    </div>
  );
}

// ===============================
// Головний компонент домашки
// ===============================

export default function Homework1() {
  return (
    <HomeworkPage>
      {/* Секція 1: ArticleCard з CardWrapper */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          1. Props та багаторазовість компонент
        </h2>

        <CardWrapper>
          <ArticleCard
            title="Новини React"
            description="Вийшла нова версія React з покращеннями продуктивності."
            author="React Team"
          />
        </CardWrapper>

        <CardWrapper>
          <ArticleCard
            title="TypeScript 5.0"
            description="Нові можливості TypeScript для розробників."
            author="Microsoft TypeScript Team"
          />
        </CardWrapper>
      </section>

      {/* Секція 2: AlertBox */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          2. Умовний рендерінг
        </h2>

        <CardWrapper>
          <AlertBox status="success" text="Дані збережено успішно!" />
        </CardWrapper>

        <CardWrapper>
          <AlertBox status="error" text="Помилка при збереженні!" bold={true} />
        </CardWrapper>

        <CardWrapper>
          <AlertBox status="warning" text="Увага! Перевірте введені дані." />
        </CardWrapper>
      </section>

      {/* Секція 3: ProductCard зі списком */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          3. Рендеринг списків
        </h2>

        <p className="mb-4 text-gray-600">
          Всього товарів: <strong>{products.length}</strong>
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <CardWrapper key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                inStock={product.inStock}
                className="h-full"
              />
            </CardWrapper>
          ))}
        </div>
      </section>

      {/* Додаткова секція: комбінований приклад */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          Бонус: Комбінований приклад
        </h2>

        <CardWrapper>
          <div className="space-y-4">
            <ArticleCard
              title="Звіт про продажі"
              description="Аналіз продажів за поточний місяць показує зростання."
              author="Відділ аналітики"
            />

            <AlertBox
              status="success"
              text="Звіт успішно сформований!"
              bold={true}
            />

            <div className="mt-4">
              <h4 className="mb-2 font-semibold">Топ-продажі:</h4>
              {products
                .filter((product) => product.inStock)
                .slice(0, 2)
                .map((product) => (
                  <div
                    key={product.id}
                    className="mb-2 rounded bg-gray-100 p-2"
                  >
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      inStock={product.inStock}
                    />
                  </div>
                ))}
            </div>
          </div>
        </CardWrapper>
      </section>
    </HomeworkPage>
  );
}
