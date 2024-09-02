# bsmart-crud
Bsmart Challenge. CRUD de productos y categorías con larevel y react.

# Guía de Instalación para el Proyecto bsmart-crud

## 1. Clonación del Repositorio
Clona el repositorio con el comando git clone

```bash
git clone https://github.com/SimonDiLeoGIT/bsmart-crud.git
```

Dirígete al directorio donde hayas clonado el repositorio. 
El directorio debe llamarse bsmart-crud.

```bash
cd bsmart-crud
```

## 2. Configuración del Backend
Accede al directorio backend:

```bash
cd backend
```
Configura el archivo de entorno:
Copia el archivo .env.example a un nuevo archivo .env:

```bash
cp .env.example .env
```

Luego, edita el archivo .env para ajustar las variables de entorno de la conexión con la base de datos:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3310
DB_DATABASE=bsmart_db
DB_USERNAME=bsmartdev
DB_PASSWORD=1234
```

Instala las dependencias de PHP:

```bash
composer install
```

Crea la base de datos MySQL con Docker:
Levanta los servicios de Docker:

```bash
docker compose up -d
```

Ejecuta las migraciones de Laravel:

```bash
php artisan migrate
```

Inicia el servidor de desarrollo de Laravel:

```bash
php artisan serve
```

3. Configuración del Frontend
Accede al directorio frontend:

```bash
cd ../frontend
```

Instala las dependencias de Node.js:

```bash
npm install
```

Inicia el servidor de desarrollo de Node.js:

```bash
npm run dev
```

4. Detención de Servicios
Cuando termines de probar el proyecto, asegúrate de detener los contenedores de Docker para liberar recursos:

```bash
docker compose down
```