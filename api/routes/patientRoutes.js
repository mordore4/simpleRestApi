'use strict';
module.exports = function (app) {
    var patients = require('../controllers/patientsController');

    app.route('/patients')
        .get(patients.getAllPatients)
        .post(patients.addPatient);

    app.route('/patients/:fName/:lName')
        .get(patients.getPatient)
        .delete(patients.deletePatient);

    app.route('/patients/:fName/:lName/addCarer')
        .post(patients.addCarer);

    app.route('/patients/:fName/:lName/:cfName/:clName')
        .delete(patients.deleteCarer);
};