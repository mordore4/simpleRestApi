module.exports = class Carer {

    constructor (fName, lName) {
        if(typeof(fName) !== "string" || typeof(lName) !== "string") {
            throw new TypeError("Both first and last name should be a string");
        }
        this.fName = fName;
        this.lName = lName;
    }

    toString()  {
        return this.fName + " " + this.lName;
    }
}