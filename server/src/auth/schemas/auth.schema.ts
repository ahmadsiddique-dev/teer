import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User> & {
    generateAccessToken(password: string): Promise<string>;
    generateRefreshToken(password: string): Promise<string>;
    isPasswordCorrect(password: string): Promise<boolean>;
};

@Schema()
export class User {
    @Prop()
    paraphrase?: string;

    @Prop()
    username!: string;

    @Prop()
    password!: string;

    @Prop({ type: String, default: null })
    refreshToken?: string | null;

    @Prop({ type: String, default: null })
    profileImage?: string | null;
}

export const userSchema = SchemaFactory.createForClass(User);

// NO NEED OF THESE METHODS I JUST SIMPLY MAKE THEM INSIDE OF SERVICES

// userSchema.methods.generateAccessToken = async function (password:string) {
//   JwtModule.register({
//     secret: process.env.ACCESS_TOKEN_SECRET,
//     signOptions: {
//       expiresIn: '1h'
//     }
//   })
// }

// userSchema.methods.generateRefreshToken = async function  (password:string) {
//   JwtModule.register({
//     secret: process.env.REFRESH_TOKEN_SECRET,
//     signOptions: {
//       expiresIn: '7d'
//     }
//   })
// }
