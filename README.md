Required tools
========
**ruby** with **compass**<br>
**nodejs** with **npm**<br>
**grunt** with **grunt-cli**<br>
**bower**

Install app
========
use **bower install**<br>
use **npm install**<br>
create copy from app/scripts/globals.js-sample with name **app/scripts/globals.js**<br>
create copy from app/.htaccess-sample with name **app/.htaccess**

Configuration
========
app/scripts/globals.js
* change variable 'urlApi' as you needed
* change variable 'environment' as you needed

app/.htaccess
* configure as you needed

.htaccess for 'dev' environment
========
~~~
Header unset ETag
Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
Header set Pragma "no-cache"
Header set Expires "Wed, 11 Jan 2000 05:00:00 GMT"
~~~

Policy
========
Use **rebase** policy to avoid unnecessary commits