export interface IPayment {
    id: number;
    amount: string;
    currency: string;
    payment_type: string;
    status_id: number;
    image?: string;
    description?: string;
    created_at: string;
    updated_at: string;
}