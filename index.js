const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
let db;

async function go() {
    db = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'example',
        database: 'pets'
    })

    app.listen(3000);

}

go();

app.get('/', async (req, res) => {
    const [users] = await db.execute('SELECT * FROM users');
    res.send(`<ul>${users.map(cat => `<li>${cat.name}</li>`).join('')}</ul>`)
    console.log(users);
})


