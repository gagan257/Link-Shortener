# How to use Short URL


## 1. install node.js app in your PC (version 18 or above)
## 2.Make sure your MySQL service is running in background in your PC. 
## 3. Make sure that you have a database named `shorturl` with one table `links` in it.
    > links must contain three columns
    > "longurl" of varchar(100), "shorturlid" of varchar(100) & "count" of int type
## 4. Delete files `Package.json` & `package-lock.json` from the code folder
## 5. In the code folder do the following steps:
  > Run the following commands

```shell
    npm init
    npm install node express mysql mysql2
```
## 6. From line 9 to 24 in the `code.js` edit the information:

```shell
    const con = mysql.createConnection({
    host: "localhost",
    user: "YOUR_MYSQL_USERNAME_HERE",
    password: "YOUR_MYSQL_PASSWORD_HERE",
    database: "YOUR_MYSQL_DATABASE_NAME",
    authPlugins: {
        mysql_clear_password: () => () => {
          return signer.getAuthToken({
            region,
            hostname,
            port,
            username
          });
        }
      },
});
```

## 7. Run the code
```shell
    node code.js
``` 

## 8. Visit http://localhost:5000 to see the result