
export const auth = (req, res, next) => {
    if(req.session.employer) {
        next();
    } else {
        res.redirect('/login');
    }
}