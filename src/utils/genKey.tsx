import jwt from 'jsonwebtoken';
import fs from 'fs';

// Thay thế bằng thông tin thực tế của bạn
const teamId = process.env.NEXT_PUBLIC_APPLE_TEAM_ID; // Team ID từ Apple Developer Portal
const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID; // Client ID từ Apple Developer Portal
const keyId = process.env.NEXT_PUBLIC_APPLE_KEY_ID; // Key ID từ Apple Developer Portal
const privateKeyPath = process.env.NEXT_PUBLIC_APPLE_PRIVATE_KEY_PATH || ''; // Đường dẫn đến file .p8 chứa private key

// Đọc private key từ file .p8
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

// Tạo payload cho JWT
export const tokenApple = jwt.sign(
  {
    iss: teamId,
    iat: Math.floor(Date.now() / 1000), // Thời điểm hiện tại
    exp: Math.floor(Date.now() / 1000) + 15777000, // Hết hạn sau 6 tháng
    aud: 'https://appleid.apple.com',
    sub: clientId,
  },
  privateKey,
  {
    algorithm: 'ES256',
    keyid: keyId,
  },
);

// In ra client_secret
console.log('Client Secret:', tokenApple);
