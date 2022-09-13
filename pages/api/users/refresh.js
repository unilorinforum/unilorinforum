import nc from 'next-connect';
import onError from '../../../common/errorMIddleWare';
import { handleRefresh } from '../../../controller/users/refresh';

const handler = nc(onError);
handler.get(handleRefresh);

export default handler;
