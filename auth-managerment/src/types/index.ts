// Định nghĩa các kiểu dữ liệu dùng chung

export interface User {
    id: number;
    username: string;
    email: string;
    role: "ADMIN" | "USER";
    fullName?: string;
    phone?: string;
}

export interface Court {
    id: number;
    name: string;
    location: string;
    status: "AVAILABLE" | "BOOKED";
}

export interface Booking {
    id: number;
    userId: number;
    courtId: number;
    bookingTime: string;
    status: "PENDING" | "CONFIRMED" | "CANCELLED";
}
