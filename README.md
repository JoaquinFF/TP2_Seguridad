
# TP 2 Seguridad

Código desarrollado por Joaquín Flores, Facundo Guevara, Sofía Ruiz y Agustín Vitali. Es un código en node sencillo para hacer consultas a la api de rick y morty.




## Instalación

Para correr localmente el proyecto se debe clonar el proyecto

```bash
git clone https://github.com/JoaquinFF/TP2_Seguridad.git
```
Luego, se deben instalar las dependencias

```bash
npm install
```
(Opcional) Agregar la API de OpenWeatherMap en una variable de entorno en un .env en la raiz del proyecto. Esto servirá para consultar la información del clima en Mendoza

```bash
OPENWEATHERMAP_API_KEY=TuApiKey
```

Una vez instaladas las dependencias ya se puede levantar localmente

```bash
npm run start
```


## Uso

Para obtener algunos personajes de Rick y Morty se usa la siguiente ruta

```bash
/characters
```

Para obtener la información del personaje Rick Sanchez se usa la siguiente ruta

```bash
/rick-info
```

Para obtener la información del personaje Hombre Pájaro se usa la siguiente ruta

```bash
/hombre-pajaro
```

Para obtener la información del clima en mendoza se usa la siguiente ruta.
Nota: se debe haber agregado previamente la api key en el .env. Como se indica en la sección anterior

```bash
/clima
```


## Deployment

Para hacer el deploy, se debe hacer un push de un commit y automaticamente se pondrá ese cambio en producción

```bash
  git add .
  git commit -am "mensaje"
  git pull origin main
  git push origin main
```

Se puede acceder a estos cambios a traves de este link

https://tp2seguridad-production.up.railway.app/characters

