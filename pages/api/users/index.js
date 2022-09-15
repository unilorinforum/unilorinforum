import nc from 'next-connect'
import onError from '../../../common/errorMIddleWare';
import { getAllUsers, createUser } from '../../../controller/users';



const handler = nc(onError);
handler.get(getAllUsers)
handler.post(createUser);

export default handler