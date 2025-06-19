export const mockedConfigService = {
  getOrThrow: (key: string) => {
    switch (key) {
      case 'crachaAdminCredentials.username':
        return 'admin';
      case 'crachaAdminCredentials.password':
        return 'password';
      case 'crachaAdminCredentials.appId':
        return 'appId';
    }
  },
};
