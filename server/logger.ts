/* eslint-disable no-console */

import chalk from 'chalk';
import * as ip from 'ip';

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
export class Logger {

  // Called whenever there's an error on the server we want to print
  public static error(err) {
    console.error(chalk.red(err));
  }

  // Called when express.js app starts on given port w/o errors
  public static appStarted(port: number, tunnelStarted?: string) {
    console.log(`Server started ${chalk.green('✓')}`);

    // If the tunnel started, log that and the URL it's available at
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`);
    }

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://localhost:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
      (tunnelStarted ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}` : '')}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  }
}

export default Logger;
