"use client";

import Image from 'next/image';

export default function Home() {

  const handleGoogleLogin = async () => {
    try {
      //const response = await axios.post('backend-endpoint');
      console.log('✅ 로그인 성공');
    } catch (error) {
      console.error('❌ 로그인 실패:', error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#BDE3F2' }}>
      <div className="flex flex-col items-center gap-1 mb-6">
        <p className="text-base font-bold text-gray-500 mb-4">쓰면서 담는 새로운 저축</p>
        <h1 className="text-4xl font-bold">쓰담</h1>
        <h3 className="text-2xl font-bold">SSEUDAAM</h3>
      </div>
      
      <div className="flex flex-col items-center gap-4">
      {/* 비율로 height auto 주고 싶음 */}
        <Image src="/icons/logo.png" alt="로고" width={150} height={80}/>
        <button onClick={handleGoogleLogin} className="transition-all duration-200 hover:brightness-105 hover:shadow-md rounded">
          <Image src="/icons/googleLogin.png" alt="구글 로그인 버튼" width={250} height={40}/>
        </button>
        
      </div>
    </main>
  );
}
