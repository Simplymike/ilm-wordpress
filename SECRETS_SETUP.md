# 🔐 GitHub Secrets Setup Instructions

## Шаг 1: Откройте страницу Secrets

Перейдите сюда:
```
https://github.com/Simplymike/ilm-wordpress/settings/secrets/actions
```

## Шаг 2: Добавьте 4 Secrets

Нажимайте **New repository secret** и добавляйте по одному:

### Secret 1: `DEPLOY_REMOTE_HOST`
```
Value: ssh.izo2414076.nichost.ru
```

### Secret 2: `DEPLOY_REMOTE_USER`
```
Value: izo2414076
```

### Secret 3: `DEPLOY_TARGET`
```
Value: /home/izo2414076/public_html
```
(Или узнайте точный путь в cPanel/Plesk)

### Secret 4: `DEPLOY_SSH_KEY`
```
Value: (содержимое приватного SSH-ключа или пароль SSH)
```

**Важно:** Это Secret используется для аутентификации на сервере.
Если у вас только пароль - можете временно использовать пароль (менее безопасно).

---

## Как это будет работать:

После добавления Secrets при каждом `git push`:
1. GitHub Actions автоматически запустится
2. Деплой workflow загрузит тему на сервер
3. Тема обновится на https://izoralm.ru

---

## 📝 Примечание:

Для максимальной безопасности лучше использовать SSH-ключ вместо пароля.
Когда будете готовы - скажите, и я покажу как сгенерировать и загрузить ключ.
