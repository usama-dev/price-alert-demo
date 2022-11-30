const env = process.env.NODE_ENV || "development";

let config = {
  development: {
    port: 3000,
    host: "http://localhost",
    mongoConnectionUrl: "mongodb://localhost:27018?directConnection=true",
  },
  production: {
    port: Number(process.env.NODE_PORT),
    host: "http://54.242.163.240",
    mongoConnectionUrl: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}?directConnection=true`,
  },
};

if (env === "development") config = config.development;
if (env === "production") config = config.production;

console.log("---", env);
console.log(config);

module.exports = config;
