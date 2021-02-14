require('dotenv').config()

let validate_token_list = [];

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

function verifyTokenInList(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken_check = bearer[1];

        for (let i = 0; i < validate_token_list.length; i++) {
            if (bearerToken_check === validate_token_list[i]) {
                next();
                break;
            } else {
                if (validate_token_list === (i + 1)) {
                    res.sendStatus(403);
                }
            }
        }
    } else {
        res.sendStatus(403);
    }
}

function pushTokenToValidateList(token) {
    validate_token_list.push(token);
}

function deleteTokenInValidateTokenList(token) {
    const index = validate_token_list.indexOf(token);
    if (index > -1) {
        validate_token_list.splice(index, 1);
    }
}

module.exports = {
    verifyToken,
    verifyTokenInList,
    pushTokenToValidateList,
    deleteTokenInValidateTokenList
}