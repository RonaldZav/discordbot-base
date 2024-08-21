require("dotenv").config();

module.exports = {
    debug: true,
    token: process.env.TOKEN || "",
    clientID: process.env.CLIENT_ID || "",
    mongodb: {
        uri: process.env.MONGODB_URI || "",
        db: process.env.MONGODB_DB || "",
    }
}