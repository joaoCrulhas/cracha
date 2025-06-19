export default () => ({
  jwtSecret: process.env.JWT_SECRET,
  port: parseInt(process.env.PORT, 10) || 3000,
  crachaAdminCredentials: {
    username: process.env.CRACHA_ADMIN_USERNAME,
    password: process.env.CRACHA_ADMIN_PASSWORD,
    appId: process.env.CRACHA_ADMIN_APP_ID,
  },
});
