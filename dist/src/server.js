"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _app = /*#__PURE__*/ _interop_require_default(require("./app.js"));
const _errormiddleware = require("./middlewares/error.middleware");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const PORT = process.env.PORT || 3000;
_app.default.use(_errormiddleware.ErrorMiddleware);
_app.default.listen(PORT, ()=>{
    console.log("servidor encendido en el puerto:" + PORT);
});

//# sourceMappingURL=server.js.map