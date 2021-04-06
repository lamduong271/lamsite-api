import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Education extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column()
  schoolName: string

  @Field(() => String)
  @Column()
  degree: string

  @Field(() => String)
  @Column()
  major: string

  @Field(() => String)
  @Column()
  location: string

  @Field(() => String)
  @Column()
  startDate: string

  @Field(() => String)
  @Column()
  endDate: string
}