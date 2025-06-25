import * as React from 'react';
import { Layout } from '../../../components/auth/layout';
import SignInForm from '../../../components/auth/sign-in.form';

function SignInPage(): React.JSX.Element {
  return (
    <Layout>
      <SignInForm />
    </Layout>
  );
}

export default SignInPage;
