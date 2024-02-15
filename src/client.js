require("dotenv").config();

module.exports = {
    debug: true,
    token: process.env.TOKEN || "",
    clientID: process.env.CLIENT_ID || "",
}