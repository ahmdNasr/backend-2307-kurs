import jwt from "jsonwebtoken";

export const checkAuth =
  ({onlyAdmins} = {onlyAdmins: false}) =>
    (req, res, next) => {
        try {
          const { token } = req.cookies;
          if (!token) throw new Error("not authorized");
    
          const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    
          if (onlyAdmins && !verifiedToken.isAdmin)
            throw new Error("Hier nur Admins.");
    
          req.authenticatedUser = {
            _id: verifiedToken.sub,
            isAdmin: verifiedToken.isAdmin,
          };
    
          next();
        } catch (error) {
          console.log(error);
          return res
            .status(401)
            .json({ error, message: error.message || "not authorized" });
        }
      };
    