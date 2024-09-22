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

Cargar la base de datos:
Si quiere pobar el funcionamiento con datos reales cargados puede copiar las siguientes líneas para cargar la base de datos:

```sql
-- Insertar categorìas
INSERT INTO categories (name, description) VALUES
('Notebooks', 'Categoría de Notebooks'),
('Celulares', 'Categoría de Celulares');

-- Insertar celulares en categorìa Celulares
INSERT INTO products (name, description, price, stock, category_id, created_at, updated_at) VALUES
('Notebook HP 1', 'Notebook HP 1 con 8GB RAM y 256GB SSD', 899.99, 10, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook HP 2', 'Notebook HP 2 con 16GB RAM y 512GB SSD', 1199.99, 15, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook Dell 1', 'Notebook Dell 1 con 8GB RAM y 256GB SSD', 949.99, 12, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook Dell 2', 'Notebook Dell 2 con 16GB RAM y 512GB SSD', 1299.99, 8, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook Lenovo 1', 'Notebook Lenovo 1 con 8GB RAM y 256GB SSD', 879.99, 14, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook Lenovo 2', 'Notebook Lenovo 2 con 16GB RAM y 512GB SSD', 1249.99, 9, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook ASUS 1', 'Notebook ASUS 1 con 8GB RAM y 256GB SSD', 919.99, 16, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook ASUS 2', 'Notebook ASUS 2 con 16GB RAM y 512GB SSD', 1199.99, 13, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook Acer 1', 'Notebook Acer 1 con 8GB RAM y 256GB SSD', 859.99, 16, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook Acer 2', 'Notebook Acer 2 con 16GB RAM y 512GB SSD', 1219.99, 10, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook MSI 1', 'Notebook MSI 1 con 8GB RAM y 256GB SSD', 999.99, 7, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook MSI 2', 'Notebook MSI 2 con 16GB RAM y 512GB SSD', 1299.99, 5, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook HP 3', 'Notebook HP 3 con 8GB RAM y 256GB SSD', 889.99, 12, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook HP 4', 'Notebook HP 4 con 16GB RAM y 512GB SSD', 1199.99, 8, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook Dell 3', 'Notebook Dell 3 con 8GB RAM y 256GB SSD', 929.99, 14, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook Dell 4', 'Notebook Dell 4 con 16GB RAM y 512GB SSD', 1249.99, 16, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook Lenovo 3', 'Notebook Lenovo 3 con 8GB RAM y 256GB SSD', 879.99, 13, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook Lenovo 4', 'Notebook Lenovo 4 con 16GB RAM y 512GB SSD', 1229.99, 6, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook ASUS 3', 'Notebook ASUS 3 con 8GB RAM y 256GB SSD', 929.99, 9, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW()),
('Notebook ASUS 4', 'Notebook ASUS 4 con 16GB RAM y 512GB SSD', 1199.99, 10, (SELECT id FROM categories WHERE name = 'Notebooks'), NOW(), NOW());

-- Insertar notebooks en categorìa Notebooks
INSERT INTO products (name, description, price, stock, category_id, created_at, updated_at) VALUES
('Celular Samsung A52', 'Celular Samsung A52 con 6GB RAM y 128GB almacenamiento', 399.99, 20, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW()),
('Celular Samsung A72', 'Celular Samsung A72 con 8GB RAM y 256GB almacenamiento', 499.99, 18, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW()),
('Celular Samsung S21', 'Celular Samsung S21 con 8GB RAM y 128GB almacenamiento', 699.99, 22, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW()),
('Celular Samsung S21 Ultra', 'Celular Samsung S21 Ultra con 12GB RAM y 256GB almacenamiento', 1199.99, 15, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW()),
('Celular Apple iPhone 12', 'Celular Apple iPhone 12 con 4GB RAM y 64GB almacenamiento', 799.99, 17, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW()),
('Celular Apple iPhone 12 Pro', 'Celular Apple iPhone 12 Pro con 6GB RAM y 128GB almacenamiento', 999.99, 13, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW()),
('Celular Apple iPhone 13', 'Celular Apple iPhone 13 con 4GB RAM y 128GB almacenamiento', 849.99, 19, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW()),
('Celular Apple iPhone 13 Pro', 'Celular Apple iPhone 13 Pro con 6GB RAM y 256GB almacenamiento', 1099.99, 10, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW()),
('Celular Xiaomi Mi 11', 'Celular Xiaomi Mi 11 con 8GB RAM y 128GB almacenamiento', 499.99, 25, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW()),
('Celular Xiaomi Mi 11 Ultra', 'Celular Xiaomi Mi 11 Ultra con 12GB RAM y 256GB almacenamiento', 899.99, 12, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW()),
('Celular Huawei P40', 'Celular Huawei P40 con 8GB RAM y 128GB almacenamiento', 469.99, 20, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW()),
('Celular Huawei P40 Pro', 'Celular Huawei P40 Pro con 8GB RAM y 256GB almacenamiento', 699.99, 14, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW()),
('Celular OnePlus 9', 'Celular OnePlus 9 con 8GB RAM y 128GB almacenamiento', 599.99, 26, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW()),
('Celular OnePlus 9 Pro', 'Celular OnePlus 9 Pro con 12GB RAM y 256GB almacenamiento', 899.99, 16, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW()),
('Celular Motorola Moto G', 'Celular Motorola Moto G con 4GB RAM y 64GB almacenamiento', 299.99, 30, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW()),
('Celular Motorola Moto G Power', 'Celular Motorola Moto G Power con 4GB RAM y 128GB almacenamiento', 349.99, 22, (SELECT id FROM categories WHERE name = 'Celulares'), NOW(), NOW());
```

Inicia el servidor de desarrollo de Laravel:

```bash
php artisan serve
```

## 3. Configuración del Frontend
Accede al directorio frontend:

```bash
cd ../frontend
```

Instala las dependencias del Front End:

```bash
npm install
```

Inicia el Front End:

```bash
npm run dev
```

## 4. Detención de Servicios
Cuando termines de probar el proyecto, asegúrate de detener los contenedores de Docker para liberar recursos:

```bash
docker compose down
```
