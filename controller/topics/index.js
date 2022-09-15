import { executeQuery } from '../../config/db';

//get All topics

const GetTopics = async (req, res) => {
  try {
    let allTopics = await executeQuery('SELECT * FROM topics');
    res.send(allTopics);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get topic by id
const getTopicById = async (req, res, next) => {
  let id = req.query.id;
  console.log(id);
  try {
    const topicData = await executeQuery(
      `SELECT * FROM topics WHERE topic_id=${id}`
    );
    // console.log('topic lenth', topicData.length);
    if (topicData.length > 0) {
      res.status(200).json(topicData);
    } else {
      next(new ErrorHandler(`no user found with this id ${id} `, 404));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete  topic by id
const deleteTopicById = async (req, res) => {
  let id = req.query.id;
  try {
    let result = await executeQuery(`DELETE FROM topics WHERE topic_id=${id}`);
    if (result) {
      res.send('User Deleted');
    } else {
      res.send('User user not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const createTopic = async (req, res) => {
 const  body = req.body
 console.log(body);
};


module.exports = {
  GetTopics,
  getTopicById,
  deleteTopicById,
  createTopic,
};
