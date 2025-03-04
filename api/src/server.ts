import app from './app';
import connectDB from './utils/connectDB';
import { log } from './utils/logger';

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  try {
    await connectDB();
  } catch (error) {
    log.error(`Couldn't connect to server: ${error}`);
  }
});
