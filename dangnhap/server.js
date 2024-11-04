const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Đọc file users.json
function readUsers() {
    if (!fs.existsSync('users.json')) {
        fs.writeFileSync('users.json', '[]'); // Tạo file nếu chưa tồn tại
    }
    const data = fs.readFileSync('users.json');
    return JSON.parse(data);
}

// Lưu thông tin người dùng vào file
function saveUsers(users) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

// Route đăng ký
app.post('/register', (req, res) => {
    const { email, username, password } = req.body;
    const users = readUsers();

    // Kiểm tra xem tên đăng nhập đã tồn tại chưa
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
    }

    // Thêm người dùng mới
    users.push({ email, username, password });
    saveUsers(users);
    res.json({ message: 'Đăng ký thành công' });
});

// Route đăng nhập
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    // Tìm người dùng
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.json({ message: 'Đăng nhập thành công' });
    } else {
        res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
