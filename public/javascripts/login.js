const joinButton = document.getElementById("gotojoinButton");
joinButton.addEventListener("click", function () {
    window.location.href = "/join";
});
//로그인요청
async function loginAsk() {
    try {
        const userId = document.getElementById('userId').value;
        const userPassword = document.getElementById('userPassword').value;
        const rememberMeCheckbox = document.getElementById('rememberMe');
        
        const response = await fetch('/login/submitLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: userId,
                password: userPassword
            })
        });

         //응답 처리
        const data = await response.json();
        console.log(data);

        if (data.message === "아이디 또는 비밀번호가 틀렸습니다.") {
            alert(data.message);
        } else if (data.message === "로그인 성공") {  
            if (rememberMeCheckbox.checked) {
            // 자동 로그인 체크되어 있다면 로컬 스토리지에 저장
            localStorage.setItem('token', data.token);
        }   else {
            // 자동 로그인 체크되어 있지 않다면 세션 스토리지에 저장
            sessionStorage.setItem('token', data.token);
        }
            alert(data.message);
            setTimeout(function() {
                window.location.href = "/";
            }, 1000);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}



