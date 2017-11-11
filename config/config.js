var os = require('os');
var uploadDir = os.platform() !== 'darwin' ? 'Z:' : '/Users/mseth9/Movies';
module.exports = {
    uploadDir: uploadDir
};