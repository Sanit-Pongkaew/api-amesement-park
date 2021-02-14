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

exports.checkLogin = async (req, res) => {
    try {
        let sql = `SELECT id_status_member, id_amusement FROM tb_member WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
        // console.log(sql)
        let result = await querySQL(sql);
        
        if (result.length === 1) {
            let user = {
                id_status_member: result[0].id_status_member,
                id_amusement: result[0].id_amusement
            }
            jwt.sign({ user }, process.env.secretkey, { expiresIn: "6h" }, (err, token) => {
                configJWT.pushTokenToValidateList(token.toString());
                res.json({
                    status_fetch: 1,
                    status: result[0].id_status_member,
                    id_amusement: result[0].id_amusement,
                    token: token
                });
            });
        } else {
            res.json({
                status: 0
            });
        }
    }
    catch(err) {
        console.log(err.message);
        res.json({
            status: 0,
            message: err.message
        });
    }
}

exports.deleteTokenInValidateTokenList = (req, res) => {
    configJWT.deleteTokenInValidateTokenList(req.body.token);
    res.json({
        status: 1,
        message: 'Logout successfully'
    });
}