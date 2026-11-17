# Развёртывание на хостинг

## Целевой хост: Shared Hosting (cPanel/Plesk) на nic.ru
**Домен:** `izoralm.ru`

### 🔧 Требования к хосту

- PHP 8.3+ (с модулями: OpenSSL, MySQLi, cURL, JSON, GD)
- MySQL 5.7+ или MariaDB 10.5+
- Поддержка `.htaccess` (mod_rewrite)
- Доступ по SSH или SFTP
- Возможность создавать/удалять папки в документ-руте

### 📋 Общий процесс развёртывания

#### Шаг 1: Подготовка базы данных в cPanel/Plesk

1. Создайте новую БД MySQL (например: `izoralm_wp`)
2. Создайте пользователя БД с правами на эту БД
3. Запомните:
   - Имя хоста БД (обычно `localhost`)
   - Имя БД
   - Пользователя БД
   - Пароль БД

#### Шаг 2: Загрузка файлов

Используйте **SFTP** или **File Manager** в cPanel/Plesk:

```
izoralm.ru/
├── wp-admin/
├── wp-includes/
├── wp-content/
│   └── themes/ilm-preview/     ← наша тема
├── wp-config.php
├── index.php
└── ... (стандартные файлы WordPress)
```

**Вариант A: Через восстановление из снимка**
```bash
# На сервере
cd /path/to/izoralm.ru
mysql -u dbuser -p dbname < site.sql
tar -xzf wp-content.tar.gz
```

**Вариант B: Свежая установка**
1. Загрузите WordPress 7.1.4 на сервер
2. Создайте `wp-config.php` с данными хоста (см. ниже)

#### Шаг 3: Конфигурация WordPress

Создайте `wp-config.php`:

```php
<?php
// БД
define('DB_NAME', 'izoralm_wp');
define('DB_USER', 'izoralm_wpuser');
define('DB_PASSWORD', 'your_secure_password');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

// Ключи безопасности (сгенерируйте на https://api.wordpress.org/secret-key/1.1/salt/)
define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

// Таблица префиксов (как в локальной версии)
$table_prefix = 'cms_wp_';

// Среда
define('WP_ENVIRONMENT_TYPE', 'production');
define('WP_DEBUG', false);
define('WP_DEBUG_DISPLAY', false);

// Путь к wp-content
define('WP_CONTENT_DIR', dirname(__FILE__) . '/wp-content');
define('WP_CONTENT_URL', 'https://izoralm.ru/wp-content');

// Если используете SFTP вместо прямого файлового доступа
// define('FS_METHOD', 'ftpext');
// define('FTP_BASE', '/path/to/wp/');
// и т.д.

// Автоматическое обновление плагинов (опционально)
define('AUTOMATIC_UPDATER_DISABLED', false);

require_once(ABSPATH . 'wp-settings.php');
?>
```

#### Шаг 4: Проверка и активация темы

1. Откройте админку: https://izoralm.ru/wp-admin/
2. Перейдите в **Внешний вид → Темы**
3. Активируйте тему **ILM Preview**

#### Шаг 5: Настройка HTTPS

В cPanel/Plesk:
1. Установите **SSL сертификат** (бесплатно через Let's Encrypt)
2. Принудите перенаправление на HTTPS через `.htaccess`:

```apache
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

### 🚀 Автоматический деплой через GitHub Actions (опционально)

Если хост поддерживает SSH-доступ, можно настроить автоматический деплой при Push:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
    paths:
      - 'wp-content/themes/ilm-preview/**'
      - 'docker/local-only.php'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy theme files
        uses: easingthemes/ssh-deploy@main
        env:
          SSH_PRIVATE_KEY: ${{ secrets.DEPLOY_KEY }}
          REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          TARGET: /path/to/izoralm.ru/wp-content/themes/ilm-preview
          EXCLUDE: ".git/,.env,.gitignore"
```

Для этого нужны GitHub Secrets:
- `DEPLOY_KEY`: приватный SSH-ключ
- `REMOTE_HOST`: IP или домен хоста
- `REMOTE_USER`: пользователь SSH

### 📝 Локальные настройки хоста

Файлы, которые НЕ коммитятся (находятся в `.gitignore`):

- `.env` — пароли БД для локальной версии
- `wp-config.php` — конфиг на боевом сервере
- `private/` — снимки БД и медиа-архивы
- `*.sql`, `*.sql.gz`, `*.pem` — приватные данные

### 🔄 Обновление на сервере

**При изменении темы:**
```bash
# Локально
git commit -m "Update ILM theme"
git push origin main

# На сервере (через SSH или панель управления)
cd /path/to/izoralm.ru
git pull origin main
# Файлы темы обновятся автоматически
```

**При изменении WordPress/плагинов:**
Используйте встроенный обновлятор WordPress в админке.

### 🛠️ Возможные проблемы

| Проблема | Решение |
|----------|---------|
| 500 Internal Server Error | Включите `WP_DEBUG` в `wp-config.php`, проверьте логи PHP |
| Не грузится админка | Проверьте права на папки (755 для папок, 644 для файлов) |
| БД не подключается | Проверьте учётные данные и хост БД в `wp-config.php` |
| Перезаписывается `.htaccess` | Запретите изменения через FTP: `chmod 444 .htaccess` |

### 📞 Контакты хоста

**nic.ru** — поддержка через панель управления, обычно cPanel или Plesk

---

**Последнее обновление:** 2026-11-17
