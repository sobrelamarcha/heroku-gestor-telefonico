# Notas

Para hacer el push:

    git push heroku HEAD:master

Para checkear si en heroku está corriendo

    heroku ps:scale web=1

Para abrirla en el navegador

    heroku open

Para ver logs

    heroku logs --tail

Para establecer variables de entorno en Heroku:

    heroku config:set MONGODB_URI='aqui-la-ruta'

Para ver la quota usada (para saber el nombre de la app, METODO 1: hacer un git remote -v, y copiar la parte después del dominio y antes del .git, o METODO 2: hacer un heroku open y será la primera parte de la url):

    heroku ps -a [nombre de la app]

En windows si da error al ejecutar npm run build:ui es porque por defecto npm usa el cmd de windows y no entiende los comandos bash. Para solucionarlo:

    npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"

En el gitignore no ignoramos build porque dicha carpeta la queremos subir a heroku para que se sirva la parte cliente desde la parte servidora. La carpeta build viene del proyecto:

    D:\xampp\htdocs\proyectos\full-stack-bootcamp-free\part2\ej2\

Y se regenera mediante el comando npm run build:ui
