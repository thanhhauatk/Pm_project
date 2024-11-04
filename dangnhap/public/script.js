console.log("Script loaded");

document.getElementById('register-button')?.addEventListener('click', register);
document.getElementById('login-button')?.addEventListener('click', login);

function register() {
    console.log("Đã nhấn nút đăng ký");
    const email = document.getElementById('register-email').value;
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Kiểm tra định dạng email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
        alert('Email phải có định dạng @gmail.com');
        return;
    }

    if (username && password && confirmPassword) {
        if (password === confirmPassword) {
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }),
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.message === 'Đăng ký thành công') {
                    window.location.href = 'index.html'; // Chuyển hướng đến trang đăng nhập
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            alert('Mật khẩu không khớp!');
        }
    } else {
        alert('Vui lòng nhập đầy đủ thông tin.');
    }
}


function login() {
    console.log("Đã nhấn nút đăng nhập");
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username && password) {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.message === 'Đăng nhập thành công') {
                window.location.href = 'home.html'; // Chuyển hướng đến trang chủ
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Vui lòng nhập tên đăng nhập và mật khẩu.');
    }
}
const goalList = document.getElementById('goal-list');
const goalInput = document.getElementById('goal-input');
const addGoalButton = document.getElementById('add-goal-button');

let goals = [];

// Hàm để cập nhật giao diện danh sách mục tiêu
function updateGoalList() {
    goalList.innerHTML = '';
    goals.forEach((goal, index) => {
        const li = document.createElement('li');
        li.textContent = goal;
        li.appendChild(createEditButton(index));
        li.appendChild(createDeleteButton(index));
        goalList.appendChild(li);
    });
}

// Hàm tạo nút sửa mục tiêu
function createEditButton(index) {
    const button = document.createElement('button');
    button.textContent = 'Sửa';
    button.onclick = () => editGoal(index);
    return button;
}

// Hàm tạo nút xóa mục tiêu
function createDeleteButton(index) {
    const button = document.createElement('button');
    button.textContent = 'Xóa';
    button.onclick = () => deleteGoal(index);
    return button;
}

// Hàm thêm mục tiêu
addGoalButton.onclick = () => {
    const goalText = goalInput.value.trim();
    if (goalText) {
        goals.push(goalText);
        goalInput.value = '';
        updateGoalList();
    } else {
        alert('Vui lòng nhập mục tiêu.');
    }
};

// Hàm sửa mục tiêu
function editGoal(index) {
    const newGoal = prompt('Nhập mục tiêu mới:', goals[index]);
    if (newGoal) {
        goals[index] = newGoal;
        updateGoalList();
    }
}

// Hàm xóa mục tiêu
function deleteGoal(index) {
    if (confirm('Bạn có chắc chắn muốn xóa mục tiêu này?')) {
        goals.splice(index, 1);
        updateGoalList();
    }
}



