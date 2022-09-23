import nc from 'next-connect';
import onError from '../../../../common/errorMIddleWare';
import { getTopicByCat } from '../../../../controller/topics';

const handler = nc(onError);
handler.get(getTopicByCat);
export default handler;
