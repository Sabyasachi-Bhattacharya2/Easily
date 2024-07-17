import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import session from 'express-session';
import WelcomeController from './src/controllers/welcome.controller.js';
import EmployerController from './src/controllers/employer.controller.js';
import JobController from './src/controllers/job.controller.js';
import { auth } from './src/middlewares/auth.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';

const app = express();
app.use(express.static('public'));
app.use(session({
    secret: 'SecretKey',
    resave: false, 
    saveUninitialized: true,
    cookie: {secure: false}
}));
const welcomeController = new WelcomeController()
const employerController = new EmployerController();
const jobController = new JobController();
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), "src", "views"));

app.get('/', welcomeController.getHomePage);
app.get('/register', employerController.getRegistrationPage);
app.post('/register', employerController.postRegistration);
app.get('/login', employerController.getLoginPage);
app.post('/login', employerController.postLoginPage);
app.get('/newjobs', jobController.getJobs);
app.get('/applyjob?:companyname', jobController.applyJobs);
app.post('/applyjob', uploadFile.single('resume'), jobController.postApplyJobs);

app.get('/createjob', auth, jobController.createNewJobs);
app.post('/createjob', auth, jobController.postNewJobs);
app.get('/logout', employerController.getLogout);
app.get('/listofapplicant', auth, jobController.getListOfApplicant);


app.listen(3000, () => {
    console.log('Server is running on 3000');
});