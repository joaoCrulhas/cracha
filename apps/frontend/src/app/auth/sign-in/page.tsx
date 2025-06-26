import * as React from 'react';
import { Layout } from '../../../components/auth/layout';
import SignInForm from '../../../components/auth/sign-in.form';
import GuestGuard from '../../../components/auth/guards/guest.guard';

function SignInPage(): React.JSX.Element {
  return (
    <Layout>
      <GuestGuard>
        <SignInForm />
      </GuestGuard>
    </Layout>
  );
}

export default SignInPage;
