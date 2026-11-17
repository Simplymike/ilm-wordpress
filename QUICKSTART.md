# 📋 Checklist: GitHub & Deployment Setup

## ✅ Локально уже готово

- [x] Git репозиторий инициализирован
- [x] 2 commit в истории (Initial + Setup guide)
- [x] `.gitignore` правильно настроен (`.env`, `private/`, `*.sql`, etc.)
- [x] GitHub Actions workflows готовы (CI/CD)
- [x] Документация по деплойменту создана

---

## 🚀 Нужно сделать вам на GitHub

### 1. Создайте репозиторий

```
1. Откройте https://github.com/new
2. Repository name: ilm-wordpress
3. Выберите Public (или Private)
4. НЕ инициализируйте README/gitignore
5. Click "Create repository"
```

### 2. Подключите локальный репо

После создания вы увидите инструкции вроде:

```powershell
cd C:\Users\Mih\Desktop\ILM_web\wordpress-local
git remote add origin https://github.com/YOUR_USERNAME/ilm-wordpress.git
git branch -M main
git push -u origin main
```

**Выполните эти команды в PowerShell.**

### 3. Проверьте результат

Откройте https://github.com/YOUR_USERNAME/ilm-wordpress — должны видеть все файлы!

---

## 🔐 Настройка deployment (после загрузки на GitHub)

### Если хотите АВТОМАТИЧЕСКИЙ деплой на nic.ru:

#### 3.1 Подготовьте SSH-ключ

```powershell
ssh-keygen -t rsa -b 4096 -f "$env:USERPROFILE\.ssh\ilm_deploy_key" -N ""
```

#### 3.2 Добавьте публичный ключ на сервер nic.ru

Скопируйте содержимое `C:\Users\Mih\.ssh\ilm_deploy_key.pub` и загрузите на сервер через cPanel/Plesk → SSH Access.

#### 3.3 Добавьте GitHub Secrets

Откройте: https://github.com/YOUR_USERNAME/ilm-wordpress/settings/secrets/actions

Добавьте 4 Secrets:

| Secret | Описание | Пример |
|--------|----------|---------|
| `DEPLOY_SSH_KEY` | Содержимое `ilm_deploy_key` (приватный) | `-----BEGIN RSA PRIVATE KEY-----...` |
| `DEPLOY_REMOTE_HOST` | IP или домен сервера | `123.45.67.89` или `nic.ru` |
| `DEPLOY_REMOTE_USER` | SSH юзер | `root` или `deploy` |
| `DEPLOY_TARGET` | Путь на сервере | `/home/izoralm.ru/public_html` |

#### 3.4 Проверьте автоматический деплой

```powershell
cd C:\Users\Mih\Desktop\ILM_web\wordpress-local
git commit --allow-empty -m "Test deployment"
git push origin main
```

Перейдите на https://github.com/YOUR_USERNAME/ilm-wordpress/actions и смотрите процесс.

---

### Если выберете РУЧНОЙ деплой:

Просто загружайте файлы через SFTP/FTP на nic.ru вручную:
- Локально: `wp-content\themes\ilm-preview\`
- На сервер: `/public_html/wp-content/themes/ilm-preview/`

---

## 📂 Файлы документации

Созданы следующие файлы в проекте:

- **[README.md](README.md)** — Основная информация о проекте
- **[DEPLOYMENT.md](DEPLOYMENT.md)** — Подробный гайд по развёртыванию
- **[GITHUB_SETUP.md](GITHUB_SETUP.md)** — Пошаговая инструкция GitHub и deployment
- **[.github/workflows/deploy-theme.yml](.github/workflows/deploy-theme.yml)** — Автоматический деплой
- **[.github/workflows/lint-theme.yml](.github/workflows/lint-theme.yml)** — Проверка кода

---

## 📞 Справочная информация

| Параметр | Значение |
|----------|----------|
| **Локальный адрес** | http://127.0.0.1:8080 |
| **Локальная админка** | http://127.0.0.1:8080/wp-admin/ |
| **Боевой домен** | https://izoralm.ru |
| **Хостинг** | nic.ru (Shared Hosting) |
| **WordPress версия** | 7.1.4 |
| **PHP версия** | 8.3 |
| **БД** | MariaDB 10.11 (локально) / MySQL 5.7+ (на боевом) |
| **Тема** | `wp-content/themes/ilm-preview/` |

---

## 🎯 Следующие шаги

1. **Сегодня:**
   - Создайте репо на GitHub ✅
   - Загрузьте код с `git push`
   - Проверьте, что всё видно на GitHub

2. **После:**
   - Настройте SSH-доступ на nic.ru
   - Добавьте GitHub Secrets
   - Проверьте автоматический деплой

3. **На боевом сервере:**
   - Восстановите БД (если есть снимок)
   - Загрузите WordPress (если новая установка)
   - Активируйте тему ILM Preview
   - Настройте домен на https://izoralm.ru

---

**Вопросы?**
- Смотрите `GITHUB_SETUP.md` для пошаговых инструкций
- Смотрите `DEPLOYMENT.md` для технических деталей
- Проверьте README.md для общей информации

Good luck! 🚀
