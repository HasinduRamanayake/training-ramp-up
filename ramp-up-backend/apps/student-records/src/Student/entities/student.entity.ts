import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Student {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  gender: string;

  @Field()
  @Column()
  address: string;

  @Field(()=>Int)
  @Column()
  mobileNo: number;

  @Field(()=>Date)
  @Column()
  DOB: Date;

  @Field(()=>Int)
  @Column()
  age: number;

  @Field()
  @Column()
  isArchive: boolean;
}
