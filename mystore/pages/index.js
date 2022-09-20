import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import LandingPage from '../components/LandingPage'
import NavBar from '../components/NavBar'
import styles from '../styles/Home.module.css'
import defaultPage from "../hocs/defaultPage";

class Home extends React.Component {
  constructor(props) {
    super(props);
    //query state will be passed to RestaurantList for the filter query
    this.state = {
      query: ""
    };
  }
  onChange(e) {
    //set the state = to the input typed in the search Input Component
    //this.state.query gets passed into RestaurantList to filter the results
    this.setState({ query: e.target.value.toLowerCase() });
  }
  render() {
    return (
      <div>
        <LandingPage />
      </div>
    );
  }
}

export default Home;
// export default defaultPage(Home);
