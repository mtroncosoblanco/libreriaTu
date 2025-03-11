"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isAdmin", {
    enumerable: true,
    get: function() {
        return isAdmin;
    }
});
const isAdmin = (req, res, next)=>{
    const role = req.user?.role;
    try {
        if (role === 'admin') {
            next();
        } else {
            res.status(401).json({
                error: 'Access denied, no admin'
            });
        }
    } catch (error) {
        res.status(401).json({
            error: 'Invalid token'
        });
    }
};

//# sourceMappingURL=isAdmin.middleware.js.map