# Teste Full-stack Quikdev 2020

Foi desenvolvido uma API REST com [Laravel 8](https://laravel.com/docs/8.x) e [Laravel Responder](https://github.com/flugger/laravel-responder)<br>
A interface do front foi desenvolvida utilizando [React JS](https://pt-br.reactjs.org/docs/getting-started.html)
### Instalação
```sh
$ git clone https://github.com/ericpereira/desafio-quikdev.git
$ cd desafio-quikdev
$ cd laradock
$ cp env-example .env
$ docker stop $(docker ps -a -q)
$ docker-compose up -d php-fpm apache2 workspace
$ docker-compose exec --user=laradock workspace sh -c "cd /var/www/api && php7.3 /usr/local/bin/composer install && cp .env.example .env && php7.3 artisan key:generate"
```
### Rodar
Depois de instalado só abrir a url [http://localhost/](http://localhost/)
