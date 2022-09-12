import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          {currentUser.picture==null?  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS884yE-aP3PQdStnZ7KZecX04EDdYa2YpRgQ&usqp=CAU" referrerpolicy="no-referrer" style={{width:100,height:100}}></img> : <img src={currentUser.picture} referrerpolicy="no-referrer"></img> }
          &ensp; &ensp;
          <strong>{currentUser.name}</strong> Profile
          
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
