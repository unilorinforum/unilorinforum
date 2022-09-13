
import nc from 'next-connect';
import onError from '../../../common/errorMIddleWare';
import { logout } from '../../../controller/users/users';

const handler = nc(onError);
handler.post(logout);

export default handler;
