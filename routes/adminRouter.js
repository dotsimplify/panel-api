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

router
  .route("/create-new-account")
  .post(adminTokenAuth, authAdmin, adminCtrl.createAccount);

router
  .route("/all-users-list")
  .post(adminTokenAuth, authAdmin, adminCtrl.getAllUsers);

router
  .route("/delete-account/:id")
  .get(adminTokenAuth, authAdmin, adminCtrl.deleteAccount);

router.route("/getuser").get(adminTokenAuth, authAdmin, adminCtrl.getuser);

router
  .route("/refresh-token")
  .post(validate(adminValid.refreshTokenValidation), adminCtrl.refreshtoken);

router
  .route("/update-account/:username")
  .put(
    adminTokenAuth,
    authAdmin,
    validate(adminValid.updateAccountValidation),
    adminCtrl.updateAccount
  );

// router.route("/register").post(adminCtrl.register);

router
  .route("/login")
  .post(validate(adminValid.loginAdminValidation), adminCtrl.login);

router
  .route("/change-password/:id")
  .put(adminTokenAuth, authAdmin, adminCtrl.changePassword);

router
  .route("/get-account-detail/:username")
  .get(adminTokenAuth, authAdmin, adminCtrl.singleAccount);

module.exports = router;
