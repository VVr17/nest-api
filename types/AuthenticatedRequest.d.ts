interface AuthenticatedUser {
  _id: string;
  email: string;
  name: string;
}

interface AuthenticatedRequest {
  user: AuthenticatedUser;
}
