import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @ApiProperty({
        example: "7565c14b-35f8-458d-ab05-5a6f48c3d7bd",
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: "T-shirt Caos",
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text',{
        unique: true,
    })
    title: string;

    @ApiProperty({
        example: 0,
        description: 'Product Price',
    })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({
        example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        description: 'Product Description',
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: "T_shirt_Caos",
        description: 'Product Slug',
        uniqueItems: true
    })
    @Column( 'text', {
        unique: true,
    })
    slug: string;

    @ApiProperty({
        example: 1,
        description: 'Product Stock',
    })
    @Column('int', {
        default:0
    })
    stock: number;

    @ApiProperty({
        example: ["S","M","L"],
        description: 'Product Sizes',
    })
    @Column('text', {
        array: true
    })
    sizes: string[]

    @ApiProperty({
        example: "unisex",
        description: 'Product Gender',
    })
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
