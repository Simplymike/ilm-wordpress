set -eu

case "$1" in
    tables|database)
        export MYSQL_PWD="$MARIADB_PASSWORD"
        if [ "$1" = tables ]; then
            mariadb -u "$MARIADB_USER" -N -e "SHOW TABLES" "$MARIADB_DATABASE"
        else
            mariadb -u "$MARIADB_USER" "$MARIADB_DATABASE" < /restore/site.sql
        fi
        ;;
    content)
        cd /var/www/html
        tar -xzf /restore/wp-content.tar.gz --no-same-owner --exclude=wp-content/themes/ilm-preview
        for folder in wp-content/uploads wp-content/plugins; do
            if [ -d "$folder" ]; then
                chown -R www-data:www-data "$folder"
            fi
        done
        ;;
    *) exit 2 ;;
esac
