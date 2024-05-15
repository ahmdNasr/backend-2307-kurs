import { Navigate } from "react-router-dom";

const AuthRequired = ({ token, children }) => {
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthRequired;

/* <AuthRequired>
    // ... children
    // ... children
    // ... children
    </AuthRequired>; */
