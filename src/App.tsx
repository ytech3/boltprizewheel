import React, { useState } from 'react';
import { UserInfoForm } from './components/UserInfoForm';
import { SpinWheel } from './components/SpinWheel';
import { UserInfo } from './types';

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleFormSubmit = (info: UserInfo) => {
    setUserInfo(info);
  };

  const handleReset = () => {
    setUserInfo(null);
  };

  return (
    <>
      {!userInfo ? (
        <UserInfoForm onSubmit={handleFormSubmit} />
      ) : (
        <SpinWheel userInfo={userInfo} onReset={handleReset} />
      )}
    </>
  );
}

export default App;