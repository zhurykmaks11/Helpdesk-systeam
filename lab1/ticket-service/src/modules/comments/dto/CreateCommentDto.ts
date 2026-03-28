import { IsString, IsNotEmpty } from "class-validator";

export class CreateCommentDto {

    @IsString()
    @IsNotEmpty()
    ticketId!: string;

    @IsString()
    @IsNotEmpty()
    message!: string;

}