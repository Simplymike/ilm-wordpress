# Инструкция: GitHub и Deployment

## 1️⃣ Создание репозитория на GitHub

### Шаг 1: Создайте новый репо на GitHub

1. Откройте https://github.com/new
2. Введите **Repository name**: `ilm-wordpress`
3. Выберите **Public** (или Private, если нужна конфиденциальность)
4. **НЕ** инициализируйте README, .gitignore или лицензию (они уже есть локально)
5. Нажмите **Create repository**

### Шаг 2: Подключите локальный репо к GitHub

Скопируйте команды после создания репо (вида `git remote add origin https://...`) и выполните в PowerShell:

```powershell
cd C:\Users\Mih\Desktop\ILM_web\wordpress-local

# Подключите удалённый репо (замените на вашу ссылку)
git remote add origin https://github.com/YOUR_USERNAME/ilm-wordpress.git

# Переименуйте ветку (если нужно)
git branch -M main

# Загрузите код на GitHub
git push -u origin main
```

**Результат:** Ваш код будет на GitHub! 🎉

---

## 2️⃣ Настройка Deployment на nic.ru

### Предусловия

Вам нужны данные SSH-доступа на nic.ru:
- **Host**: IP сервера или домен
- **User**: пользователь SSH
- **Private Key**: приватный ключ (`.pem` файл)

Если у вас только FTP, то деплой будет ручной (см. ниже).

### Способ A: Автоматический деплой через GitHub Actions (SSH)

#### 1. Генерируем SSH-ключ (если еще нет)

**На локальной машине:**
```powershell
ssh-keygen -t rsa -b 4096 -f "$env:USERPROFILE\.ssh\ilm_deploy_key" -N ""
```

Это создаст:
- `C:\Users\Mih\.ssh\ilm_deploy_key` (приватный ключ)
- `C:\Users\Mih\.ssh\ilm_deploy_key.pub` (публичный ключ)

#### 2. Загрузите публичный ключ на сервер

**На сервере (SSH):**
```bash
mkdir -p ~/.ssh
# Вставьте содержимое ilm_deploy_key.pub
echo "ssh-rsa AAAA..." >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

Или загрузите через cPanel/Plesk → SSH Access → Upload Key

#### 3. Добавьте Secrets в GitHub

1. Откройте https://github.com/YOUR_USERNAME/ilm-wordpress/settings/secrets/actions
2. Создайте 4 новых Secret:

| Secret | Значение |
|--------|----------|
| `DEPLOY_SSH_KEY` | Содержимое `ilm_deploy_key` (приватный ключ) |
| `DEPLOY_REMOTE_HOST` | ssh.izo2414076.nichost.ru |
| `DEPLOY_REMOTE_USER` | izo2414076 |
| `DEPLOY_TARGET` | /home/izo2414076/izoralm.ru/docs |

**Пример добавления Secret:**
```
Name: DEPLOY_SSH_KEY
Value: (вставьте содержимое ilm_deploy_key как есть)
```

#### 4. Проверьте workflow

GitHub Actions будет автоматически деплоить тему при Push в `main`:

```bash
git commit -m "Update ILM theme"
git push origin main
```

Перейдите на https://github.com/YOUR_USERNAME/ilm-wordpress/actions и смотрите процесс.

---

### Способ B: Ручной деплой через SFTP/FTP

Если SSH недоступен, загружайте файлы вручную:

1. **Используйте WinSCP, FileZilla или встроенный File Manager в cPanel/Plesk**

2. **Загрузите файлы темы:**
   ```
   Локально:  wp-content\themes\ilm-preview\
   На сервер: /public_html/wp-content/themes/ilm-preview/
   ```

3. **Убедитесь в правах доступа:**
   - Папки: `755` (rwxr-xr-x)
   - Файлы: `644` (rw-r--r--)

---

## 3️⃣ Развёртывание базы данных

### Восстановление из снимка

Если у вас есть `site.sql` и `wp-content.tar.gz`:

**Способ A: Через SSH**
```bash
cd /home/izoralm.ru/public_html
mysql -u dbuser -p dbname < site.sql
tar -xzf wp-content.tar.gz
```

**Способ B: Через cPanel → Backup → Restore**
1. Загрузите `site.sql` через File Manager
2. Используйте phpMyAdmin → Import для восстановления БД

### Новая установка

1. Загрузите WordPress 7.1.4 на сервер
2. Создайте `wp-config.php` (см. `DEPLOYMENT.md`)
3. Откройте https://izoralm.ru/ и завершите мастер установки

---

## 4️⃣ Проверка и тестирование

После развёртывания:

✅ Откройте https://izoralm.ru/ — должен загружаться сайт
✅ Откройте https://izoralm.ru/wp-admin/ — должна загружаться админка
✅ Загрузите тему **ILM Preview** в **Внешний вид → Темы**
✅ Проверьте логи PHP в cPanel → Error Log

---

## 5️⃣ Обновление на боевом сервере

После каждого обновления кода:

**Через GitHub Actions (автоматически):**
```bash
git commit -m "Fix theme styling"
git push origin main
# Деплой произойдёт автоматически
```

**Вручную через SSH:**
```bash
cd /home/izoralm.ru/public_html
git pull origin main
# Файлы темы обновятся
```

**Вручную через SFTP:**
Просто перезагрузите файлы из `wp-content/themes/ilm-preview/`

---

## 🛠️ Troubleshooting

| Проблема | Решение |
|----------|---------|
| GitHub Actions показывает ошибку SSH | Проверьте Secrets (хост, юзер, ключ) |
| 500 ошибка на сайте | Включите `WP_DEBUG` в `wp-config.php` |
| Тема не обновляется | Очистите кэш WordPress (если установлен) |
| Доступ запрещён (Permission denied) | Проверьте права: `chmod 755 wp-content/themes/ilm-preview` |
| БД не подключается | Проверьте учётные данные в `wp-config.php` |

---

**Следующие шаги:**
1. Создайте репо на GitHub ✅
2. Подключите локальный репо
3. Загрузьте код
4. Настройте Secrets для деплоя
5. Дождитесь первого автоматического деплоя

Вопросы? Смотрите `DEPLOYMENT.md` для подробной документации.
