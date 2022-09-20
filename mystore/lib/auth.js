/* /lib/auth.js */

// import jwtDecode from "jwt-decode";
// import Cookies from "js-cookie";
// import Strapi from "strapi-sdk-javascript/build/main";

// import Router from "next/router";

// const apiUrl = process.env.API_URL || "http://localhost:1338";
// const strapi = new Strapi(apiUrl);

// export const strapiRegister = (username, email, password) => {
//   if (!process.browser) {
//     return undefined;
//   }
//   strapi.register(username, email, password).then(res => {
//     setToken(res);
//   });
//   return Promise.resolve();
// };
// //use strapi to get a JWT and token object, save
// //to approriate cookei for future requests
// export const strapiLogin = (email, password) => {
//   debugger;
//   if (!process.browser) {
//     return;
//   }
//   // Get a token
//   strapi.login(email, password).then(res => {
//     debugger;
//     console.log(res);
//     setToken(res);
//   });
//   return Promise.resolve();
// };

// export const setToken = token => {
//   if (!process.browser) {
//     return;
//   }
//   console.log(token);
//   Cookies.set("username", token.user.username);
//   Cookies.set("jwt", token.jwt);

//   if (Cookies.get("username")) {
//     Router.push("/");
//   }
// };

// export const unsetToken = () => {
//   if (!process.browser) {
//     return;
//   }
//   Cookies.remove("jwt");
//   Cookies.remove("username");
//   Cookies.remove("cart");

//   // to support logging out from all windows
//   window.localStorage.setItem("logout", Date.now());
//   Router.push("/");
// };

// export const getUserFromServerCookie = req => {
//   if (!req.headers.cookie || "") {
//     return undefined;
//   }

//   let username = req.headers.cookie
//     .split(";")
//     .find(user => user.trim().startsWith("username="));
//   if (username) {
//     username = username.split("=")[1];
//   }

//   const jwtCookie = req.headers.cookie
//     .split(";")
//     .find(c => c.trim().startsWith("jwt="));
//   if (!jwtCookie) {
//     return undefined;
//   }
//   const jwt = jwtCookie.split("=")[1];
//   return jwtDecode(jwt), username;
// };

// export const getUserFromLocalCookie = () => {
//   return Cookies.get("username");
// };

// //these will be used if you expand to a provider such as Auth0
// const getQueryParams = () => {
//   const params = {};
//   window.location.href.replace(
//     /([^(?|#)=&]+)(=([^&]*))?/g,
//     ($0, $1, $2, $3) => {
//       params[$1] = $3;
//     }
//   );
//   return params;
// };
// export const extractInfoFromHash = () => {
//   if (!process.browser) {
//     return undefined;
//   }
//   const { id_token, state } = getQueryParams();
//   return { token: id_token, secret: state };
// };

/* /lib/auth.js */

import { useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1338";

//register a new user
export const registerUser = (username, email, password) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/api/auth/local/register`, { username, email, password })
      .then((res) => {
        //set token response from Strapi for server validation
        Cookie.set("token", res.data.jwt);

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
        Router.push("/");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const login = (identifier, password) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/api/auth/local`, { identifier, password })
      .then((res) => {
        console.log(res);
        //set token response from Strapi for server validation
        Cookie.set("token", res.data.jwt);

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const logout = () => {
  //remove token and user cookie
  Cookie.remove("token");
  delete window.__user;
  // sync logout between multiple windows
  window.localStorage.setItem("logout", Date.now());
  //redirect to the home page
  Router.push("/");
};

//Higher Order Component to wrap our pages and logout simultaneously logged in tabs
// THIS IS NOT USED in the tutorial, only provided if you wanted to implement
export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};