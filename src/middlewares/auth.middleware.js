const sessionService = require("../services/session.service");

module.exports = async (req, res, next) => {
try {
const token = req.headers["x-session-token"];

```
if (!token) {
  return res.status(401).json({
    message: "No autenticado"
  });
}

const session = await sessionService.getSession(token);

// 🔥 aquí inyectas el usuario en la request
req.user = {
  userId: session.userId,
  role: session.role
};

next();
```

} catch (error) {
next(error);
}
};
