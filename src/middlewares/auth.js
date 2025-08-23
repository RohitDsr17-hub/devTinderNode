const adminAuth = (req, res, next) => {
    const token = 'xyz';
    const isAuthorised = token === 'xyz';
    if (!isAuthorised) {
        res.status(401).send('request invalid');
    } else {
        next();
    }
};

module.exports = {
    adminAuth,
}