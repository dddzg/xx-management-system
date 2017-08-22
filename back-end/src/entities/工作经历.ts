import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Information } from './Information'

@Entity()
export class 工作经历 {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  起始时间: string
  @Column()
  终止时间: string
  @Column()
  工作单位: string
  @Column()
  职务: string
  @Column()
  证明人: string
  @ManyToOne(type => Information, information => information.工作经历)
  information: Information
}
