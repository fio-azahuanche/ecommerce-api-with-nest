import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column('text',{
        unique: true,
    })
    title: string;

    @ApiProperty()
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty()
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty()
    @Column( 'text', {
        unique: true,
    })
    slug: string;

    @ApiProperty()
    @Column('int', {
        default:0
    })
    stock: number;

    @ApiProperty()
    @Column('text', {
        array: true
    })
    sizes: string[]

    @ApiProperty()
    @Column('text')
    gender: string;

    @BeforeInsert()
    checkslugInsert() {
        if ( !this.slug ) {
            this.slug = this.title
        }
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replace("'",'')
    }

    @BeforeUpdate()
    checkslugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replace("'",'')
    }
}
