import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Information } from './Information'

@Entity()
export class 评审领域 {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  领域名称: string
  @ManyToOne(type => Information, information => information.评审领域)
  information: Information
}
