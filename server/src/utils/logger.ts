export const logger = (msg: any) => {
  console.log(msg);
};

logger.created = (msg: any) => {
  console.log('\x1b[43m\x1b[37m', 'Created!', '\x1b[0m');
  console.log(msg);
};

logger.got = (msg: any) => {
  console.log('\x1b[43m\x1b[37m', 'Got!', '\x1b[0m');
  console.log(msg);
};

logger.changed = (msg: any) => {
  console.log('\x1b[43m\x1b[37m', 'Changed!', '\x1b[0m');
  console.log(msg);
};

logger.deleted = (msg: any) => {
  console.log('\x1b[43m\x1b[37m', 'Deleted!', '\x1b[0m');
  console.log(msg);
};
