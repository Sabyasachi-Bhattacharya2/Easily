import EmployerModel from "../models/employer.model.js";
import JobModel from "../models/job.model.js";

class EmployerController {
    getRegistrationPage(req, res) {
        res.render('registration',{user: null});
    }

    postRegistration(req, res) {
        const {name, email, password} = req.body;
        EmployerModel.add(name, email, password);
        res.render('login', {user: null});
    }

    getLoginPage(req, res) {
        
        res.render('login', {user: null});
    }

    postLoginPage(req, res) {
        const {email, password} = req.body;
        const employer = EmployerModel.isValidUser(email, password);
        if(!employer) {
            return res.render('login', {user: employer.name});
        } 
        console.log(employer.name);
        req.session.employer = employer;
        let companyjobs = JobModel.getJobs(employer);
        res.render('afterlogin', {user: req.session.employer, jobs: companyjobs.result, afterlogin: companyjobs.afterlogin});
    }

    getLogout(req, res) {
        req.session.destroy((err) => {
            if(err) {
                console.log("Session not destroyed");
            }
            res.redirect('/login');
        })
    }

    
}

export default EmployerController;