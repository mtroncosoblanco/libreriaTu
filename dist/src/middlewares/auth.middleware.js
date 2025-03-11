"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isAuthenticate", {
    enumerable: true,
    get: function() {
        return isAuthenticate;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass';
const isAuthenticate = (req, res, next)=>{
    const token = req.cookies.token;
    if (!token) return res.status(401).json({
        error: 'Access denied'
    });
    try {
        const tokenDecodificado = _jsonwebtoken.default.verify(token, TOKEN_PASSWORD);
        req.user = tokenDecodificado;
        next();
    } catch (error) {
        res.status(401).json({
            error: 'Invalid token'
        });
    }
};

//# sourceMappingURL=auth.middleware.js.map