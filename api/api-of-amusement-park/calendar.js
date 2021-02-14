const jwt = require('jsonwebtoken');
const con = require('../../app/connect/connect');
const configJWT = require('../config/configJWT');
require('dotenv').config()

//main function for query sql
function querySQL(sql) {
    return new Promise(function (resolve, reject) {
        con.query(sql, (err, result) => {
            if (err) throw reject(err);
            resolve(result);
        })
    })
}

function verifyJWT(token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, process.env.secretkey, async (err, data) => {
            if (err) {
                configJWT.deleteTokenInValidateTokenList(token.toString());
                resolve(data);
            } else {
                resolve(data);
            }
        });
    });
}

exports.getCalendar = async (req, res) => {
    let sql = "";
    try {
        let data = await verifyJWT(req.token);

        if (data) {
            if (parseInt(data.user.id_status_member) === 2078987349) {
                sql = `SELECT id_package, package_name FROM tb_package`;
            }
            else if (parseInt(data.user.id_status_member) === 1) {
                sql = `SELECT id_package, package_name FROM tb_package WHERE id_amusement = ${data.user.id_amusement}`;
            }
            else {
                res.sendStatus(403);
            }
            console.log(sql)
            let result = await querySQL(sql);
            if(result) {
                res.json({
                    status:1,
                    result: result
                });
            }
            else {
                res.json({
                    status:0,
                    message: 'get data package fail'
                });
            }
        }
        else {
            res.sendStatus(403);
        }
    } catch (err) {
        res.json({
            status: 0,
            message: err
        });
    }
}

exports.getCalendarPackage = async (req, res) => {
    let sql = "";
    try {
        let data = await verifyJWT(req.token);

        if (data) {
            if (parseInt(data.user.id_status_member) === 2078987349) {
                sql = `SELECT id_calendar_package, inventory_ticket, price_child, price_adult, promotion_code, date_no_of_ticket FROM tb_calendar_package WHERE id_package = ${req.body.id_package} AND date_no_of_ticket BETWEEN '${req.body.start_date}' AND '${req.body.to_date}' ORDER BY date_no_of_ticket`;
            }
            else if (parseInt(data.user.id_status_member) === 1) {
                sql = `SELECT id_calendar_package, inventory_ticket, price_child, price_adult, promotion_code, date_no_of_ticket FROM tb_calendar_package WHERE id_package = ${req.body.id_package} AND date_no_of_ticket BETWEEN '${req.body.start_date}' AND '${req.body.to_date}' AND id_amusement = ${parseInt(data.user.id_amusement)} ORDER BY date_no_of_ticket`;
            }
            else {
                res.sendStatus(403);
            }
            let result = await querySQL(sql);
            if(result) {
                res.json({
                    status:1,
                    result: result
                });
            }
            else {
                res.json({
                    status:0,
                    message: 'get data calendar fail'
                });
            }
        }
        else {
            res.sendStatus(403);
        }
    } catch (err) {
        res.json({
            status: 0,
            message: err
        });
    }
}