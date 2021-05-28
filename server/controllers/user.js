const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password, profile_pic } = req.body;
    const result = await db.user.find_user_by_username([username]);
    const existingUser = result[0];
    if (existingUser) {
      return res.status(409).json("Username already exists");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const registeredUser = await db.user.create_user([
      username,
      hash,
      `https://robohash.org/${username}.png`,
    ]);
    const user = registeredUser[0];
    req.session.user = {
      username: user.username,
      id: user.id,
      profile_pic: user.profile_pic,
    };
    return res.status(200).send(req.session.user);
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    const [user] = await db.user.find_user_by_username([username]);
    if (!user) {
      return res.status(404).json("User not Found");
    }
    const isAuth = bcrypt.compareSync(password, user.password);
    if (!isAuth) {
      return res.status(401).json("Password is incorrect");
    }
    req.session.user = user;
    return res.status(202).send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
  },
  getUser: (req, res) => {
    if (!req.session.user) {
      return res.status(404).send(req.session.user);
    }
    res.status(200).send(req.session.user);
  },
};
