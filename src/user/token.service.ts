import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument, TokenSchema } from './token.schema';

  //delete this
// export type User2 = any;

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}
  async findOne(findParameters: any): Promise<Token | undefined> {
    return this.tokenModel.findOne(findParameters)
  }
  
  async createToken({userEmail, tokenString}): Promise<Token> {
    const token = await this.tokenModel.create({token: tokenString, userEmail: userEmail, createdAt: Date.now()})
    return token.save()
  }

  async deleteToken(token: string){
    return await this.tokenModel.deleteOne({token: token})
  }

}