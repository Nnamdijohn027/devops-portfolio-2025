FROM wordpress:php8.0-apache

LABEL maintainer="Your Name <your.email@example.com>"

# Create a custom PHP configuration directory
RUN mkdir -p /usr/local/etc/php/conf.d

# COMMENT OUT OR REMOVE THIS LINE since we don't have custom.ini:
# COPY custom.ini /usr/local/etc/php/conf.d/

WORKDIR /var/www/html

RUN chown -R www-data:www-data /var/www/html

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1