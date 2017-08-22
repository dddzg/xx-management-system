import { IsString } from 'class-validator'
// import { IsNumber } from '../validations/IsNumber'

export class ILoginForm {
  @IsString() username: string
  @IsString() password: string
  @IsString() identity: string
}

// 修改密码的接口
export class IChange {
  @IsString() accessToken: string
  @IsString() oldPassword: string
  @IsString() newPassword: string
}
