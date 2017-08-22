import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number

  /** 用户名 */
  @Column()
  username: string

  /** 密码 */
  @Column()
  password: string

  /** 身份 */
  @Column()
  identity: string
  
}
