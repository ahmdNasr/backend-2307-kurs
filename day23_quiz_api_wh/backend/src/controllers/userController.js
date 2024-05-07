import { UserService } from "../services/index.js";

async function postRegisterUserCtrl(req, res) {
  try {
    const userInfo = req.body;
    const result = await UserService.registerUser(userInfo);
    res.status(201).json({ result }); // 201 Status = "Created"
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not register user" });
  }
}

async function deleteUserCtrl(req, res) {
  try {
    const userId = req.params.userId;
    const result = await UserService.deleteUser(userId);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not delete user" });
  }
}

export const UserController = {
  postRegisterUserCtrl,
  deleteUserCtrl,
};
