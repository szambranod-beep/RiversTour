const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, "../../data");

// 📖 Leer archivo
const readFile = async (fileName) => {
try {
const file = await fs.readFile(
path.join(dataPath, fileName),
"utf-8"
);

```
return JSON.parse(file);
```

} catch (error) {
throw new Error("Error leyendo archivo: " + fileName);
}
};

// ✍️ Escribir archivo
const writeFile = async (fileName, data) => {
try {
await fs.writeFile(
path.join(dataPath, fileName),
JSON.stringify(data, null, 2)
);
} catch (error) {
throw new Error("Error escribiendo archivo: " + fileName);
}
};

module.exports = {
readFile,
writeFile
};
