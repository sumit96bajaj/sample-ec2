const express = require("express");
const os = require("os");

const app = express();
app.get("/", (req, res) => {
  const networkInterfaces = os.networkInterfaces();
  let serverIp = "";
  Object.keys(networkInterfaces).forEach((interfaceName) => {
    const interfaceInfo = networkInterfaces[interfaceName];
    // Iterate over each address of the current interface
    interfaceInfo.forEach((address) => {
      // Check for IPv4 addresses and skip internal (e.g., 127.0.0.1) and non-IPv4 addresses
      if (address.family === "IPv4" && !address.internal) {
        serverIp = address.address;
        console.log("Server IP:", address.address);
      }
    });
  });
  res.status(200).json({
    message: "Hii from server",
    ip: serverIp,
  });
});
app.get("/timestamp", (req, res) => {
  // Create a new Date object
  const currentDate = new Date();

  // Get the current date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
  const day = currentDate.getDate();

  // Format the date as a string
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  console.log("Current Date:", formattedDate);

  res.status(200).json({
    message: "Hii from server",
    "date": formattedDate,
  });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
