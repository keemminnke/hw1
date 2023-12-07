const url = '/verifyToken';

const moveToHome = async () => {
  // 세션,로컬 스토리지에서 토큰을 읽어옴
  const sessionToken = sessionStorage.getItem('token');
  const localToken = localStorage.getItem('token');
  const token = sessionToken || localToken;
  // 토큰이 존재하는 경우에만 서버로 요청을 보냄
  if (token) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `${token}`,
        },
      });

      if (response.ok) {
        // 토큰이 유효한 경우
        const data = await response.json();
        alert(data.message);
      } else if (response.status === 401) {
        // 토큰이 유효하지 않은 경우
        window.location.href = '/login';
      } else {
        // 다른 상태 코드에 대한 처리
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('토큰 검증 중 오류 발생:', error);
    }
  } else {
    // 토큰이 없는 경우 로그인 페이지로 이동
    window.location.href = '/login';
  }
};

// 함수 호출
moveToHome();



