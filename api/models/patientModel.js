const Carer = require("./carerModel");

module.exports = class Patient {

    constructor(fName, lName) {
        if(typeof(fName) !== "string" || typeof(lName) !== "string") {
            throw new TypeError("Both first and last name should be a string");
        }
        this.fName = fName;
        this.lName = lName;
        this.carers = [];
    }

    addCarer(carer) {
        this.carers.push(carer);
    }

    removeCarer(fName, lName) {
        let carer = fName + " " + lName;
        for (let i = 0; i < this.carers.length; i++) {
            if (this.carers[i].toString() === carer) {
                this.carers.splice(i, 1);
                return true;
            }
            return false;
        }
    }

    toString()  {
        return this.fName + " " + this.lName;
    }
}