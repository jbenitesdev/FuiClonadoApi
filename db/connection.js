const mysql = require('mysql')

module.exports = {
    execSQLQuery: () => {
        const connection = mysql.createPool({
            host: "us-cdbr-east-02.cleardb.com",
            user: "beeba4f45bf370",
            port: "3306",
            password: "44f9224e",
            database: "heroku_23a2cbdbfd88261"
        });
      
        return connection
    }
    
}

