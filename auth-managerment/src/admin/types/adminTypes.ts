export interface AdminUser {
    id: number;
    username: string;
    email: string;
    role: "USER" | "ADMIN";
    fullName?: string;
    phone?: string;
}

export interface Court {
    id: number;
    name: string;
    location: string;
    pricePerHour: number;
}
