const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
import { executeQuery } from '../../config/db';
import moment from 'moment';
import ErrorHandler from '../../common/errorHandler';
import { serialize } from 'cookie';


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
  if (body.password === body.passwordConfirm) {
    console.log(body.passwordConfirm);
    res.send({
      success: 0,
      message: 'password does not march',
    });
  } else {
    body.password = hashSync(body.password, salt);
    console.log(body.password);
  }

  try {
    let emailResult = await executeQuery(
      `SELECT * FROM USERS WHERE email = "${body.email}"`
    );
    if (emailResult.length >= 1) {
      res.send({
        success: 0,
        message: 'this email is already exist',
      });
    } else {
      let usernameResult = await executeQuery(
        `SELECT * FROM USERS WHERE username = "${body.username}"`
      );
      if (usernameResult.length >= 1) {
        res.send({
          success: 0,
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
          success: 1,
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
  let results = await executeQuery(`SELECT * FROM users  where email = ?`, [
    body.email,
  ]);

  if (results.length === 0) {
    res.json({
      success: 0,
      message: 'email is not registered',
    });
  } else {
    const resultData = results[0];
    const result = compareSync(body.password, resultData.password);
    if (result) {
      resultData.password = undefined;
      const jsontoken = sign({ userData: resultData }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      const jsonRefreshtoken = sign(
        { userData: resultData },
        process.env.JWT_SECRET,
        {
          expiresIn: '2160h',
        }
      );
      console.log(resultData.email)
      const saveRefreshToken = await executeQuery( `UPDATE users SET refresh_token ='${jsonRefreshtoken}' WHERE email = '${resultData.email}'`)
      if(!saveRefreshToken){
        res.send('refreshToken was not saved in the database')

      }
      const serialized = serialize('forumappjwt', jsontoken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 90, //90 days
        path: '/',
        sameSite: 'strict',
      });

      res.setHeader('set-cookie', serialized);
      return res.json({
        success: 1,
        message: 'logged in successfully',
        token: jsontoken,
        refreshToken:jsonRefreshtoken,
      });

    } else {
      res.json({
        success: 0,
        message: 'password is not correct',
      });
    }
  }
};

//logout user
const logout = (req, res) => {
  const { cookies } = req;
  jwt = cookies;
  const serialized = serialize('forumappjwt', null, {
    httpOnly: true,
    maxAge: -1, //90 days
    path: '/',
    sameSite: 'strict',
  });
  console.log(jwt);
  res.setHeader('set-cookie', serialized);
  res.json({
    success: 1,
    message: 'logged out sucessfully',
  });
};
// update user password
export {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  userLogin,
  logout,
};
