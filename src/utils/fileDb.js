const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, "../../data");

const readFile = async (fileName) => {
try {
const fullPath = path.join(dataPath, fileName);


const file = await fs.readFile(fullPath, "utf-8"); // ✅ así se usa
return JSON.parse(file);


} catch (error) {
console.error(error);
throw new Error("Error leyendo archivo: " + fileName);
}
};

const writeFile = async (fileName, data) => {
try {
const fullPath = path.join(dataPath, fileName);


await fs.writeFile(
  fullPath,
  JSON.stringify(data, null, 2)
);


} catch (error) {
console.error(error);
throw new Error("Error escribiendo archivo: " + fileName);
}
};

module.exports = {
readFile,
writeFile
};
