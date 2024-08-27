import React, { Component, useEffect, useState } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Link } from 'react-router-dom';
import "./home.css"
import { withRouter } from '../common/with-router';
import Header from "./header.component";
import CategoryService from "../services/category.service";
import Category from "./Category"

const API_URL = "http://localhost:8080/api/";

function Home() {

  const [categories, setCategories] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  

  useEffect(() => {
    const rs = async() => {
      const response = await CategoryService.getAll();
      setCategories(response.data)
    }
    const getUser = async() => {
      const user = await AuthService.getCurrentUser();
      setCurrentUser(user)
    }    
    getUser()
    rs()
    
      
  }, [])

  const getCategories = categories => {
    let content = [];
    for (let i = 0; i < 4; i++) {
      const data = categories[i]
      content.push(<Category key={i} id={data.id} image={data.image} name={data.name}/>)
    }
    return content
  };

  return (
    
    <div style={{backgroundImage: "url(/background.png)" }} className="back">
      <Header/>
      <div className='categories-list'>
        {categories && (getCategories(categories))}
      </div>
      <div className="down-container">
        <p className="address">Калужская область, с. Ульяново</p>
        <Link to={currentUser ? `/bucket` : '/login'}>
          <div className="wrapper-bucket bucket">
            <img src="/корзина.jpeg"></img>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default withRouter(Home);

// export default class Home extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: ""
//     };
//   }

//   componentDidMount() {
//     UserService.getPublicContent().then(
//       response => {
//         this.setState({
//           content: response.data
//         });
//       },
//       error => {
//         this.setState({
//           content:
//             (error.response && error.response.data) ||
//             error.message ||
//             error.toString()
//         });
//       }
//     );
//   }

//   render() {
//     return (
//       <div style={{backgroundImage: "url(/background-transformed.png)" }} className="back">
//         {/* <header className="jumbotron">
//           <h3>{this.state.content}</h3>
//         </header> */}
//       </div>
//     );
//   }
// }
