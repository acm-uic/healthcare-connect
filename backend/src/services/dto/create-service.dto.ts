import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class CreateServiceDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    readonly cost: number;

    @IsString()
    @IsNotEmpty()
    readonly location: string;

    @IsString()
    @IsNotEmpty()
    readonly eligibility: string;

    @IsNotEmpty()
    readonly languagesSupported: string[];

}