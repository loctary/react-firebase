import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../../../consts/routes';

const SignUpLink = () => (
  <p>
    Don&apos;t have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpLink;
