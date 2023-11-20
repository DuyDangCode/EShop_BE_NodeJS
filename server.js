import app from './src/app.js';
import chalk from 'chalk';
import { DEV } from './src/configs/config.env.js';

const PORT = DEV.app.port || 8080;

const server = app.listen(PORT, () => {
  console.log(chalk.green(`E-Shop::: Server is running at port: ${PORT}`));
});
