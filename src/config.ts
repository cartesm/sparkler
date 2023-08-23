export default {
  db: {
    uri: process.env.DB_URI || "mongodb://127.0.0.1:27017/",
  },
  port: process.env.PORT || 4000,
  masterKeyJwt: process.env.KEY_JWT || "9821",
};
