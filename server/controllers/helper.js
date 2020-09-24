const formidable = require('formidable');

async function getFormFields(req) {
    let form = new formidable.IncomingForm();

    let formfields = await new Promise(function (resolve, reject) {
        form.parse(req, function (err, fields, files) {
            if (err) {
                reject(err);
                return;
            }
            resolve(fields);
        }); 
    });

    return formfields;
}

module.exports = {
    getFormFields
}