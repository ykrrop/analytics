# Межгалактическая аналитика (analytics)

Интерфейсная часть Сервиса межгалактической аналитики — это одностраничное React-приложение на базе Vite, реализующее:
- Загрузку CSV-таблиц
- Постепенную аналитическую обработку
- Генерацию тестовых данных
- Хранение истории загрузок
- Полное тестовое покрытие (unit, integration, e2e)

📦 Структура проекта

```plaintext
analytics/
├── public/ # статичные файлы
│ └── index.html # точка входа
├── src/
│ ├── tests/ # тесты
│ │ ├── integration/ # интеграционные тесты
│ │ └── e2e/ # end-to-end тесты (Playwright)
│ ├── assets/ # SVG-иконки
│ ├── components/ # переиспользуемые UI
│ │ ├── CloseButton/
│ │ ├── DoneButton/
│ │ ├── Header/
│ │ ├── Layout/
│ │ ├── Modal/
│ │ ├── ResultDisplay/
│ │ └── Spinner/
│ ├── features/ # страницы-фичи
│ │ ├── Aggregator/
│ │ │ └── components/ # компоненты с юнит-тестами
│ │ ├── Generator/
│ │ └── History/
│ ├── services/ # API-слой
│ ├── store/ # Zustand-сторы
│ ├── types/ # TS-типы
│ ├── utils/ # вспомогательные функции
│ ├── App.tsx # маршрутизация
│ ├── main.tsx # рендер React
│ └── index.css # глобальные стили
├── playwright.config.ts # конфиг e2e-тестов
├── vitest.config.ts # конфиг unit-тестов
├── vitest.setup.ts # setup для тестов
├── vite.config.ts # конфиг сборки
├── package.json # зависимости и скрипты
└── tsconfig.json # настройки TS
```


🛠️ Технический стек
- Язык: TypeScript
- Бандлер: Vite
- UI: React 19 + React-DOM
- Роутинг: react-router-dom
- Состояние: Zustand (+ persist для LocalStorage)
- API: Fetch
- Модалки: React Portals
- Стили: CSS Modules
- Линтинг: ESLint + Prettier
- **Тестирование**:
  - Vitest (unit/integration)
  - Playwright (e2e)
  - React Testing Library


## 🚀 Установка и запуск

1. **Клонировать и установить зависимости**
    
   ```bash
   git clone https://github.com/ykrrop/analytics.git
   cd analytics
   npm install
   ```
    
    
2. **Запустить в режиме разработки**
    
    ```bash
    npm run dev
    ```
    
    - Приложение доступно на `http://localhost:5173`
        
    - В `vite.config.ts` настроен прокси:
        ```js
        server: {
          proxy: {
            '/aggregate': 'http://localhost:3000',
            '/report':    'http://localhost:3000',
          }
        }
        ```
        
3. **Сборка для продакшена**
    
    ```bash
    npm run build
    ```
    
4. **Превью сборки**
    
    ```bash
    npm run preview
    ```
    
5. **Линтинг**
    ```bash
    npm run lint
    ```

## 🧪 Тестирование

1. **Unit/Integration тесты (Vitest)**
   ```bash
   # Однократный запуск
    npm test

    # Режим watch
    npm run test:watch
   ```

2. **End-to-end тесты (Playwright)**
   ```bash
    # Запустить приложение в одном терминале
    npm run dev

    # В другом терминале запустить тесты
    npm run test:e2e
   ```

Конфигурация тестов:

- `vitest.config.ts` - настройки Vitest (JSDOM, coverage)
    
- `playwright.config.ts` - настройки e2e-тестов
    
- `vitest.setup.ts` - глобальные импорты для тестов

## 🏗️ Архитектура приложения

### 1. Роутинг (`App.tsx`)

```tsx
<Router>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<AggregatorPage />} />
      <Route path="generator" element={<GeneratorPage />} />
      <Route path="history" element={<HistoryPage />} />
    </Route>
  </Routes>
</Router>
```

- **Layout**: общий макет с `Header` и `<Outlet />`.
    
- Три основные страницы: CSV-аналитика, Генератор, История.
    

### 2. CSV-аналитика (`AggregatorPage`)

- **Drag & drop** / выбор файла
    
- Постепенная обработка через `aggregateFile` (стриминг из `/aggregate?rows=<n>`)
    
- Отображение прогресса и финальных блоков (`ResultSection`)
    
- Ошибки обрабатываются и сохраняются в историю
    

### 3. Генератор (`GeneratorPage`)

- Кнопка «Начать генерацию» запускает `/report?...`
    
- При успешном ответе автоматически скачивается `report.csv`
    
- Статусы `isLoading`, `isDone`, `error` в сторе
    

### 4. История (`HistoryPage`)

- Список записей из LocalStorage (`useHistoryStore`)
    
- Удаление записи / очистка всей истории
    
- Открытие модалки для успешных записей (`Modal` + `ResultModalContent`)
    

### 5. State-менеджмент

- **aggregatorStore**: состояние загрузки и результатов
    
- **generatorStore**: состояние генерации
    
- **historyStore**: массив записей истории
    
- Все сторы реализованы через Zustand + `persist` для LocalStorage
    

### 6. Компоненты

- **CloseButton**, **DoneButton**, **Spinner**, **Header**, **Layout**, **Modal**, **ResultDisplay**, **HistoryEntryItem** и др.
    
- Повторное использование UI-компонентов
    
- Стили через CSS Modules
    

### 7. Утилиты (`src/utils/format.ts`)

- `formatDate` → формат `DD.MM.YY`
    
- `formatDayOfYear` → преобразует порядковый день в строку вида `12 июня`

### 8. Тест-инфраструктура

- Все компоненты имеют юнит-тесты
    
- Интеграционные тесты в `src/__tests__/integration`
    
- Сквозные тесты в `src/__tests__/e2e`
    
- Покрытие кода через Istanbul (`coverage` в Vitest)
    
---

## 🔗 Интеграция с бэкендом

- **POST** `/aggregate?rows=<число>` — стриминг аналитики
    
- **GET** `/report?size=<Gb>&withErrors=<on|off>&maxSpend=<num>` — генерация CSV
    

---

## ✅ Критерии соответствия ТЗ

- Использованы **Vite**, **TypeScript**, **CSS Modules**
    
- **react-router-dom** для роутинга
    
- **Zustand** + **persist** для хранения
    
- **Fetch API** для всех запросов
    
- **React Portals** для модалок
    
- **ESLint + Prettier** настроены
    
- **Без неутверждённых библиотек**
    
- Соответствие дизайн-макетам: главная, генератор, история, навигация
    
- Реализован полный функционал: загрузка, прогресс, генерация, история, модалки, очистка

- Покрытие тестами vitest + playwright
  

