const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
import { executeQuery } from '../../config/db';
import moment from 'moment';
import ErrorHandler from '../../common/errorHandler';

// get all user
const getAllUsers = async (req, res, next) => {
  try {
    let allUsers = await executeQuery('SELECT * FROM users');
    res.send(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get user by id
const getUserById = async (req, res, next) => {
  let id = req.query.id;
  console.log(id);
  try {
    const userData = await executeQuery(
      `SELECT * FROM USERS WHERE user_id=${id}`
    );
    if (userData > 0) res.status(200).json(userData);

    next(new ErrorHandler(`no user found with this id ${id} `, 404));
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete  user by id
const deleteUserById = async (req, res) => {
  let id = req.query.id;
  try {
    let result = await executeQuery(`DELETE FROM USERS WHERE user_id=${id}`);

    if (result) {
      res.send('User Deleted');
    } else {
      res.send('User user not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// create user

const createUser = async (req, res) => {
  const body = req.body;
  const date = moment().format();
  const salt = genSaltSync(10);

  body.password = hashSync(body.password, salt);

  try {
    let emailResult = await executeQuery(
      `SELECT * FROM USERS WHERE email = "${body.email}"`
    );
    if (emailResult.length >= 1) {
      res.send({
        result: 0,
        message: 'this email is already exist',
      });
    } else {
      let usernameResult = await executeQuery(
        `SELECT * FROM USERS WHERE username = "${body.username}"`
      );
      if (usernameResult.length >= 1) {
        res.send({
          result: 0,
          message: 'this username is alread taken',
        });
      } else {
        const createUserResult = await executeQuery(
          `insert into users(username, email, password, regdate)
            value(?,?,?,?)`,
          [body.username, body.email, body.password, date]
        );
        if (!createUserResult) {
          res.send('something went wrong');
        }
        res.status(200).json({
          result: 1,
          message: 'registration sucessfull, systerm will redirect you',
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'there was an error in the server',
      error: err,
    });
  }
};
//login users
const userLogin = async (req, res) => {
  const body = req.body;
  console.log(body);
  console.log(body.password);
  let results = await executeQuery(`SELECT * FROM users  where email = ?`, [
    body.email,
  ]);

  if (results.length === 0) {
    res.send('user');
    res.json({
      success: 0,
      message: 'email is not registered',
    });
  } else {
    const resultData = results[0];
    const result = compareSync(body.password, resultData.password);
    console.log();
    if (result) {
      results.password = undefined;

      const jsontoken = sign({ result: results }, 'qwe1234', {
        expiresIn: '1h',
      });
      return res.json({
        success: 1,
        message: 'logged in successfully',
        token: jsontoken,
      });
    } else {
      res.json({
        success: 0,
        message: 'password is not correct',
      });
    }
  }
};
// update user password
export { createUser, getAllUsers, getUserById, deleteUserById, userLogin };
