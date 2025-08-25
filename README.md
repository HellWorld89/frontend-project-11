### Hexlet tests and linter status:
[![Actions Status](https://github.com/HellWorld89/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/HellWorld89/frontend-project-11/actions)

# RSS Агрегатор

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-green?style=for-the-badge)](https://frontend-project-11-macphkpo0-sapozhnikovls-projects.vercel.app)
[![Vercel Status](https://img.shields.io/static/v1?label=Vercel&message=Production&color=blue&logo=vercel)](https://frontend-project-11-macphkpo0-sapozhnikovls-projects.vercel.app)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/ru/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF.svg)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3.svg)](https://getbootstrap.com/)
[![i18n](https://img.shields.io/badge/i18next-Translation-FF4785.svg)](https://www.i18next.com/)

🌐 Современное веб-приложение для чтения RSS-лент с автоматическим обновлением контента

## 🚀 Возможности

- ✅ Добавление RSS-лент по URL
- ✅ Автоматическая проверка новых постов каждые 5 секунд
- ✅ Добавление новых постов в начало списка
- ✅ Поддержка мультиязычности (русский/английский)
- ✅ Валидация URL и проверка на дубликаты
- ✅ Адаптивный интерфейс на Bootstrap
- ✅ Обработка сетевых ошибок и ошибок парсинга

## 🛠 Технологии

- **Vite** - сборка и development server
- **i18next** - интернационализация
- **Bootstrap 5** - UI компоненты и стили
- **Axios** - HTTP-запросы
- **Yup** - валидация данных
- **on-change** - отслеживание изменений состояния
- **DOMParser** - парсинг RSS/XML

## 📁 Структура проекта

```
frontend-project-11/
├── public/
│   └── locales/          # Файлы переводов
│       ├── en/
│       │   └── translation.json
│       └── ru/
│           └── translation.json
├── src/
│   ├── state.js          # Управление состоянием приложения
│   ├── view.js           # Отображение UI
│   ├── main.js           # Точка входа, обработка событий
│   ├── validator.js      # Валидация URL
│   ├── parser.js         # Парсинг RSS данных
│   ├── rss.js            # Загрузка и обновление RSS-лент
│   └── i18n.js           # Настройка интернационализации
├── index.html            # Основной HTML файл
└── package.json          # Зависимости и скрипты
```

## 🏃‍♂️ Запуск приложения

1. **Установка зависимостей**
   ```bash
   npm install
   ```

2. **Запуск в режиме разработки**
   ```bash
   npm run dev
   ```
   Приложение будет доступно по адресу: http://localhost:5173/

3. **Сборка для production**
   ```bash
   npm run build
   ```

4. **Проверка кода ESLint**
   ```bash
   npx eslint .
   ```

## 🧪 Тестовые RSS-ленты

Для тестирования функциональности можно использовать следующие RSS-ленты:

1. **Частые обновления (каждые 10 секунд)**
   ```
   https://lorem-rss.hexlet.app/feed?unit=second&interval=10
   ```

2. **Обновления каждую минуту**
   ```
   https://lorem-rss.hexlet.app/feed?unit=minute&interval=1
   ```

3. **Новости Reddit**
   ```
   https://www.reddit.com/r/news.rss
   ```

4. **Новости BBC**
   ```
   http://feeds.bbci.co.uk/news/rss.xml
   ```

## 🔧 Основные команды управления

- Добавление RSS-ленты: введите URL в поле ввода и нажмите "Добавить"
- Переключение языка: используйте выпадающий список в правом верхнем углу
- Открытие поста: кликните на заголовок поста для открытия в новой вкладке

## 🎯 Как работает автоматическое обновление

1. После успешного добавления RSS-ленты запускается цикл обновлений
2. Каждые 5 секунд система проверяет все добавленные RSS-ленты
3. Для каждой ленты выполняется запрос через прокси-сервер
4. Полученные данные парсятся и сравниваются с существующими постами
5. Новые посты определяются по дате публикации
6. Найденные новые посты добавляются в начало списка
7. Интерфейс автоматически обновляется для отображения новых постов

## 📝 Логирование и отладка

Приложение включает детальное логирование в консоль браузера:
- Время начала проверки обновлений
- Название проверяемого фида
- Количество найденных новых постов
- Подтверждение добавления новых постов
- Ошибки при обновлении фидов

Для просмотра логов откройте инструменты разработчика (F12) и перейдите на вкладку Console.

## 🌍 Интернационализация

Приложение поддерживает два языка:
- Русский (по умолчанию)
- Английский

Переводы хранятся в файлах `public/locales/{язык}/translation.json`. Система автоматически определяет язык браузера и сохраняет выбор пользователя.

## ⚠️ Обработка ошибок

Приложение обрабатывает следующие типы ошибок:
- Невалидный URL
- Повторное добавление существующей RSS-ленты
- Сетевые ошибки
- Ошибки парсинга RSS-данных
- Неподдерживаемый формат RSS

Все ошибки отображаются пользователю на соответствующем языке.

## 🔮 Возможные улучшения

- Кэширование данных в localStorage
- Возможность удаления RSS-лент
- Категоризация и фильтрация постов
- Экспорт списка RSS-лент
- Темная тема интерфейса
- PWA-функциональность (оффлайн-режим)

---

Разработано с использованием современных веб-технологий и лучших практик фронтенд-разработки.