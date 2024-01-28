import React, { useState, useEffect } from 'react';
import { Link, HashRouter as Router, useHistory } from 'react-router-dom';
import { useCommerceStore } from '../store';
import { homeURL } from '../shared/constants';

interface HeaderProps {

  onLogout: () => Promise<void>;
}

const Header : React.FC<HeaderProps> =({onLogout})=>{


  const history = useHistory();
  const [userName, setUserName] = useState('user');
  const { name } = useCommerceStore();
  const { token } = useCommerceStore();
  // Use useEffect to update userName when name changes
  useEffect(() => {
    if (name) {
      setUserName(name);
    }
  }, [name]);
  if (name) {
    console.log(name)
  }


    const handleLogout = async () => {
      try {
        await onLogout(); // Call the provided logout function
        // Optionally, you can navigate to another page or perform other actions after logout
      } catch (error:any) {
        console.error('Error during logout:', error.message);
      }
    };
  


  

  return (
    <div className="header flex justify-between items-center px-6 py-4">
      <img width={80} src="/logo.png" alt="Ecommerce store logo" />
      <div className="nav flex gap-4 items-center min-h-10">
        <Router>
          <Link to={'/MyProduct'}>
            MY STORE
          </Link>
        </Router>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#contact">Contact Us</a>
        <div className="flex items-center gap-4">
          {userName && <p>{userName}</p>}
          <div className="rounded-full bg-red-100 p-2">
            <Router>
              <Link to={'/Login'}>
                <img width={20} src="/profile.png" alt="User Menu" />
              </Link>
            </Router>
          </div>
          <button onClick={handleLogout}>LOGOUT</button>

        </div>
      </div>
    </div>
  );
}

export default Header;
