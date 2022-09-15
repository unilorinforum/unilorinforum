import nc from 'next-connect';
import onError from '../../../common/errorMIddleWare';
import { userLogin } from '../../../controller/users';

const handler = nc(onError);
handler.post(userLogin );

export default handler;
