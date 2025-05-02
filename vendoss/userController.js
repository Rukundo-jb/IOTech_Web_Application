const bcrypt = require('bcryptjs');
const userModel = require('../model/userModel');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    userModel.findUserByEmail(email, async (err, result) => {
        if (err){
            console.log("err",err.stack)
             return res.status(500).send('Internal server error');
             }

        if (result.length > 0) return res.status(400).send('User already exists');
        
        const hashedPassword = await bcrypt.hash(password, 10);
        userModel.createUser(username, email, hashedPassword, (err) => {
            if (err) return res.status(500).send('Error registering user');
            res.status(200).redirect('/login');
        });
    });
};
 
exports.login = async (req, res) => {
    const { email, password } = req.body;

    userModel.findUserByEmail(email, async (err, result) => {
        if (err) return res.status(500).send('Internal server error');
        if (result.length === 0) return res.status(401).send('Invalid email or password');

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            req.session.userId = user.id; // Save user ID in session
            res.redirect('/dashboard');
        } else {
            res.status(401).send('Invalid email or password');
        }
    });
};
