import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Information } from './Information'

@Entity()
export class 评审经历 {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  时间: string
  @Column()
  任务名称: string
  @Column()
  任务描述: string
  @Column()
  任务类型: string
  @ManyToOne(type => Information, information => information.评审经历)
  information: Information
}
