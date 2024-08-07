# Dynamic Secret Database
## Conect Vault to database
we can using user root installed at mariadb or you can create new user for vault
Syntax Vault
```
vault write database/config/demo-database \
plugin_name=mysql-database-plugin \
connection_url="{{username}}:{{password}}@tcp(IP:PORT)/" \
allowed_roles="*" \
username="root" \
password="YOURPASSWORD"
```
## Create role database
```
vault write database/roles/db-admin \
db_name=demo-database \
creation_steatments="CREATE USER '{{name}}'@'%' IDENTIFIED BY '{{password}}';" \
creation_steatments="GRANT ALL PRIVILEGES ON *.* TO '{{name}}'@'%';" \
revocation_steatments="DROP USER '{{name}}'@'%';" \
default_ttl="1h" \
max_ttl="24h"
```
## Create role database (Read ONly)
```
vault write database/roles/db-admin \
db_name=demo-database \
creation_steatments="CREATE USER '{{name}}'@'%' IDENTIFIED BY '{{password}}';" \
creation_steatments="GRANT SELECT ON *.* TO '{{name}}'@'%';" \
revocation_steatments="DROP USER '{{name}}'@'%';" \
default_ttl="1h" \
max_ttl="24h"
```

## Generte Dynamic Secret (Admin Role)
```
vault read database/creds/db-admin
```

Steps to Configure Database Secrets Engine and Role in Vault
Enable the Database Secrets Engine (if not already enabled):

sh
Copy code
```vault secrets enable database```
Configure the Database Connection:
Ensure that the database connection is configured correctly, including the connection_url and credentials:

```vault write database/config/demo-database \
    plugin_name=mysql-database-plugin \
    connection_url="{{username}}:{{password}}@tcp(IP:PORT)/" \
    allowed_roles="db-admin" \
    username="root" \
    password="YOURPASSWORD"```
Create Database Role:
Define the SQL statements that Vault will use to create and revoke the database credentials. For MySQL, you need to provide db_name, creation_statements, default_ttl, and max_ttl:


```vault write database/roles/db-admin \
    db_name=demo-database \
    creation_statements="CREATE USER '{{name}}'@'%' IDENTIFIED BY '{{password}}'; GRANT ALL PRIVILEGES ON *.* TO '{{name}}'@'%' WITH GRANT OPTION;" \
    default_ttl="1h" \
    max_ttl="24h"```
In this example:

db_name refers to the name of the database configuration.
creation_statements contains the SQL commands to create a new user and grant permissions.
default_ttl is the time-to-live for the generated credentials.
max_ttl is the maximum time-to-live for the generated credentials.
Read the Credentials:
Once the role is properly configured, you can generate and read the database credentials using:

```vault read database/creds/db-admin```
Verify Configuration and Connectivity
Check Vault Logs:
Ensure there are no additional errors in the Vault logs that might indicate other configuration issues.

```docker logs <vault-container-name>```
Test Database Connection:
Manually connect to the MySQL database using the root credentials to ensure the connection details are correct:

```mysql -u root -pYOURPASSWORD -h IP```
Review Vault Configuration:
Make sure all the environment variables and configurations for Vault are set correctly, including VAULT_ADDR and VAULT_TOKEN.

By following these steps, you should be able to configure the Vault database secrets engine correctly and resolve the "empty creation statements" error.

```SELECT user,host FROM mysql.user;```

Example Configuration
Enable the Database Secrets Engine (if not already enabled):

```vault secrets enable database```
Configure the Database Connection:
Ensure that the database connection is configured correctly, including the allowed_roles parameter:

```vault write database/config/demo-database \
    plugin_name=mysql-database-plugin \
    connection_url="{{username}}:{{password}}@tcp(IP:port)/" \
    allowed_roles="db-admin,db-read-only" \
    username="root" \
    password="YOURPASSWORD"```
Create Database Roles:

Admin Role:

```vault write database/roles/db-admin \
    db_name=demo-database \
    creation_statements="CREATE USER '{{name}}'@'%' IDENTIFIED BY '{{password}}'; GRANT ALL PRIVILEGES ON *.* TO '{{name}}'@'%' WITH GRANT OPTION;" \
    default_ttl="1h" \
    max_ttl="24h"```
Read-Only Role:

```vault write database/roles/db-read-only \
    db_name=demo-database \
    creation_statements="CREATE USER '{{name}}'@'%' IDENTIFIED BY '{{password}}'; GRANT SELECT ON *.* TO '{{name}}'@'%';" \
    default_ttl="1h" \
    max_ttl="24h"```
Read the Credentials:
Once the roles are properly configured, you can generate and read the database credentials using:

```vault read database/creds/db-read-only```
Verify Configuration and Connectivity
Check Vault Logs:
Ensure there are no additional errors in the Vault logs that might indicate other configuration issues.

```docker logs <vault-container-name>```
Test Database Connection:
Manually connect to the MySQL database using the root credentials to ensure the connection details are correct:

```mysql -u root -pYOURPASSWORD -h IP```
Review Vault Configuration:
Make sure all the environment variables and configurations for Vault are set correctly, including VAULT_ADDR and VAULT_TOKEN.

By following these steps, you should be able to configure the Vault database secrets engine correctly and resolve the "db-read-only is not an allowed role" error.

for revoke

```vault list sys/leases/lookup/database/creds/db-admin```
```vault lease revoke database/creds/db-admin/token```




