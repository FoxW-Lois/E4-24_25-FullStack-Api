import { TokenUser } from "../models";
import { DbUser } from "./models";

export async function blackListAccessToken(user:TokenUser,token:string){
    const dbUser = await DbUser.findOne({ email: user.email });
    dbUser!.expiredAccessTokens.push(token as string);
    await dbUser!.save();
}

export async function blackListRefreshToken(user:TokenUser,token:string){
    const dbUser = await DbUser.findOne({ email: user.email });
    dbUser!.expiredRefreshTokens.push(token as string);
    await dbUser!.save();
}