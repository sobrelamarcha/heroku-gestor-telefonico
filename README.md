# Notas

Para hacer el push:

    git push heroku HEAD:master

Para checkear si en heroku está corriendo

    heroku ps:scale web=1

Para abrirla en el navegador

    heroku open

Para ver logs

    heroku logs --tail

Para ver la quota usada (para saber el nombre de la app, METODO 1: hacer un git remote -v, y copiar la parte después del dominio y antes del .git, o METODO 2: hacer un heroku open y será la primera parte de la url):

    heroku ps -a [nombre de la app]
