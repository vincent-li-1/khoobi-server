import postgres from 'postgres';
import 'dotenv/config';

const url = process.env.POSTGRES_URL;

const sql = postgres(url);

export default sql;
