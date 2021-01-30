const base = require("../controllers/baseController")
const validation = require("../controllers/validationController")

const routes = (app) => {
    app.get('/', base);

    app.post('/validation-rule', validation)
}

module.exports = routes;