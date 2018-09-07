var Library = artifacts.require("./Library.sol");

module.exports = function(deployer) {
  deployer.deploy(Library);
};
