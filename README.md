**installation:**

`composer install`

`copy .env-example and name it .env`

`php artisan key:generate`

`php artisan migrate --seed`

**Add this on your .env (note: replace url with the correct project url)**
```
APP_URL=http://laravel_twitter.test/

MIX_APP_URL=http://laravel_twitter.test/

MIX_BASE_URL=http://laravel_twitter.test/api/

PASSPORT_PERSONAL_ACCESS_CLIENT_ID=

PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET=
```

`php artisan passport: install`

copy client id  -> paste to PASSPORT_PERSONAL_ACCESS_CLIENT_ID

copy client secret -> paste to PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET


`npm install / yarn install`

`npm run watch / yarn watch`

Accessing the page:

got to http://laravel_twitter.test/ (or whatever the project url)
