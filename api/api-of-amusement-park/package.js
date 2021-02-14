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

exports.getPackage = async (req, res) => {
    let sql = "";
    try {
        let data = await verifyJWT(req.token);
        if (data) {
            if (parseInt(data.user.id_status_member) === 2078987349) {
                sql = `SELECT @n := @n + 1 no, a.id_package, a.package_name, a.package_detail FROM tb_package As a INNER JOIN tb_member AS b ON a.id_amusement = b.id_amusement, (SELECT @n := 0) m`;
            }
            else if (parseInt(data.user.id_status_member) === 1) {
                sql = `SELECT @n := @n + 1 no, a.id_package, a.package_name, a.package_detail FROM tb_package As a INNER JOIN tb_member AS b ON a.id_amusement = b.id_amusement AND a.id_amusement = ${parseInt(data.user.id_amusement)}, (SELECT @n := 0) m`;
            }
            else {
                res.sendStatus(403);
            }

            let result = await querySQL(sql);
            if(result) {
                res.json ({ result });
            }
        }
        else {
            console.log('else')
            res.json({
                status: 0,
                message: 'get package fail!'
            });
        }
    } catch (err) {
        res.json({
            status: 0,
            message: err
        });
    }
}

exports.deletePackage = async (req, res) => {
    try {
        let data = await verifyJWT(req.token);

        if (data) {
            if (parseInt(data.user.id_status_member) === 2078987349 || parseInt(data.user.id_status_member) === 1) {
                let sql = `DELETE FROM tb_package WHERE id_package = ${req.body.id_package}`;

                let result = await querySQL(sql);
                if (result) {
                    res.json({
                        status: 1,
                        message: 'delete package successfully'
                    });
                } else {
                    res.json({
                        status: 0,
                        message: 'delete package fail'
                    });
                }
            } else {
                res.sendStatus(403);
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

exports.addPackage = async (req, res) => {
    console.log('add package')
    try {
        console.log('brfore data')
        let data = await verifyJWT(req.token);
        console.log(data)

        if (data) {
            if (parseInt(data.user.id_status_member) === 2078987349 || parseInt(data.user.id_status_member) === 1) {
                let sql = `INSERT INTO tb_package (id_amusement, package_name, package_detail, main_img) VALUES (${data.user.id_amusement}, '${req.body.package_name}', '${req.body.package_detail}', '${req.files.main_img[0].filename}')`;
                console.log(sql)
                console.log('before main')
                let insert_package = await querySQL(sql);

                if (req.files.sub_imgs) {
                    console.log('loop sub')
                    let sql_img = `INSERT INTO tb_img_package (id_package, name_img) VALUES `;
                    for (let i = 1; i <= req.files.sub_imgs.length; i++) {
                        if (i != req.files.sub_imgs.length) {
                            sql_img += `('${insert_package.insertId}', '${req.files.sub_imgs[i-1].filename}'),`;
                        } else {
                            sql_img += `('${insert_package.insertId}', '${req.files.sub_imgs[i-1].filename}')`;
                        }
                    }
                    console.log('before sub')
                    let insert_img = await querySQL(sql_img);
                    if (insert_package && insert_img) {
                        console.log('yes')
                        res.json({
                            status: 1,
                            message: 'insert package successfully'
                        });
                    }
                }
            } else {
                console.log('no1')
                res.sendStatus(403);
            }
        }
        else {
            console.log('no2')
            res.sendStatus(403);
        }
    } catch (err) {
        console.log('err')
        res.json({
            status: 0,
            message: err
        });
    }
}

exports.editPackage = async (req, res) => {
    try {
        let data = await verifyJWT(req.token);

        if (data) {
            if (parseInt(data.user.id_status_member) === 2078987349 || parseInt(data.user.id_status_member) === 1) {
                let sql = `SELECT package_name, package_detail FROM tb_package WHERE id_package = ${req.body.id_package}`;
                console.log(sql)
                let result = await querySQL(sql);

                if (result) {
                    res.json({
                        status: 1,
                        result: result
                    });
                } else {
                    res.json({
                        status: 0,
                        message: 'get data package fail'
                    });
                }
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        res.json({
            status: 0,
            message: err
        });
    }
}