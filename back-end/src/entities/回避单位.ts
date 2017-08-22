import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Information } from './Information'

@Entity()
export class 回避单位 {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  单位名称: string
  @Column()
  是否工作单位: string
  @ManyToOne(type => Information, information => information.回避单位)
  information: Information
}
