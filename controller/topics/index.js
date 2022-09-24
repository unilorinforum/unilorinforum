import { executeQuery } from '../../config/db';
import moment from 'moment';
import { slugify, stripHtml, replaceNbsps } from '../../functions';

//get All topics

const GetTopics = async (req, res) => {
  try {
    let allTopics = await executeQuery('SELECT * FROM topics');
    // res.send();
    res.status(200).json(allTopics);
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
      res.send('Topic Deleted');
    } else {
      res.send('Topic user not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const getTopicByCat = async (req, res) => {
  let cat = req.query.cat;
  console.log(cat);
  try {
    const topicData = await executeQuery(
      `SELECT * FROM topics WHERE category_slug="${cat}"`
    );
    // console.log('topic lenth', topicData.length);
    if (topicData.length > 0) {
      res.status(200).json(topicData);
    } else {
      res.send({
        success: 0,
        message: 'No Post found or invalid cat ',
      });
      // next(new ErrorHandler(`no user found with this id ${id} `, 404));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const createTopic = async (req, res) => {
  const body = req.body;
  const created_date = Date.now();
  let topicSlug = slugify(body.title);
  let categorySlug = slugify(body.articleCategory);
  const regex = /(<([^>]+)>)/gi;
  const title = body.title
    .replace(/<\/?p[^>]*>/g, '')
    .replace(regex, '')
    .replace(/^\xa0*([^\xa0])\xa0$/g, '')
    .replace(/\xA0/g, ' ')
    .replace(/&nbsp;/g, ' ');
  console.log(title);
  try {
    let topicData = await executeQuery(
      `SELECT * FROM TOPICS WHERE slug = "${topicSlug}"`
    );
    if (topicData.length >= 1) {
      res.send({
        success: 0,
        message:
          'this title has already been used, you need to make your title unique',
      });
    } else {
      const createTopicResult = await executeQuery(
        `insert into topics(title, content, user_id, created_date, category, cover_Image_url, slug, author, category_slug)
            value(?,?,?,?,?,?,?,?,?)`,
        [
          title,
          body.topicContent,
          body.user_id,
          created_date,
          body.articleCategory,
          body.coverImageUrl,
          topicSlug,
          body.author,
          categorySlug,
        ]
      );
      if (createTopicResult) {
        res.status(200).json({
          success: 1,
          message:
            'Topic has been Created Sucessfully, systerm will redirect you',
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({
      error: 'Server Error',
    });
  }
};

module.exports = {
  GetTopics,
  getTopicById,
  deleteTopicById,
  createTopic,
  getTopicByCat,
};
