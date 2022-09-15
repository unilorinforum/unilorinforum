import nc from 'next-connect';
import onError from '../../../common/errorMIddleWare';
import { GetTopics } from '../../../controller/topics';

const handler = nc(onError);
handler.get(GetTopics);
export default handler;