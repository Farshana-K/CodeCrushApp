import dotenv from 'dotenv';
dotenv.config();
import { env } from '@/Infrastructure/Config/env';
import app from './app';
import { initializeCronScheduler } from './Factory/CronScheduler';


const PORT = env.PORT || 4000;

app.listen(PORT, () => {
    initializeCronScheduler();
});