export default () => ({
  jwtSecret: process.env.JWT_SECRET,
  port: parseInt(process.env.PORT, 10) || 3000,
  crachaAdminCredentials: {
    apiKey: process.env.CRACHA_ADMIN_API_KEY,
  },
});
