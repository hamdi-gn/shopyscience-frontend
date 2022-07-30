<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-7 order-1 b-center bg-size" :style="{ backgroundImage: 'url('+ require('../../assets/images/login/1.jpg') +')' }"
          style="background-size: cover; background-position: center center; display: block;">
      </div>
      <div class="col-xl-5 p-0">
        <div class="login-card">
          <div>
            <div>
              <a class="logo text-center">
                <img
                  class="img-fluid for-light"
                  src="../../assets/images/logo/login.png"
                  alt="looginpage"
                  width="50%" />
                </a>
            </div>
            <div class="login-main">
              <b-card no-body>
                <b-tabs>
                    <b-card-text>
                      <form class="theme-form">
                        <h4>Créez votre compte</h4>
                        <p>Entrez vos informations personnelles pour créer un compte</p> 
                        <div class="row">
                        <div class="col-sm-6 col-md-5">
                          <div class="form-group">
                            <label class="col-form-label">Nom Utilisateur</label>
                            <input
                              v-model="user.username"
                              class="form-control"
                              type="text"
                              placeholder="username"
                              :class="{
                                'is-invalid':!user.username,
                              }"
                            />
                            <div
                              v-show="!user.username"
                              class="invalid-feedback"
                            >
                              Utilisateur est requis
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-7">
                          <div class="form-group">
                            <label class="col-form-label">Adresse Email</label>
                            <input
                              v-model="user.email"
                              class="form-control"
                              type="email"
                              placeholder="Test@gmail.com"
                              :class="{
                                'is-invalid':!user.email,
                              }"
                            />
                            <div
                              v-show="!user.email"
                              class="invalid-feedback"
                            >
                              Email est requis
                            </div>
                          </div>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-sm-6 col-md-6">
                        <div class="form-group">
                          <label class="col-form-label">Mot De Passe</label>
                          <input
                            v-model="user.password1"
                            autocomplete=""
                            class="form-control"
                            type="password"
                            placeholder="*********"
                            :class="{
                              'is-invalid': !user.password1,
                            }"
                          />
                          <div
                            v-show="!user.password1"
                            class="invalid-feedback"
                          >
                            Mot de passe est requis
                          </div>
                        </div>
                        </div>
                      <div class="col-sm-6 col-md-6">
                        <div class="form-group">
                          <label class="col-form-label">Confirm Mot De Passe</label>
                          <input
                            v-model="user.password2"
                            autocomplete=""
                            class="form-control"
                            type="password"
                            placeholder="*********"
                            :class="{
                              'is-invalid': !user.password2,
                            }"
                          />
                          <div
                            v-show="!user.password2"
                            class="invalid-feedback"
                          >
                            Mot de passe est requis
                          </div>
                        </div>
                        </div>
                        </div>

                        <div class="form-group mb-0">
                          <button
                            class="btn btn-primary btn-block"
                            type="button"
                            @click="Register"
                          >
                            Inscription
                          </button>
                        </div>
                        <p class="mt-4 mb-0">
                          Avez vous un compte?
                          <router-link class="ml-2" tag="a" to="/connexion">
                            Connexion
                          </router-link>
                        </p>
                      </form>
                    </b-card-text>
                </b-tabs>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

  export default {
    name: 'login',
    data() {
      return {
        user : {
          email: '',
          username: '',
          password1: '',
          password2: '',
        },
        submitted: false,
      };
    },
    computed: {

    },
    created() {
    },
    methods: {
      async Register() {
        await axios.post('https://shopyscience.herokuapp.com/authentication/registration/', this.user)
        .then(() => {
          this.$router.push('/connexion')
        })
      }
    },
  };
</script>