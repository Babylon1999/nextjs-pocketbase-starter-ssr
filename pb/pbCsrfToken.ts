import "server-only";
import { getTheUserFromCookie, updateUserData } from "./pbFunctions";
import { unstable_noStore as noStore } from "next/cache";

const Tokens = require("csrf");
const tokens = new Tokens();

export async function solveToken(token: any) {
  noStore();
  const user = await getTheUserFromCookie();
  const checkToken = await tokens.verify(user.secret, token);
  const expired = Number(user.secretExpire) < Number(Date.now());
  if (checkToken === false || expired === true) {
    return false;
  }
  return true;
}

export async function generateSecret() {
  return require("crypto").randomBytes(64).toString("hex");
}

export async function updateSecret() {
  const newSecret = await generateSecret();
  const expire = Number(Date.now()) + 300000; // 5 minutes = 300,000 milliseconds
  await updateUserData({
    secret: newSecret,
    secretExpire: expire,
  });

  return newSecret;
}

export async function generateToken() {
  const newSecret = await updateSecret();
  const token = await tokens.create(newSecret);
  return token;
}
