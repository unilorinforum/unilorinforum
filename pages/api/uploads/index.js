import nc from 'next-connect';
import onError from '../../../common/errorMIddleWare';
import multer from 'multer'
import path from 'path'
import { executeQuery } from '../../../config/db';


let storage = multer.diskStorage({})

const handler = nc(onError);
export default handler;
