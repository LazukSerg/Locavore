import React, { Component, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail, isMobilePhone, isMobilePhoneLocales } from "validator";
import { Link } from "react-router-dom";
import Select from "react-select";

import AuthService from "../services/auth.service";
import "./register.css"

// Добавляем массив регионов для фильтрации
const regionsOptions = [
  { label: 'Республика Адыгея', value: 'RESPUBLIKA_ADYGEYA' },
  { label: 'Республика Алтай', value: 'RESPUBLIKA_ALTAY' },
  { label: 'Республика Башкортостан', value: 'RESPUBLIKA_BASHKORTOSTAN' },
  { label: 'Республика Бурятия', value: 'RESPUBLIKA_BURYATIA' },
  { label: 'Республика Дагестан', value: 'RESPUBLIKA_DAGESTAN' },
  { label: 'Республика Ингушетия', value: 'RESPUBLIKA_INGUSHETIYA' },
  { label: 'Кабардино-Балкарская Республика', value: 'KABARDINO_BALKARSKAYA_RESPUBLIKA' },
  { label: 'Республика Калмыкия', value: 'RESPUBLIKA_KALMYKIA' },
  { label: 'Карачаево-Черкесская Республика', value: 'KARACHAEVO_CHERKESSKAYA_RESPUBLIKA' },
  { label: 'Республика Карелия', value: 'RESPUBLIKA_KARELYA' },
  { label: 'Республика Коми', value: 'RESPUBLIKA_KOMI' },
  { label: 'Республика Крым', value: 'RESPUBLIKA_KRYM' },
  { label: 'Республика Марий Эл', value: 'RESPUBLIKA_MARI_EL' },
  { label: 'Республика Мордовия', value: 'RESPUBLIKA_MORDOVIA' },
  { label: 'Республика Саха (Якутия)', value: 'RESPUBLIKA_SAKHA_YAKUTIYA' },
  { label: 'Республика Северная Осетия — Алания', value: 'RESPUBLIKA_SEVERNAYA_OSETIYA_ALANIA' },
  { label: 'Республика Татарстан', value: 'RESPUBLIKA_TATARSTAN' },
  { label: 'Республика Тыва', value: 'RESPUBLIKA_TYVA' },
  { label: 'Удмуртская Республика', value: 'UDMURTSKAYA_RESPUBLIKA' },
  { label: 'Республика Хакасия', value: 'RESPUBLIKA_KHAKASIA' },
  { label: 'Чеченская Республика', value: 'CHECHENSKAYA_RESPUBLIKA' },
  { label: 'Чувашская Республика', value: 'CHUVASHSKAYA_RESPUBLIKA' },
  { label: 'Донецкая Народная Республика', value: 'DONETSKAYA_NARODNAYA_RESPUBLIKA' },
  { label: 'Луганская Народная Республика', value: 'LUGANSKAYA_NARODNAYA_RESPUBLIKA' },
  { label: 'Алтайский край', value: 'ALTAYSKIY_KRAY' },
  { label: 'Забайкальский край', value: 'ZABAYKALSKIY_KRAY' },
  { label: 'Камчатский край', value: 'KAMCHATSKIY_KRAY' },
  { label: 'Краснодарский край', value: 'KRASNODARSKIY_KRAY' },
  { label: 'Красноярский край', value: 'KRASNOYARSKIY_KRAY' },
  { label: 'Пермский край', value: 'PERMSKIY_KRAY' },
  { label: 'Приморский край', value: 'PRIMORSKIY_KRAY' },
  { label: 'Ставропольский край', value: 'STAVROPOLSKIY_KRAY' },
  { label: 'Хабаровский край', value: 'KHABAROVSKIY_KRAY' },
  { label: 'Амурская область', value: 'AMURSKAYA_OBLAST' },
  { label: 'Архангельская область', value: 'ARKHANGELSKAYA_OBLAST' },
  { label: 'Астраханская область', value: 'ASTRAKHANSKAYA_OBLAST' },
  { label: 'Белгородская область', value: 'BELGORODSKAYA_OBLAST' },
  { label: 'Брянская область', value: 'BRYANSKAYA_OBLAST' },
  { label: 'Владимирская область', value: 'VLADIMIRSKAYA_OBLAST' },
  { label: 'Волгоградская область', value: 'VOLGOGRADSKAYA_OBLAST' },
  { label: 'Вологодская область', value: 'VOLOGODSKAYA_OBLAST' },
  { label: 'Воронежская область', value: 'VORONEZHSKAYA_OBLAST' },
  { label: 'Ивановская область', value: 'IVANOVSKAYA_OBLAST' },
  { label: 'Иркутская область', value: 'IRKUTSKAYA_OBLAST' },
  { label: 'Калининградская область', value: 'KALININGRADSKAYA_OBLAST' },
  { label: 'Калужская область', value: 'KALUZHSKAYA_OBLAST' },
  { label: 'Кемеровская область — Кузбасс', value: 'KEMEROVSKAYA_OBLAST_KUZBASS' },
  { label: 'Кировская область', value: 'KIROVSKAYA_OBLAST' },
  { label: 'Костромская область', value: 'KOSTROMSKAYA_OBLAST' },
  { label: 'Курганская область', value: 'KURGANSKAYA_OBLAST' },
  { label: 'Курская область', value: 'KURSKAYA_OBLAST' },
  { label: 'Ленинградская область', value: 'LENINGRADSKAYA_OBLAST' },
  { label: 'Липецкая область', value: 'LIPETSKAYA_OBLAST' },
  { label: 'Магаданская область', value: 'MAGADANSKAYA_OBLAST' },
  { label: 'Московская область', value: 'MOSKOVSKAYA_OBLAST' },
  { label: 'Мурманская область', value: 'MURMANSKAYA_OBLAST' },
  { label: 'Нижегородская область', value: 'NIZHEGORODSKAYA_OBLAST' },
  { label: 'Новгородская область', value: 'NOVGORODSKAYA_OBLAST' },
  { label: 'Новосибирская область', value: 'NOVOSIBIRSKAYA_OBLAST' },
  { label: 'Омская область', value: 'OMSKAYA_OBLAST' },
  { label: 'Оренбургская область', value: 'ORENBURGSKAYA_OBLAST' },
  { label: 'Орловская область', value: 'ORLOVSKAYA_OBLAST' },
  { label: 'Пензенская область', value: 'PENZENSKAYA_OBLAST' },
  { label: 'Псковская область', value: 'PSKOVSKAYA_OBLAST' },
  { label: 'Ростовская область', value: 'ROSTOVSKAYA_OBLAST' },
  { label: 'Рязанская область', value: 'RYAZANSKAYA_OBLAST' },
  { label: 'Самарская область', value: 'SAMARSKAYA_OBLAST' },
  { label: 'Саратовская область', value: 'SARATOVSKAYA_OBLAST' },
  { label: 'Сахалинская область', value: 'SAKHALINSKAYA_OBLAST' },
  { label: 'Свердловская область', value: 'SVERDLOVSKAYA_OBLAST' },
  { label: 'Смоленская область', value: 'SMОЛENSKAYA_OBLAST' },
  { label: 'Тамбовская область', value: 'TАМBOVSKAYA_OBLAST' },
  { label: 'Тверская область', value: 'TVERSKAYA_OBLAST' },
  { label: 'Томская область', value: 'TOMSKAYA_OBLAST' },
  { label: 'Тульская область', value: 'TULSKAYA_OBLAST' },
  { label: 'Тюменская область', value: 'TYUMENSKAYA_OBLAST' },
  { label: 'Ульяновская область', value: 'ULJANOVSKAYA_OBLAST' },
  { label: 'Челябинская область', value: 'CHELYABINSKAYA_OBLAST' },
  { label: 'Ярославская область', value: 'YAROSLAVSKAYA_OBLAST' },
  { label: 'Город Москва', value: 'GOROD_MOSKVA' },
  { label: 'Город Санкт-Петербург', value: 'GOROD_SANKT_PETERBURG' },
  { label: 'Город Севастополь', value: 'GOROD_SEVASTOPOL' },
  { label: 'Еврейская автономная область', value: 'YEVREYSKAYA_AVTONOMNAYA_OBLAST' },
  { label: 'Ненецкий автономный округ', value: 'NENETSKIY_AVTONOMNYY_OKRUG' },
  { label: 'Ханты-Мансийский автономный округ — Югра', value: 'KHANTY_MANSIYSKIY_AVTONOMNYY_OKRUG_YUGRA' },
  { label: 'Чукотский автономный округ', value: 'CHUKOTSKIY_AVTONOMNYY_OKRUG' },
  { label: 'Ямало-Ненецкий автономный округ', value: 'YAMALO_NENETSKIY_AVTONOMNYY_OKRUG' },
  { label: 'Запорожская область', value: 'ZAPOROZHSKAYA_OBLAST' },
  { label: 'Херсонская область', value: 'KHERSONSKAYA_OBLAST' }
];

const required = value => {
  if (!value || value.trim().length === 0) {
    return (
      <div className="alert alert-danger" role="alert">
        Это обязательное поле!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Не является электронным почтовым адресом.
      </div>
    );
  }
};

const phone = value => {
  if (value.length < 10) {
    return (
      <div className="alert alert-danger" role="alert">
        Не является номером телефона.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Имя пользователя должно быть от 3 до 20 символов
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Пароль должен быть от 6 до 40 символов.
      </div>
    );
  }
};


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

  onChangeRegion(selectedOption) {
    if (selectedOption) {
      this.setState({ region: selectedOption.value });
    } else {
      this.setState({ region: '' });
    }
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
          <Link className="button" to={`/login`}>Вход</Link>
          <Link className="button" to={`/register`}>Регистрация</Link>
        </div>
        <p className="name">"ЛОКАВОРСТВО"</p>

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
                      <Select
                        options={regionsOptions}
                        name="region"
                        value={regionsOptions.find(opt => opt.value === this.state.region)}
                        onChange={this.onChangeRegion}
                        filterOption={(option, inputValue) =>
                          option.label.toLowerCase().startsWith(inputValue.toLowerCase())
                        }
                        placeholder="Выберите регион"
                        validations={[this.state.seller ? required : ""]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="settlement">Населённый пункт</label>
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
                      <label htmlFor="street">Улица</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="street"
                        value={this.state.street}
                        onChange={this.onChangeStreet}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="building">Дом</label>
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
