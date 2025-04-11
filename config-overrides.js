const { override, useBabelRc } = require("customize-cra");

//nạp file .babelrc
// eslint-disable-next-line react-hooks/rules-of-hooks
module.exports = override(useBabelRc());
