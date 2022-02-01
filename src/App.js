import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{ // useEffect бул жерде бир жолу эле колдонулуп  localStorage'тен маалымат алып жатат
 const storedUserLoggedInfo = localStorage.getItem('isLoggedIn');
 if(storedUserLoggedInfo==='1'){ //шарт тузулуп жатат
  setIsLoggedIn(true)
 }
  },[])//бул жердеги пустой массив  useEffect бир жолу эле колдонулуп жатканын билдирет



    localStorage.setItem('isLoggedIn','1')
  const loginHandler = (email, password) => { //Бул жер submit'ти басканда иштейт.Анан Form'га жазылган маалыматтар localStorage'ке келет.
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn','1')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false); 
    localStorage.removeItem('isLogedIn')//  Form'га жазылгандар localStorage тушот анан браузерди перезагрузка кылганда очурулот.Home компонента rerender болбойт.
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />} {/* Login Podyom  sostayaniye arkiluu chakirilip jatat. */}
        {isLoggedIn && <Home onLogout={logoutHandler} />} {/* bul jerde jogorudagi sostayaniyabiz (isLoggedIn) true bolup kalganda, Home chakirilat uwul jerden */}
      </main>
    </React.Fragment>
  );
}

export default App;
