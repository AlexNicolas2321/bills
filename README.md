# Sistema de Gestión de Gastos con Calendario

Esta aplicación permite gestionar gastos organizados por fechas usando un calendario interactivo.

## Características

- 📅 **Calendario interactivo** que muestra principals y gastos por día
- 💰 **Gestión de gastos** con descripción y monto
- 📝 **Principals** que organizan los gastos por fecha
- 🎨 **Interfaz moderna** y responsive
- 🔄 **Actualización en tiempo real** del calendario

## Tecnologías

### Frontend
- React.js
- Axios para peticiones HTTP
- react-calendar para el calendario
- CSS personalizado

### Backend
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Lombok

## Instalación y Ejecución

### 1. Backend (Spring Boot)

```bash
cd springboot
./mvnw spring-boot:run
```

El backend se ejecutará en `http://localhost:8080`

### 2. Frontend (React)

```bash
cd bills-frontend
npm install
npm start
```

El frontend se ejecutará en `http://localhost:3000`

## Uso de la Aplicación

1. **Crear un Principal**: Selecciona una fecha en el calendario y crea un principal con título y descripción
2. **Agregar Gastos**: Una vez creado el principal, puedes agregar gastos con descripción y monto
3. **Ver en Calendario**: Los días con principals se muestran en azul, y los días con gastos en verde
4. **Editar/Eliminar**: Puedes editar o eliminar principals y gastos existentes

## Estructura del Proyecto

```
JavaGAstosAbu/
├── bills-frontend/          # Aplicación React
│   ├── src/
│   │   ├── Component/       # Componentes React
│   │   ├── App.js          # Componente principal
│   │   └── App.css         # Estilos
│   └── package.json
└── springboot/             # Aplicación Spring Boot
    ├── src/main/java/
    │   └── com/managementBills/springboot/
    │       ├── Controller/  # Controladores REST
    │       ├── Entity/      # Entidades JPA
    │       ├── Repository/  # Repositorios
    │       └── Service/     # Servicios
    └── pom.xml
```

## API Endpoints

### Principals
- `GET /principal` - Obtener todos los principals
- `GET /principal/{id}` - Obtener un principal por ID
- `POST /principal` - Crear un nuevo principal
- `PUT /principal/{id}` - Actualizar un principal
- `DELETE /principal/{id}` - Eliminar un principal

### Expenses
- `GET /expenses` - Obtener todos los gastos
- `GET /expenses/{id}` - Obtener un gasto por ID
- `POST /expenses` - Crear un nuevo gasto
- `PUT /expenses/{id}` - Actualizar un gasto
- `DELETE /expenses/{id}` - Eliminar un gasto

## Base de Datos

La aplicación usa PostgreSQL con las siguientes tablas:
- `principals`: Almacena los principals con fecha, título y descripción
- `expenses`: Almacena los gastos con descripción, monto y referencia al principal

## Solución de Problemas

### Problemas Comunes

1. **Error de CORS**: Los controladores ya incluyen `@CrossOrigin(origins = "*")`
2. **Fechas no se actualizan**: Asegúrate de que el backend esté ejecutándose
3. **Calendario no muestra datos**: Verifica que la base de datos tenga datos

### Logs

- Frontend: Revisa la consola del navegador
- Backend: Los logs aparecen en la terminal donde ejecutaste Spring Boot
