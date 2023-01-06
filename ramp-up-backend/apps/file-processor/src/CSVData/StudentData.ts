import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('studentData')
@ObjectType()
export class StudentData {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column('varchar')
  name: string;

  @Field()
  @Column('varchar')
  gender: string;

  @Field()
  @Column('varchar')
  address: string;

  @Field()
  @Column('integer')
  mobileNo: number;

  @Field()
  @Column('date')
  DOB: Date;

  @Field()
  @Column('integer')
  age: number;

  @Field()
  @Column('boolean')
  isArchive: boolean;
}
