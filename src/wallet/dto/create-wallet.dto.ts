import { IsOptional } from "class-validator"

export class CreateWalletDto {
    user_id: number

    @IsOptional()
    balance? :number
}
