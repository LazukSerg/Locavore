import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";
import "./register.css"

const required = value => {
  if (!value || value.trim().length === 0) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const phone = value => {
  if (value.length < 3) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid phone.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

// const firstName = value => {
//   if (value.length < 1) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         Обязательный атрибут.
//       </div>
//     );
//   }
// };

// const lastName = value => {
//   if (value.length < 1) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         Обязательный атрибут.
//       </div>
//     );
//   }
// };

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeSeller = this.onChangeSeller.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeRegion = this.onChangeRegion.bind(this);
    this.onChangeSettlement = this.onChangeSettlement.bind(this);
    this.onChangeStreet = this.onChangeStreet.bind(this);
    this.onChangeBuilding = this.onChangeBuilding.bind(this);

    this.state = {
      username: "",
      email: "",
      phone: "",
      password: "",
      seller: false,
      successful: false,
      message: "",
      firstName: "",
      lastName: "",
      region: "",
      settlement: "",
      street: "",
      building: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeSeller(e) {
    this.setState({
      seller: e.target.checked
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeRegion(e) {
    this.setState({
      region: e.target.value
    });
  }

  onChangeSettlement(e) {
    this.setState({
      settlement: e.target.value
    });
  }

  onChangeStreet(e) {
    this.setState({
      street: e.target.value
    });
  }

  onChangeBuilding(e) {
    this.setState({
      building: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.phone,
        this.state.password,
        this.state.seller,
        this.state.firstName,
        this.state.lastName,
        this.state.region,
        this.state.settlement,
        this.state.street,
        this.state.building,
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
        <div className="head">
          <Link className="button" to={`/login`}>Авторизация</Link>
          <Link className="button" to={`/register`}>Регистрация</Link>
        </div>
        <p className="name">ФЕРМА "ЛОКАВОРСТВО"</p>

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Имя</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    validations={[required, phone]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Пароль</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div>
                  <label className="checkbox">
                    <Input
                      type="checkbox"
                      name="seller"
                      checked={this.state.seller}
                      onChange={this.onChangeSeller}
                    />
                    <span className="text-checkbox"> Я продавец</span>
                  </label>
                </div>

                {this.state.seller && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="firstName">Имя</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.onChangeFirstName}
                        validations={[this.state.seller ? required : ""]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Фамилия</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.onChangeLastName}
                        validations={[this.state.seller ? required : ""]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="region">Регион</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="region"
                        value={this.state.region}
                        onChange={this.onChangeRegion}
                        validations={[this.state.seller ? required : ""]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="region">Населённый пункт</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="settlement"
                        value={this.state.settlement}
                        onChange={this.onChangeSettlement}
                        validations={[this.state.seller ? required : ""]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="region">Улица</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="street"
                        value={this.state.street}
                        onChange={this.onChangeStreet}
                        // validations={[this.state.seller ? required : ""]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="region">Дом</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="building"
                        value={this.state.building}
                        onChange={this.onChangeBuilding}
                        validations={[this.state.seller ? required : ""]}
                      />
                    </div>
                  </div>
                  
                )}

                <div className="form-group">
                  <button className="btn btn-block color">Зарегистрироваться</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
