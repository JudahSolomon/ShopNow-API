const upload = require("./multer");
const fileUploadService = require("./service/fileUploadService");

exports.uploadFile = (req, res) => {
  upload.single("file")(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    try {
      // Assuming you've defined req.file.size in multerConfig.js
      const { filename, path, size } = req.file;
      await fileUploadService.saveFileToDB(filename, path, size);

      res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

module.exports = uploadFile;
