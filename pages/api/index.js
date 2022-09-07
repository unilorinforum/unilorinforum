// import {query} from '../../lib/db';
import moment from 'moment';


export default async function handler(req, res) {
    const date = moment().format(' MM-DD-YYYY');
    console.log(date);

    // try {
    //     // const querry = "SELECT * FROM users"
    //     const values =[]
    //     console.log('mmmm');
    //     const data = await query("SELECT * FROM users", values);
    //     // console.log(data);
    //     res.status(200).json({ results: data });

    // } catch (error) {
    //     res.status(500).json({error: error.message});
    // }

}