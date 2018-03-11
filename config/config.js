var os = require('os');
var uploadDir = os.platform() !== 'darwin' ? 'Y:' : '/Users/msethi/Pictures';
module.exports = {
    uploadDir: uploadDir
};
