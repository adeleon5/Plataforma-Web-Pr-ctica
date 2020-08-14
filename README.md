# Plataforma-Web-Prueba
Recuerde descargar este repositorio también: https://github.com/adeleon5/API-RES-ADMIN-USUARIO-SPRING-BOOT.git
1. Abrir y ejecutar el archivo de la ruta Script DB_WEB_TELECOMUNICA/Script DB Plataforma Web.sql, debe abrirlo en SQL version 2012 esencialmente, puede usar una version posterior o almenos una anterior.
2. Abrir y ejecutar el archivo de la ruta Script DB_WEB_TELECOMUNICA/Inserciones iniciales.sql
3. Abrir el proyecto APIRoles en STS 4 - Spring Tool Suit 4 (link de descarga:https://spring.io/tools) o bien en eclipse pero debera instalar una serie de libreriar para el funcionamiento correcto. 
   3.1 Nota si la version de SQL Server no es la 2012 debe buscar el archivo application.properties en la ruta src/main/resource y editar esta línea(spring.jpa.hibernate.dialect=org.hibernate.dialect.SQLServer2012Dialect) sustituyendo la  palabra .SQLServer[version]Dialect
4. Poner a correr el proyecto APIRoles--->Buscar el panel inferior izquierdo llamado Boot Dashboard-->clic en el nodo local --->clic derecho sobre APIRoles[devtools]-->clic en (Re)start. Esto habilita el API Rest en la URL: http://localhost:8080/
5. Abrir el proyecto Angular Plataforma Web Demo arrastrandolo hacia VS Code
6. Ir a las opciones del menu de VS Code y buscar Terminal-->Nueva terminal
7. En la nueva terminal escribimos cd PlataformaWeb
8. En la terminal escribimos ng serve --open esto nos abre el frontend en esta URL http://localhost:4200/login
9. Nos logueamos con el usuario: demo@gmail.com y la clave: 12345 y ya podemos hacer uso de la plataforma como se ve en el video
