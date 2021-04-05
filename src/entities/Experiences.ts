import { Field, ID, ObjectType } from 'type-graphql'
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Experience extends BaseEntity{
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column()
  company: string

  @Field(() => String)
  @Column()
  title: string

  @Field(() => String)
  @Column()
  location: string

  @Field(() => String)
  @Column()
  duration: string

}