const Carer = require("../models/carerModel");
const Patient = require("../models/patientModel");

let patients = [new Patient("Sam", "Demeulenaere")];

exports.getAllPatients = (req, res) => {
    res.json(patients);
}

exports.addPatient = (req, res) => {
    let data = req.body;

    if (!(data.fName && data.lName)) {
        res.json("invalid patient");
    }
    else {
        try {
            let patient = new Patient(data.fName, data.lName);
            patients.push(patient);
            res.json(`added patient`)
        } catch (e) {
            res.json(e.name + ": " + e.message);
        }
    }
}

exports.getPatient = (req, res) => {
    let fName = req.params.fName;
    let lName = req.params.lName;
    let pIndex = findPatientWithName(fName, lName);

    if (pIndex > -1) {
        res.json(patients[pIndex])
    } else {
        res.json(`Could not find patient ${fName} ${lName}`);
    }
}

exports.deletePatient = (req, res) => {
    let fName = req.params.fName;
    let lName = req.params.lName;
    let pIndex = findPatientWithName(fName, lName);

    if (pIndex > -1) {
        patients.splice(pIndex, 1);
        res.json(`Patient ${fName} ${lName} was deleted`);
    } else {
        res.json(`Could not find patient ${fName} ${lName}`);
    }
}

exports.addCarer = (req, res) => {

    let data = req.body;
    let fName = req.params.fName;
    let lName = req.params.lName;
    let pIndex = findPatientWithName(fName, lName);

    if (pIndex > -1) {
        if (!(data.fName && data.lName)) {
            res.json("invalid Carer");
        }
        else {
            try {
                let carer = new Carer(data.fName, data.lName);
                patients[pIndex].addCarer(carer);
                res.json("Carer added");
            } catch (e) {
                res.json(e.name + ": " + e.message);
            }
        }
    } else {
        res.json(`Could not find patient ${fName} ${lName}`);
    }

}

exports.deleteCarer = (req, res) => {
    let data = req.body;
    let params = req.params;
    let fName = params.fName;
    let lName = params.lName;
    let cfName = params.cfName;
    let clName = params.clName;
    let pIndex = findPatientWithName(fName, lName);

    if (pIndex > -1) {
        console.log(data);
        if (patients[pIndex].removeCarer(cfName, clName)) {
            res.json("Carer deleted");
        } else {
            res.json(`This patient does not have ${cfName} ${clName} as carer`);
        }
    } else {
        res.json(`Could not find patient ${fName} ${lName}`);
    }
}

function findPatientWithName(fName, lName) {
    let patient = fName + " " + lName;
    for (let i = 0; i < patients.length; i++) {
        if (patients[i].toString() === patient)
            return i;
    }
    return -1;
}