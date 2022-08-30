const adminModel = require("../models/adminModel");
const accountModel = require("../models/accountModel");
const bcrypt = require("bcryptjs");
const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwtHelpers");
const { getALLKeys, deleteOneKey } = require("../helpers/redisFunctions");

const adminController = {
  // to Register new admin
  register: async (req, res) => {
    try {
      const { name, email, username, password, profilePic, type } = req.body;
      const user = await adminModel.findOne({ username });
      if (user) return res.status(400).json({ message: "user already exists" });
      // Encryption by bcrypt js
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new adminModel({
        name,
        username: username.toLowerCase(),
        email,
        profilePic,
        type,
        password: hashedPassword,
      });
      await newUser.save();

      let account = new accountModel({
        username,
        balance: 0,
        usedMargin: 0,
        brokerName: "Equity Broker",
        profitOrLossMin: 0,
        profitOrLossMax: 0,
      });
      await account.save();
      return res.status(200).json({
        message: "Your account is successfully created , Please Login",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await adminModel.findOne({ email }).select("+password");
      if (!user) {
        return res.status(400).json({ message: "Unauthorised user access" });
      }
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return res.status(400).json({ message: "Unauthorised user access" });
      }
      let userID = user.id;
      const accessToken = await createAccessToken(userID);
      const refreshToken = await createRefreshToken(userID);
      return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      const user = await adminModel.findById(req.user.id);
      if (!user) {
        return res.status(400).json({ message: "Unauthorised user access" });
      }
      await deleteOneKey(user.id);
      return res.json({ message: "logged out" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  refreshtoken: async (req, res) => {
    try {
      const { rf_token } = req.body;
      if (!rf_token) {
        return res.status(400).json({ message: "Unauthorized User" });
      }
      let userID = await verifyRefreshToken(rf_token);
      const accessToken = await createAccessToken(userID);
      const newRefreshToken = await createRefreshToken(userID);
      return res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  changePassword: async (req, res) => {
    try {
      const newPassword = await bcrypt.hash(req.body.password, 10);
      let data = await adminModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          password: newPassword,
        },
        { new: true }
      );
      if (data) {
        return res
          .status(200)
          .json({ message: "Changed password successfully" });
      }
      return res.status(200).json({ message: "Something went wrong" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getuser: async (req, res) => {
    try {
      const user = await adminModel.findById(req.user.id);
      if (!user) {
        return res.status(400).json({ message: "Unauthorised user access" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  accountValueToday: async (req, res) => {
    try {
      let requestingUser = await adminModel.findById(req.user.id);

      if (!requestingUser) {
        return res.status(404).json({ message: "user not exist" });
      }

      let account = await accountModel.findOne({
        username: requestingUser.username,
      });

      if (!account) {
        return res.status(404).json({ message: "user not exist" });
      }

      const { balance, usedMargin, profitOrLossMin, profitOrLossMax } = account;

      function getRandomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      let profitLossToShow = getRandomNumberBetween(
        profitOrLossMin,
        profitOrLossMax
      );
      function getBalance() {
        let equity = balance - usedMargin + profitLossToShow;

        return equity;
      }
      let equity = getBalance();

      return res.status(200).json({
        balance,
        equity,
        margin: usedMargin,
        profitOrLoss: profitLossToShow,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getAllAccounts: async (req, res) => {
    try {
      let requestingUser = await adminModel.findById(req.user.id);

      if (!requestingUser) {
        return res.status(404).json({ message: "user not exist" });
      }

      if (requestingUser.type !== "M") {
        return res.status(403).json({ message: "forbidden" });
      }
      const allAccounts = await accountModel.find().sort({ createdAt: -1 });
      return res.status(200).json({ accounts: allAccounts });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      let requestingUser = await adminModel.findById(req.user.id);

      if (!requestingUser) {
        return res.status(404).json({ message: "user not exist" });
      }

      if (requestingUser.type !== "M") {
        return res.status(403).json({ message: "forbidden" });
      }
      const allUsers = await adminModel.find();

      if (!allUsers.length) {
        return res.status(200).json({ users: [] });
      }
      return res.status(200).json({ users: allUsers });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  createAccount: async (req, res) => {
    try {
      const { username } = req.body;
      let requestingUser = await adminModel.findById(req.user.id);

      if (!requestingUser) {
        return res.status(404).json({ message: "user not exist" });
      }

      if (requestingUser.type !== "M") {
        return res.status(403).json({ message: "forbidden" });
      }
      let account = new accountModel({
        username,
        balance: 0,
        usedMargin: 0,
        brokerName: "Equity Broker",
        profitOrLossMin: 0,
        profitOrLossMax: 0,
      });
      await account.save();
      return res.status(200).json({
        message: `New Account Added to ${username}`,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deleteAccount: async (req, res) => {
    try {
      let requestingUser = await adminModel.findById(req.user.id);

      if (!requestingUser) {
        return res.status(404).json({ message: "user not exist" });
      }

      if (requestingUser.type !== "M") {
        return res.status(403).json({ message: "forbidden" });
      }

      let foundAccount = await accountModel.findById(req.params.id);

      if (!foundAccount) {
        return res.status(404).json({ message: "Account doesn't exist" });
      }

      await accountModel.findByIdAndDelete(req.params.id);

      return res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateAccount: async (req, res) => {
    try {
      const {
        balance,
        usedMargin,
        profitOrLossMin,
        brokerName,
        profitOrLossMax,
      } = req.body;
      let requestingUser = await adminModel.findById(req.user.id);

      if (!requestingUser) {
        return res.status(404).json({ message: "user not exist" });
      }

      if (requestingUser.type !== "M") {
        return res.status(403).json({ message: "forbidden" });
      }
      await accountModel.findOneAndUpdate(
        {
          username: req.params.username,
        },
        { balance, usedMargin, brokerName, profitOrLossMin, profitOrLossMax }
      );

      return res.status(200).json({ message: "Account updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  singleAccount: async (req, res) => {
    try {
      let requestingUser = await adminModel.findById(req.user.id);

      if (!requestingUser) {
        return res.status(404).json({ message: "user not exist" });
      }

      if (requestingUser.type !== "M") {
        return res.status(403).json({ message: "forbidden" });
      }
      const singleAcc = await accountModel.findOne({
        username: req.params.username,
      });
      if (singleAcc == null) {
        return res
          .status(400)
          .json({ message: "can not find FAQ of Undefined" });
      }
      return res.status(200).json({ singleAccount: singleAcc });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = adminController;
