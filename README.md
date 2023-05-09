# Социальная сеть
Сервис, в котором можно публиковать посты, находить друзей, добавлять их в друзья и читать их новости.

# Запуск
- https://xatepk.github.io/social-network-frontend/
- Бэкенд выложен на fly.io и доступен по адресу https://ill-gray-pike-ring.cyclic.app/, но он не загружает фотографии корректно.
<br/>
<br/> Для полного тестирования функционала лучше выполнить следующие действия:
- Склонировать репозиторить и  запустить команду npm i && npm start
- Склонировать https://github.com/xatepk/social-network-api и запустить команду npm i && npm start

# Реализованные задачи:
- Разработаны frontend и backend для сервиса.
- Корректно работает навигация между страницами и ссылки на внешние ресурсы.
- Отзывчивая вёрстка, которая корректно тянется на всех промежуточных разрешениях.
- Отсутствуют ошибки валидации при сборке приложения или в валидаторе.
- В коде используется семантическая разметка: применяются семантические теги.
- Каркас макета реализован на Flex layout или Grid layout.
- Все формы валидируются и на стороне клиента.
- При попытке перейти на несуществующую страницу происходит редирект на страницу «404».
- На странице «Регистрация» клик по кнопке «Зарегистрироваться» при корректно введённых данных отправляет запрос на роут /signup. Если запрос прошёл успешно, то происходит редирект на страницу /mainpage.
- JWT Token хранится в localeStorage. Если пользователь закрыл вкладку, а после — вернулся на сайт, данные достаются из локального хранилища при монтировании компонента App.
- Написаны тесты. (запуск npm run test)

## Задачи для доработки
- Сделать infinity scroll
- Разработать мессенджер
- Сделать адаптив под все разрешения экранов



### Обзор

**Интро**

- Создание проекта
- Настройка роутов
- Разработка и настройка backend
- Настройка store
- Верстка
- Разработка функционала

**Стек**
- React
- Redux Toolkit
- TypeScript
- Express JS
- MongoDB
- SCSS

