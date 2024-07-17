import ApplicationModel from "../models/application.model.js";
import JobModel from "../models/job.model.js";

export default class JobController {
    getJobs(req, res) {
        const jobsList = JobModel.getAllJobs();
        res.render('afterlogin', {user: null, jobs: jobsList.result, afterlogin: jobsList.afterlogin});
    }

    applyJobs(req, res) {
        console.log("Welcome to applyJobs get");
        const {companyname} = req.query;
        console.log(companyname);
        res.render('applyjob', {user: null, companyname});
    }

    postApplyJobs(req, res) {
        const {companyname, name, email} = req.body;
        console.log(req.file);
        const resume = req.file;
        ApplicationModel.addApplication(companyname, name, email, resume);
        res.render('successful', {user: null});
    }

    getListOfApplicant(req, res) {
        const companyname = req.session.employer;
        const applicants = ApplicationModel.findCompanyApplication(companyname);
        res.render('listofapplicant', {applicants: applicants, user: req.session.employer});
    }

    createNewJobs(req, res) {
        res.render('createjob',{user: req.session.employer, companyname: req.session.employer.name});
    }

    postNewJobs(req, res) {
        const {companyname, role, salary} = req.body;
        JobModel.createNewJobs(companyname, role, salary);
        let companyjobs = JobModel.getJobs(companyname);
        console.log(`Inside ${companyjobs.result[0].companyname} ${companyjobs.result[0].role }`)
        res.render('afterlogin', {user: req.session.employer, jobs: companyjobs.result, afterlogin: true});
    }
}