function isRole(role, req, res, next) {
    if (req.session.user && req.session.user.role === role) {
        return next();
    } else {
        return res.status(403).json({ message: 'Unauthorized' });
    }
}

export default isRole;