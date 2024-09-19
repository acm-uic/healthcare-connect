import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class CreateServiceDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    readonly cost: number;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly location: string;

    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    readonly eligibility: string;

    @IsString()
    @IsNotEmpty()
    readonly languagesSupported: string[];

}