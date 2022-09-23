import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import '../styles/globals.css'
import AppContext from "../context/AppContext";
import App from "next/app";
import React from "react";
import Cookie from "js-cookie";
import { grtMenus } from "../lib/auth";

// function MyApp({ Component, pageProps }) {
//   return <><NavBar /><Component {...pageProps} /><Footer /></>
// }

// export default MyApp

class MyApp extends App {
  state = {
    user: null,
    menus: []
  };


  async componentDidMount() {
    debugger;
    // grab token value from cookie
    const token = Cookie.get("token");
    // fetch menu items
    await grtMenus().then((res) => {
      debugger;
      console.log(res);
      // set authed User in global context to update header/app state
      this.setState({ menus: res.data });
    })
      .catch((error) => {
        console.log(error);
      });
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
    const { Component, pageProps } = this.props;
    const { user } = this.state;

    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          menus: this.state.menus,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
        }}
      >
        <NavBar user={{
          user: this.state.user,
          menus: this.state.menus,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
        }}><Component user={{
          user: this.state.user,
          menus: this.state.menus,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
        }} /></NavBar>
        <Footer />
      </AppContext.Provider>
    );
  }
}

export default MyApp;

