# 🎯 ILM WordPress: GitHub & Deployment Ready

**Статус:** ✅ Локальный Git репозиторий готов к загрузке на GitHub

---

## 📊 Что я сделал

### 1. ✅ Инициализирован локальный Git репо

```bash
c:\Users\Mih\Desktop\ILM_web\wordpress-local
├── .git/                      # Git история (3 commit)
├── .gitignore                 # Исключены пароли, .env, медиа
├── .gitattributes             # Правильная кодировка
└── wp-content/themes/ilm-preview/  # Всё отслеживается
```

### 2. ✅ GitHub Actions workflows

Автоматическая проверка и деплой при каждом Push:

- **[.github/workflows/lint-theme.yml](.github/workflows/lint-theme.yml)** — Проверка PHP, CSS, HTML
- **[.github/workflows/deploy-theme.yml](.github/workflows/deploy-theme.yml)** — Автоматический деплой на nic.ru

### 3. ✅ Документация по развёртыванию

| Документ | Содержание |
|----------|-----------|
| **[README.md](README.md)** | Основная инфа о проекте, как запустить локально |
| **[QUICKSTART.md](QUICKSTART.md)** | ⭐ Пошаговый чеклист для GitHub + Deployment |
| **[GITHUB_SETUP.md](GITHUB_SETUP.md)** | Подробная инструкция GitHub и автодеплоя |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | Техническая документация для nic.ru |

---

## 🚀 Следующие шаги (для вас)

### Шаг 1: Создать репозиторий на GitHub

1. Откройте https://github.com/new
2. **Repository name:** `ilm-wordpress`
3. **Visibility:** Public (или Private)
4. **НЕ** инициализируйте README/gitignore
5. **Create repository**

### Шаг 2: Загрузить код на GitHub

После создания репо вы увидите инструкции вроде:

```powershell
cd C:\Users\Mih\Desktop\ILM_web\wordpress-local
git remote add origin https://github.com/YOUR_USERNAME/ilm-wordpress.git
git branch -M main
git push -u origin main
```

**Просто скопируйте и вставьте эти команды в PowerShell.**

### Шаг 3: Настроить автоматический деплой (опционально)

Если хотите автоматического деплоя при каждом Push:

1. **Генерируйте SSH-ключ:**
   ```powershell
   ssh-keygen -t rsa -b 4096 -f "$env:USERPROFILE\.ssh\ilm_deploy_key" -N ""
   ```

2. **Загрузите публичный ключ на nic.ru** (через cPanel/Plesk → SSH Access)

3. **Добавьте 4 GitHub Secrets:**
   - `DEPLOY_SSH_KEY` → содержимое `ilm_deploy_key`
   - `DEPLOY_REMOTE_HOST` → IP или домен nic.ru
   - `DEPLOY_REMOTE_USER` → SSH юзер (обычно `root`)
   - `DEPLOY_TARGET` → путь `/home/izoralm.ru/public_html`

После этого каждый Push автоматически обновит тему на боевом сервере! 🎉

---

## 📝 Локальная структура

```
wordpress-local/
├── README.md                          # Основная документация
├── QUICKSTART.md                      # ⭐ Пошаговый чеклист (читайте это!)
├── GITHUB_SETUP.md                    # Инструкция GitHub/deployment
├── DEPLOYMENT.md                      # Техническая документация
├── .env                               # (локально, не в Git) ✅
├── .env.example                       # Шаблон .env
├── .gitignore                         # Исключены: .env, private/, *.sql, *.pem
├── compose.yaml                       # Docker Compose конфиг
├── restore.ps1                        # PowerShell скрипт восстановления
├── docker/
│   ├── local-only.php                 # Плагин для локальной версии
│   └── snapshot.sh                    # Скрипт снимка БД
├── wp-content/
│   └── themes/ilm-preview/            # Основная тема WordPress
│       ├── index.php
│       ├── functions.php
│       ├── style.css
│       ├── pages.json
│       ├── home.html
│       ├── about.html
│       ├── contacts.html
│       ├── filters.html
│       ├── footer.html
│       ├── header.html
│       ├── news.php
│       └── assets/
│           ├── images/
│           └── templates/
├── private/                           # (локально, не в Git) ✅
│   ├── site.sql                       # Снимок БД
│   └── wp-content.tar.gz              # Архив медиа
└── .github/
    └── workflows/
        ├── deploy-theme.yml           # Автоматический деплой
        └── lint-theme.yml             # Проверка кода
```

---

## 🔍 Git статус

```
3 commits:
✅ fdf5bd7 - Initial commit: ILM WordPress project setup
✅ 5ff4348 - Add GitHub and deployment setup guide
✅ 6e9f036 - Add quick start checklist
```

**Все файлы готовы к загрузке!**

---

## 📚 Справка

### Параметры проекта

| Параметр | Значение |
|----------|----------|
| **Локальный адрес** | http://127.0.0.1:8080 |
| **Локальная админка** | http://127.0.0.1:8080/wp-admin/ |
| **Боевой домен** | https://izoralm.ru |
| **Хостинг** | nic.ru (Shared Hosting) |
| **WordPress** | 7.1.4 |
| **PHP** | 8.3 |
| **БД** | MariaDB 10.11 (локально) / MySQL 5.7+ (боевой) |
| **Тема** | `wp-content/themes/ilm-preview/` |

### Ключевые файлы документации

**🎯 Начните отсюда:**
1. [QUICKSTART.md](QUICKSTART.md) — чеклист и основные шаги
2. [GITHUB_SETUP.md](GITHUB_SETUP.md) — подробная инструкция GitHub
3. [DEPLOYMENT.md](DEPLOYMENT.md) — техническая документация

---

## 💡 Советы

- ✅ `.env` с паролями **НЕ коммитится** (находится в `.gitignore`)
- ✅ Локальные медиа-файлы и БД в `/private` **НЕ коммитятся**
- ✅ GitHub Actions автоматически деплоит тему на боевой сервер (при наличии Secrets)
- ✅ Локальные изменения видны в Docker в реальном времени
- ✅ Для переноса данных нужен новый снимок БД (используйте `restore.ps1`)

---

## 🎓 Что дальше?

**Сейчас:**
1. Создайте репо на GitHub
2. Загрузите код: `git push -u origin main`
3. Проверьте, что все файлы на GitHub

**Потом:**
1. Настройте SSH-ключи для автоматического деплоя
2. Добавьте GitHub Secrets
3. Развёртывайте WordPress на nic.ru
4. Активируйте тему ILM Preview

**При разработке:**
```bash
# Локальные изменения
git commit -m "Update ILM theme: fix styling"
git push origin main
# GitHub Actions автоматически обновит тему на боевом сервере
```

---

**Всё готово к использованию!** 🚀

Вопросы? Смотрите документацию в папке проекта.
