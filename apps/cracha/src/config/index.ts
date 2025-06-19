export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  crachaAdminCredentials: {
    username: process.env.CRACHA_ADMIN_USERNAME,
    password: process.env.CRACHA_ADMIN_PASSWORD,
  },
});
