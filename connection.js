var mysql = require("mysql");
var util = require("util");
var connection = mysql.createConnection({
    host:"btnjt8n91ymerailjgpq-mysql.services.clever-cloud.com",
    user:"ufqs04qcw2u13tu3",
    password:"0fRCsN5w6OpuLmHXnqPB",
    database:"btnjt8n91ymerailjgpq"
});
var exe = util.promisify(connection.query).bind(connection);

module.exports = exe;
