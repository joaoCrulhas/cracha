module.exports = async () => {
  console.log('globalModule');
  process.env.DATABASE_URL =
    'postgresql://root:password@localhost:5435/cracha-test';
};
