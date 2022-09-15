import nc from 'next-connect';
import onError from '../../../common/errorMIddleWare';
import {createUser } from '../../../controller/users';

const handler = nc(onError);
handler.post(createUser);

export default handler;
