
# Social Network App

### "Социальная сеть" - это проект, разработанный с использованием технологий React, Redux Toolkit (RTK), TypeScript, Formik, и WebSocket, с использованием методологии Feature-Sliced Design. 
### Проект включает в себя основные функциональности социальной сети, такие как система логинизации, чат, управление списком друзей, поиск по друзьям, а также редактирование профиля.

### Основные функциональности:

### Логинизация:

Пользователи могут зарегистрироваться или войти в систему, используя свой email и пароль.

### Чат:

Для обмена сообщениями между пользователями реализован чат на основе WebSocket.
Пользователи могут отправлять текстовые сообщения.

### Список друзей:

Каждый пользователь имеет свой собственный список друзей.
Удобное управление списком друзей, включая добавление и удаление контактов.

### Поиск по списку друзей:

Реализован поиск по именам друзей для быстрого доступа к нужным пользователям.

### Профиль и его редактирование:

Каждый пользователь имеет свой профиль с основной информацией.
Возможность редактирования профиля, включая изменение фотографии, статуса и других персональных данных.

### Используемые технологии:

#### React: для построения пользовательского интерфейса.
#### Redux Toolkit (RTK): для управления состоянием приложения.
#### TypeScript: для улучшения читаемости и поддержки кода.
#### Formik: для обработки форм и валидации ввода.
#### WebSocket: для реализации чата в режиме реального времени.

### Методология:

#### Feature-Sliced Design: Проект организован с использованием методологии Feature-Sliced Design, что позволяет легко масштабировать и поддерживать код, разделяя его на логические модули (фичи), что способствует более удобному сопровождению и расширению функциональности.


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
