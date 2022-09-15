import nc from 'next-connect';
import onError from '../../../common/errorMIddleWare';
import { createTopic } from '../../../controller/topics';

const handler = nc(onError);
handler.post(createTopic);

export default handler;
