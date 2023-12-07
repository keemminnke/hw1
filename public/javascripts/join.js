function enableRegistrationButton() {
  const registrationButton = document.getElementById('registrationButton');
  registrationButton.disabled = false;
}

function checkDuplicateID() {
  const newUserId = document.getElementById('newUserId').value;
  const regexs = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{1,}$/;
  const idCheck = document.getElementById('userIdWarning');

  if (!newUserId) {
    idCheck.innerText = "아이디를 입력해주세요.";
    return;
  }

  if (!regexs.test(newUserId)) {
    idCheck.innerText = "아이디는 한글이 불가능하며 두글자 이상만 가능합니다.";
    return;
  }

  // 중복확인 요청
  fetch('/join/check-duplicate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ID: newUserId })
  })
    .then(response => response.json())
    .then(data => {
      const userIdWarning = document.getElementById('userIdWarning');
      if (data.exists) {
        userIdWarning.innerText = "이미 사용 중인 아이디입니다.";
        // 중복일 경우에는 버튼 비활성화
        document.getElementById('registrationButton').disabled = true;
      } else {
        userIdWarning.innerText = "사용 가능한 아이디입니다";
        // 중복이 아닐 경우에만 버튼 활성화
        enableRegistrationButton();
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function pwCheck() {
  const password1 = $('#newPassword1').val();
  const password2 = $('#newPassword2').val();

  const regex = /^(?=.*[a-zA-Z])(?=.*\d).{4,}$/;

  if (password1 === password2 && regex.test(password1)) {
    $('#passwordMatch').text('비밀번호 일치').css('color', 'green');
  } else {
    $('#passwordMatch').text('비밀번호 불일치 또는 조건 미달').css('color', 'red');
  }
}
// newpassword입력시 바로 응답



async function submitRegistration() {
  const newUserId = document.getElementById('newUserId').value;
  const newPassword1 = document.getElementById('newPassword1').value;
  const newPassword2 = document.getElementById('newPassword2').value;
  const regex = /^(?=.*[a-zA-Z])(?=.*\d).{4,}$/;

  // 비밀번호 일치 여부 확인
  if (newPassword1 !== newPassword2 || !regex.test(newPassword1)) {
    document.getElementById('passwordMatch').innerText = "비밀번호가 일치하지 않거나 조건을 만족하지 않습니다.";
    return; 
  }


  try {
    // 회원가입 요청
    const response = await fetch('/join/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ID: newUserId,
        password: newPassword1
      })
    });

    // 응답 처리
    const data = await response.json();
    console.log(data);
    if (data.message === '회원가입이 완료되었습니다.') {
      alert(data.message);
      setTimeout(function() {
        window.location.href = "/login";
      }, 5000);
    } else {
      // 회원가입이 실패한 경우에 대한 처리 추가
      console.error('회원가입 실패:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}



  

  
  




