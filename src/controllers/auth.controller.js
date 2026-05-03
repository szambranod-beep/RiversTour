const authService = require("../services/auth.service");
const sessionService = require("../services/session.service");

const login = async (req, res, next) => {
try {
const { email, password } = req.body;

```
const result = await authService.login(email, password);

res.json(result);
```

} catch (error) {
next(error);
}
};

const logout = async (req, res, next) => {
try {
const token = req.headers["x-session-token"];

```
await sessionService.logout(token);

res.json({ message: "Logout exitoso" });
```

} catch (error) {
next(error);
}
};

module.exports = {
login,
logout
};
