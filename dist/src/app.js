"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _authroutes = /*#__PURE__*/ _interop_require_default(require("./routes/auth.routes"));
const _userroutes = /*#__PURE__*/ _interop_require_default(require("./routes/user.routes"));
const _offerroutes = /*#__PURE__*/ _interop_require_default(require("./routes/offer.routes"));
const _categoryroutes = /*#__PURE__*/ _interop_require_default(require("./routes/category.routes"));
const _expressratelimit = /*#__PURE__*/ _interop_require_default(require("express-rate-limit"));
const _helmet = /*#__PURE__*/ _interop_require_default(require("helmet"));
const _compression = /*#__PURE__*/ _interop_require_default(require("compression"));
const _cookieparser = /*#__PURE__*/ _interop_require_default(require("cookie-parser"));
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _morgan = /*#__PURE__*/ _interop_require_default(require("morgan"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
app.use((0, _cookieparser.default)());
app.use((0, _cors.default)({
    origin: [
        'http://localhost:5173',
        'https://empleatetufront.onrender.com'
    ],
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    credentials: true,
    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ]
}));
app.use(_express.default.json());
app.use((0, _helmet.default)());
app.use((0, _compression.default)());
app.use((0, _morgan.default)('tiny'));
const limiter = (0, _expressratelimit.default)({
    max: 1000,
    windowMs: 1000 * 15 * 60
});
app.use(limiter);
app.use('/api/auth', _authroutes.default);
app.use('/api/users', _userroutes.default);
app.use('/api/offers', _offerroutes.default);
app.use('/api/categories', _categoryroutes.default);
app.get('/', (req, res)=>{
    res.send('Bienvenido al backend (api rest)');
});
const _default = app;

//# sourceMappingURL=app.js.map