module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "ayna-backend"), //Name of database
      user: env("DATABASE_USERNAME", "postgres"), //Default username
      password: env("DATABASE_PASSWORD", "prince24akshat"), //Password to your PostgreSQL database
      ssl:{
        rejectUnauthorized: false
      }
    },
  },
});
