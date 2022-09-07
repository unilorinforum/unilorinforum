const mysql = require('mysql');
const { resolve } = require('styled-jsx/css');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password:process.env.PASSWORD,
  database: process.env.DATABASE,
});

pool.getConnection((error) => {
  if (error) {
    console.log('error in connecting to db...');
  } else {
    console.log('connected to db...');
  }
});

const executeQuery = (query, arraParms) =>{
  return new Promise((resolve, reject) =>{
    try {
      pool.query(query, arraParms, (err, data)=>{
        if(err){
          console.log('error in database querry')
          reject(err)
        }
        resolve(data)
      });
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = { executeQuery };
