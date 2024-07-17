export default class JobModel {
    constructor(id, companyname, role, salary) {
        this.id = id,
        this.companyname = companyname,
        this.role = role,
        this.salary = salary
    }


    static createNewJobs(companyname, role, salary) {
        const newJob = new JobModel(
            jobs.length + 1,
            companyname,
            role,
            salary
        );
        jobs.push(newJob);
    }
    
    static getJobs(companyname) {
        
        const result = jobs.filter(job => job.companyname == companyname);
        console.log(`Inside getJobs ${companyname} ${result}`)
        const res = {
            result:result, 
            afterlogin: true
        }
        return res;
    }

    static getAllJobs() {
        const res = {
            result:jobs, 
            afterlogin: false
        }
        return res;
    }
}

var jobs = [];

