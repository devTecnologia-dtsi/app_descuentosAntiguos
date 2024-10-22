# Usar la imagen base de PHP 8.3 con Apache
FROM php:8.3-apache
# Instalar mysqli y otras dependencias de PHP necesarias
RUN docker-php-ext-install mysqli
# Crear los directorios necesarios
RUN mkdir -p /var/www/html/public /var/www/src /var/www/config /var/www/html/src/documents
# Copiar el contenido del proyecto al contenedor
COPY ./html/public /var/www/html/public/
COPY ./src /var/www/src/
COPY ./config /var/www/config/
#Configurar los topes máximos de php.ini
RUN cp /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini
RUN sed -i 's/post_max_size = .*/post_max_size = 10M/' /usr/local/etc/php/php.ini
RUN sed -i 's/upload_max_filesize = .*/upload_max_filesize = 10M/' /usr/local/etc/php/php.ini
# Configurar Apache para que el documento raíz sea la carpeta public
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf
# Habilitar el módulo de reescritura de Apache
RUN a2enmod rewrite
# Habilitar los headers
RUN a2enmod headers
# Añadir configuración de reescritura en el archivo de configuración de Apache
RUN echo '<VirtualHost *:80>\n\
    ServerAdmin despitia@uniminuto.edu\n\
    DocumentRoot /var/www/html/public\n\n\
    ErrorLog ${APACHE_LOG_DIR}/error.log\n\
    CustomLog ${APACHE_LOG_DIR}/access.log combined\n\n\
    <Directory /var/www/html/public>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride None\n\
    Require all granted\n\
    RewriteEngine On\n\
    RewriteCond %{REQUEST_FILENAME} !-f\n\
    RewriteCond %{REQUEST_FILENAME} !-d\n\
    RewriteRule ^ index.php [L]\n\
    </Directory>\n\
    # Habilitar CORS\n\
    <IfModule mod_headers.c> \
    Header always set Access-Control-Allow-Origin "*" \n\
    Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE" \n\
    Header always set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With" \n\
    Header always set Access-Control-Expose-Headers "Authorization" \n\
    </IfModule> \n\
    # Manejo de solicitudes OPTIONS\n\
    <IfModule mod_rewrite.c>\n\
    RewriteEngine On\n\
    RewriteCond %{REQUEST_METHOD} OPTIONS\n\
    RewriteRule ^(.*)$ $1 [R=200,L]\n\
    </IfModule>\n\
    </VirtualHost>' > /etc/apache2/sites-available/000-default.conf
# Configurar Apache para suprimir el mensaje de ServerName
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
# Dar permisos correctos a las carpetas
RUN chown -R www-data:www-data /var/www/html \
    && chown -R www-data:www-data /var/www/src \
    && chown -R www-data:www-data /var/www/config \
    && chown -R www-data:www-data /var/www/html/src/documents
# Exponer el puerto 80
EXPOSE 80
# Inicio del servidor Apache
CMD ["apache2-foreground"]

