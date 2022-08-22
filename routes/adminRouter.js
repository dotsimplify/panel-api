const router = require("express").Router();
const adminCtrl = require("../controllers/adminCtrl");
const validate = require("../middleware/validationMiddleware");
const adminValid = require("../validations/adminValidation");
const adminTokenAuth = require("../middleware/adminAuth/adminTokenAuth");
const authAdmin = require("../middleware/adminAuth/adminAuthentication");

router.route("/logout").get(adminCtrl.logout);

router
  .route("/register")
  .post(validate(adminValid.registerAdminValidation), adminCtrl.register);

router
  .route("/get-all-accounts")
  .get(adminTokenAuth, authAdmin, adminCtrl.getAllAccounts);

router
  .route("/live-account-value")
  .get(adminTokenAuth, authAdmin, adminCtrl.accountValueToday);

router.route("/getuser").get(adminTokenAuth, authAdmin, adminCtrl.getuser);

router.route("/refresh-token").get(adminCtrl.refreshtoken);

// router.route("/register").post(adminCtrl.register);

router
  .route("/login")
  .post(validate(adminValid.loginAdminValidation), adminCtrl.login);

router
  .route("/change-password/:id")
  .put(adminTokenAuth, authAdmin, adminCtrl.changePassword);

module.exports = router;
