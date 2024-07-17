export default class EmployerModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password
    }

    static add(name, email, password) {
        const newEmployer = new EmployerModel(
            employers.length + 1,
            name,
            email,
            password
        );
        employers.push(newEmployer);
    }
    static isValidUser(email, password) {
        const result = employers.find(
            (u) => u.email == email && u.password == password
        );
        return result;
    }
}


var employers = [];