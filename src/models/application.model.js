

export default class ApplicationModel {
    constructor(companyname, name, email, resume) {
        this.companyname = companyname,
        this.name = name,
        this.email = email,
        this.resume = resume
    }

    static addApplication(companyname, name, email, resume) {
        applications.push(new ApplicationModel(companyname, name, email, resume));
        console.log(applications);
    }

    static findCompanyApplication(companyname) {
        return applications.filter(application => application.companyname == companyname);
    }
}

var applications = [];