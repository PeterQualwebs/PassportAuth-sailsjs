/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require("passport");

module.exports = {
  // login function
  login: function (req, res) {
    passport.authenticate("local", function (err, user, info) {
      if (err || !user) {
        return res.send({ message: info.message, user });
      }

      req.login(user, function (err) {
        if (err) return res.send(err);
        sails.log("User " + user.id + " has logged in");
        res.redirect("/");
      });
    })(req, res);
  },

  // logout function

  logout: function (req, res) {
    req.logout();
    res.redirect("/");
  },

  // Register Function

  register: function (req, res) {
    // form validations here

    data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      description: req.body.description,
    };

    User.create(data)
      .fetch()
      .exec(function (err, user) {
        if (err) return res.negotiate(err);

        // confirm emails goes here if want to not right now

        req.login(user, function (err) {
          if (err) return res.negotiate(err);
          sails.log("User " + user.id + " has logged in");
          res.redirect("/");
        });
      });
  },
};
