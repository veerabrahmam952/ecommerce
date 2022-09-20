import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import '../styles/globals.css'
import AppContext from "../context/AppContext";
import App from "next/app";
import React from "react";
import Cookie from "js-cookie";

// function MyApp({ Component, pageProps }) {
//   return <><NavBar /><Component {...pageProps} /><Footer /></>
// }

// export default MyApp

class MyApp extends App {
  state = {
    user: null,
  };
  

  componentDidMount() {
    debugger;
    // grab token value from cookie
    const token = Cookie.get("token");

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user);
      });
    }
  }

  setUser = (user) => {
    this.setState({ user });
  };

  render() {
    const { Component, pageProps, user } = this.props;

    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
        }}
      >
        <NavBar user={{
          user: this.state.user,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
        }} />
        <Component {...pageProps} />
        <Footer />
      </AppContext.Provider>
    );
  }
}

export default MyApp;

