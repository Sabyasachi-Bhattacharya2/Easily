

class WelcomeController {
    getHomePage(req, res) {
        console.log(req.body);
        res.render('welcome', {user: req.body.user});
    }

    
}

export default WelcomeController;