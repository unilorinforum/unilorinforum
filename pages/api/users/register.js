import nc from 'next-connect';
import onError from '../../../common/errorMIddleWare';
import {createUser } from '../../../controller/users/users';

const handler = nc(onError);
handler.post(createUser);

export default handler;
