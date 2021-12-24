export class CreateWalletUserTransactionDto {
    wallet_id: number;
    opening_balance: number;
    amount: number;
    closing_balance: number;
    type: string;
    detailable_type: string;
}
