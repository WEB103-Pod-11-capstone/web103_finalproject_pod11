import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { client } from "../config/database.js";
import { isValidEmail } from "../utils/validators.js";

export const registerUser = async (req, res) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;

  try {
    //Backend validations

    //Non-Empty Fields Validations
    if (!first_name || !last_name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required to register." });
    }

    //User's Name Length Validation
    if (first_name.length > 20 || last_name.length > 20) {
      return res
        .status(400)
        .json({ message: "Must be less than 20 characters long. Try again." });
    }

    //Valid Email Expression Validation
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email." });
    }

    //Valid Password Length Validation
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long." });
    }

    //Password-Valid Password Check
    if (password !== confirm_password) {
      return res
        .status(400)
        .json({ message: "Passwords do not match. Try again." });
    }

    //Checking if user already exist
    const userExist = await client.query(
      "SELECT email FROM users WHERE email=$1",
      [email],
    );

    //Existing User Validation
    if (userExist.rows[0]) {
      return res
        .status(409)
        .json({ message: "User already exist. Please log in." });
    }

    //Hashing Password to Protect User's Account
    const hashedPassword = await bcrypt.hash(password, 10);

    //Saving User's Data in Database
    const newUser = await client.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
      [first_name, last_name, email, hashedPassword],
    );

    //Save User ID and Email in Token for Authentication
    const token = jwt.sign(
      { id: newUser.rows[0].id, email: newUser.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields must be entered to login." });
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Try again." });
    }

    const user = await client.query(
      "SELECT id, email, password FROM users WHERE email=$1",
      [email],
    );

    if (!user.rows[0]) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Try again" });
    }

    const hashedPassword = await bcrypt.compare(
      password,
      user.rows[0].password,
    );

    if (!hashedPassword) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Try again." });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({ token, message: "Login successfully" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal server error." });
  }
};
