import app from './src/app.js';
import chalk from 'chalk';

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(chalk.green(`E-Shop::: Server is running at port: ${PORT}`));
});
