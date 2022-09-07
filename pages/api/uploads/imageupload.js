import nc from 'next-connect';
import onError from '../../../common/errorMIddleWare';
import multer from 'multer';
import path from 'path';
import moment from 'moment';
import { executeQuery } from '../../../config/db';
const handler = nc();

export const config = {
  api: {
    bodyParser: false,
  },
};

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        '_' +
        moment().format('YYYY-MM-DDTHH:mm:ss.SSS') +
        path.extname(file.originalname)
    );
  },
});
const fileFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    return callback(new Error('Only images are allowed'));
  }else{
      callback(null, true);
  }
  console.log(file);
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
});
// console.log(upload);
let uploadFile = upload.single('file');
handler.use(uploadFile);
handler.post((req, res) => {
  console.log('req', req);
  console.log(req.body);
  res.status(200).send('uploaded sucessfuly');
});

export default handler;
