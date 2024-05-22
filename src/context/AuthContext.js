// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = async (username, pin) => {
//     try {
//       // Assuming you have an authentication endpoint in your backend
//       const response = await fetch('http://localhost:5000/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, pin })
//       });

//       if (!response.ok) {
//         throw new Error('Invalid username or PIN');
//       }

//       const userData = await response.json();
//       setUser(userData);
//     } catch (error) {
//       console.error('Login error:', error.message);
//       throw new Error('Login failed');
//     }
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   const isAuthenticated = () => {
//     return !!user;
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for user data when component mounts
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // const login = async (userData) => {
  //   try {
  //     // Make API call to authenticate user
  //     const response = await fetch('http://localhost:5000/api/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(userData)
  //     });

  //     if (!response.ok) {
  //       throw new Error('Login failed');
  //     }

  //     const data = await response.json();

  //     // Save user data to local storage if received from API
  //     if (data && data.user) {
  //       localStorage.setItem('user', JSON.stringify(data.user));
  //       setUser(data.user);
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //   }
  // };
  const login = async (username, pin) => {
    try {
      // Assuming you have an authentication endpoint in your backend
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, pin })
      });

      if (!response.ok) {
        throw new Error('Invalid username or PIN');
      }

      const data = await response.json();

      // Save user data to local storage if received from API
      if (data && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
    } catch (error) {
      console.error('Login error:', error.message);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    // Remove user data from local storage and set user state to null
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = () => {
    // Check if user is authenticated based on user state
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
