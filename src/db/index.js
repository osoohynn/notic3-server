const { Pool } = require('pg')

class Database {
    #database;

    constructor() {
        this.#connect();
    }

    async #connect() {
        this.#database = new Pool({
            user: 'dgsw38', // Database 소유자
            host: 'localhost', // Host
            database: 'nodedb', // Database 이름
            password: 'apple080915', // Database 비밀번호
            port: 5432, // Database 포트
        });
        try {
            await this.#database.connect();
        } catch (error) {
            console.log('Database connect failed');
        }
    }

    async query(_query) {
        return await this.#database.query(_query);
    }
}

const database = new Database();
module.exports = database;