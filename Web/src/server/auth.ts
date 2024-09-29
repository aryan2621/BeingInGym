import ky from 'ky';
const URL = 'http://localhost:5433';
const SEND_OTP_REQUEST = {
    EMAIL: 'Email',
    PHONE: 'Phone',
    ID: 'Id',
};

const VERIFY_OTP_REQUEST = {
    OTP: 'OTP',
    ID: 'Id',
};

export const sendOtp = async (email: string, phone: string, id: string) => {
    const response = await ky.post(`${URL}/send-otp`, {
        json: {
            [SEND_OTP_REQUEST.EMAIL]: email,
            [SEND_OTP_REQUEST.PHONE]: phone,
            [SEND_OTP_REQUEST.ID]: id,
        },
    });
    return response.json();
};

export const verifyOtp = async (otp: string, id: string) => {
    const response = await ky.post(`${URL}/verify-otp`, {
        json: {
            [VERIFY_OTP_REQUEST.OTP]: otp,
            [VERIFY_OTP_REQUEST.ID]: id,
        },
    });
    return response.json();
};
