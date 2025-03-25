import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "http://localhost:8000",
  issuerBaseURL: "https://dev-a0yd7dci5dy456df.us.auth0.com",
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
