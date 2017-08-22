import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { 评审经历 } from './评审经历'
import { 工作经历 } from './工作经历'
import { 回避单位 } from './回避单位'
import { 评审领域 } from './评审领域'
import { User } from './User'

@Entity()
export class Information {
  @PrimaryGeneratedColumn()
  id: number
  @OneToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: User
  @Column()
  专家证书编号: string
  @Column()
  状态: string
  @Column()
  证书有效时间: string
  @Column()
  专家姓名: string
  @Column()
  专家性别: string
  @Column()
  出生日期: string
  @Column()
  政治面貌: string
  @Column()
  证件类型: string
  @Column()
  颁发机构: string
  @Column()
  证件编号: string
  @Column()
  最高学历: string
  @Column()
  最高学位: string
  @Column()
  职称: string
  @Column()
  证书编号: string
  @Column()
  职务: string
  @Column()
  从业时长: string
  @Column()
  是否退休: string
  @Column()
  是否兼职: string
  @Column()
  邮政编码: string
  @Column()
  电子邮件: string
  @Column()
  移动电话: string
  @Column()
  家庭电话: string
  @Column()
  工作单位: string
  @Column()
  详细通信地址: string
  @Column()
  毕业院校及专业: string
  @Column()
  资格证书名及编号: string
  @OneToMany(type => 评审经历, instance => instance.information, {
    cascadeInsert: false,
    cascadeUpdate: false
  })
  评审经历: 评审经历[]
  @OneToMany(type => 工作经历, instance => instance.information, {
    cascadeInsert: false,
    cascadeUpdate: false
  })
  工作经历: 工作经历[]
  @Column()
  业务专长: string
  @Column()
  工作业绩: string
  @OneToMany(type => 回避单位, instance => instance.information, {
    cascadeInsert: false,
    cascadeUpdate: false
  })
  回避单位: 回避单位[]
  @OneToMany(type => 评审领域, instance => instance.information, {
    cascadeInsert: false,
    cascadeUpdate: false
  })
  评审领域: 评审领域[]
  @Column()
  其他说明: string
  @Column()
  驳回理由: string
  @Column()
  审核结果: string
}
