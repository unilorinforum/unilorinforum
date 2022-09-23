import nc from 'next-connect';
import onError from '../../../common/errorMIddleWare';
import { getUserById, deleteUserById } from '../../../controller/users';

const handler = nc(onError);
handler.get(getUserById);
handler.delete(deleteUserById);
export default handler;
