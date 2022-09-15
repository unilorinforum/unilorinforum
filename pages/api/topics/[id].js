import nc from 'next-connect';
import onError from '../../../common/errorMIddleWare';
import { getTopicById, deleteTopicById } from '../../../controller/topics';

const handler = nc(onError);
handler.get(getTopicById);
handler.delete(deleteTopicById);
export default handler;
