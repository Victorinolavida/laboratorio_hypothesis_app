const jwt = require("jsonwebtoken");

interface Data {
  token: string;
  user: string;
}
export const generarJWT = (data: Data) => {
  const token = jwt.sign(
    {
      data: "foobar",
    },
    "%Je!C9OlGb&&ywnti&!LHUijorbddIkYiR6JcDYtlh9GQjgL@y",
    { expiresIn: "4h" }
  );

  return token;
};
