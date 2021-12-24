import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
require('dotenv').config({path:__dirname+'/../.env'})

const config: MysqlConnectionOptions ={
    type : 'mysql',
    database : process.env.DATABASE,
    username : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    entities : ['dist/src/**/entities/*.entity.js'],
    synchronize : false,
    migrations : ['dist/src/db/migrations/*.js'],
    cli : {migrationsDir : 'src/db/migrations'},
}

export default config