# Guía Completa de Instalación - E-commerce QA Automation

## 📋 Requisitos del Sistema

### Software Requerido
- **Node.js**: Versión 18.0 o superior
- **npm**: Versión 8.0 o superior (incluido con Node.js)
- **Git**: Para control de versiones
- **PostgreSQL**: Versión 13+ (para base de datos)

### Verificación de Requisitos
\`\`\`bash
node --version    # Debe mostrar v18.0.0 o superior
npm --version     # Debe mostrar 8.0.0 o superior
git --version     # Cualquier versión reciente
psql --version    # PostgreSQL 13+ (opcional para desarrollo)
\`\`\`

## 🚀 Instalación Paso a Paso

### 1. Clonar el Repositorio
\`\`\`bash
git clone https://github.com/tu-usuario/ecommerce-qa-automation.git
cd ecommerce-qa-automation
\`\`\`

### 2. Instalación Automática (Recomendado)
\`\`\`bash
# Instala todas las dependencias y configura navegadores
npm run setup
\`\`\`

### 3. Instalación Manual (Alternativa)
\`\`\`bash
# Instalar dependencias del proyecto
npm install

# Instalar navegadores para Playwright
npx playwright install

# Instalar dependencias del sistema para navegadores
npx playwright install-deps
\`\`\`

### 4. Configuración de Variables de Entorno
\`\`\`bash
# Copiar archivo de configuración
cp .env.example .env

# Editar variables según tu entorno
nano .env  # o usar tu editor preferido
\`\`\`

#### Variables de Entorno Requeridas
\`\`\`env
# Aplicación
BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:3000/api

# Base de Datos (Opcional para desarrollo)
DATABASE_URL=postgresql://usuario:password@localhost:5432/ecommerce_qa

# Usuarios de Prueba
ADMIN_EMAIL=admin@ecommerce-demo.com
ADMIN_PASSWORD=Admin123!
CUSTOMER_EMAIL=test.user@email.com
CUSTOMER_PASSWORD=Test123!

# Configuración de Testing
CI=false
HEADLESS=true
BROWSER=chromium
\`\`\`

## 🗄️ Configuración de Base de Datos (Opcional)

### Opción 1: Usar Datos Mock (Desarrollo Rápido)
La aplicación funciona con datos simulados sin necesidad de base de datos.

### Opción 2: PostgreSQL Local
\`\`\`bash
# Instalar PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Crear base de datos
sudo -u postgres createdb ecommerce_qa

# Ejecutar scripts de inicialización
npm run db:setup
\`\`\`

### Opción 3: Docker (Recomendado)
\`\`\`bash
# Levantar PostgreSQL con Docker
docker run --name ecommerce-db \
  -e POSTGRES_DB=ecommerce_qa \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin123 \
  -p 5432:5432 \
  -d postgres:15

# Ejecutar migraciones
npm run db:migrate
npm run db:seed
\`\`\`

## ▶️ Ejecución del Proyecto

### Desarrollo
\`\`\`bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en:
# - Tienda: http://localhost:3000
# - Admin: http://localhost:3000/admin
\`\`\`

### Producción
\`\`\`bash
# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
\`\`\`

## 🧪 Ejecutar Pruebas

### Configuración Inicial de Testing
\`\`\`bash
# Verificar configuración de Playwright
npx playwright --version

# Ejecutar prueba de configuración
npm run test:config
\`\`\`

### Tipos de Pruebas

#### Todas las Pruebas
\`\`\`bash
npm run test:all
\`\`\`

#### Pruebas UI (Playwright)
\`\`\`bash
# Modo headless (sin interfaz)
npm run test:ui

# Modo headed (con navegador visible)
npm run test:ui:headed

# Modo debug (paso a paso)
npm run test:ui:debug

# Navegador específico
npm run test:ui -- --project=chromium
npm run test:ui -- --project=firefox
npm run test:ui -- --project=webkit
\`\`\`

#### Pruebas API (Jest)
\`\`\`bash
# Todas las pruebas API
npm run test:api

# Modo watch (re-ejecuta al cambiar archivos)
npm run test:api:watch

# Con cobertura de código
npm run test:api:coverage
\`\`\`

#### Pruebas Específicas
\`\`\`bash
# Ejecutar archivo específico
npm run test:ui tests/ui/auth.spec.ts

# Ejecutar por etiqueta
npm run test:ui -- --grep "@smoke"

# Ejecutar en paralelo
npm run test:ui -- --workers=4
\`\`\`

## 📊 Reportes y Resultados

### Ver Reportes
\`\`\`bash
# Reporte HTML de Playwright
npm run report:open

# Reporte Allure (más detallado)
npm run report:allure

# Generar reporte de cobertura
npm run coverage:report
\`\`\`

### Ubicación de Reportes
- **Playwright HTML**: `playwright-report/index.html`
- **Allure**: `allure-report/index.html`
- **Jest Coverage**: `coverage/lcov-report/index.html`
- **Screenshots**: `test-results/`

## 🔧 Solución de Problemas

### Problemas Comunes

#### Error: "Playwright browsers not found"
\`\`\`bash
# Reinstalar navegadores
npx playwright install --force
\`\`\`

#### Error: "Port 3000 already in use"
\`\`\`bash
# Cambiar puerto en package.json o matar proceso
lsof -ti:3000 | xargs kill -9
\`\`\`

#### Error: "Database connection failed"
\`\`\`bash
# Verificar PostgreSQL está ejecutándose
sudo systemctl status postgresql

# Verificar variables de entorno
echo $DATABASE_URL
\`\`\`

#### Pruebas fallan por timeouts
\`\`\`bash
# Aumentar timeout en playwright.config.ts
# timeout: 60000 (60 segundos)
\`\`\`

### Logs y Debugging
\`\`\`bash
# Ver logs detallados de Playwright
DEBUG=pw:api npm run test:ui

# Ver logs de la aplicación
npm run dev -- --verbose

# Limpiar caché de Node
npm run clean
\`\`\`

## 🚀 Despliegue

### Vercel (Recomendado)
\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
\`\`\`

### Docker
\`\`\`bash
# Construir imagen
docker build -t ecommerce-qa .

# Ejecutar contenedor
docker run -p 3000:3000 ecommerce-qa
\`\`\`

## 📚 Recursos Adicionales

- **Documentación QA**: `README-QA.md`
- **Estrategia de Testing**: `docs/test-strategy.md`
- **API Documentation**: `docs/api-docs.md`
- **Troubleshooting**: `docs/troubleshooting.md`

## 🆘 Soporte

Si encuentras problemas:

1. Revisa la sección de solución de problemas
2. Consulta los logs de error
3. Verifica que todas las dependencias estén instaladas
4. Asegúrate de que las variables de entorno estén configuradas

Para soporte adicional, consulta la documentación o crea un issue en el repositorio.
