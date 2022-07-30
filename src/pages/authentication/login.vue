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
                        <h4>Connectez-vous au compte</h4>
                        <p>Entrez votre email et votre mot de passe</p>
                        <div class="form-group">
                          <label class="col-form-label">Adresse Email</label>
                          <input
                            v-model="user.username"
                            class="form-control"
                            type="email"
                            placeholder="Test@gmail.com"
                            :class="{
                              'is-invalid':!user.username,
                            }"
                          />
                          <div
                            v-show="!user.username"
                            class="invalid-feedback"
                          >
                            Email est requis
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-form-label">Mot De Passe</label>
                          <input
                            v-model="user.password"
                            autocomplete=""
                            class="form-control"
                            type="password"
                            placeholder="*********"
                            :class="{
                              'is-invalid': !user.password,
                            }"
                          />
                          <div
                            v-show="!user.password"
                            class="invalid-feedback"
                          >
                            Mot de passe est requis
                          </div>
                        </div>
                        <div class="form-group mb-0">
                          <button
                            class="mt-4 btn btn-primary btn-block"
                            type="button"
                            @click="Login"
                          >
                            Connexion
                          </button>
                        </div>
                        <p class="mt-4 mb-0">
                          Vous n'avez pas de compte?
                          <router-link class="ml-2" tag="a" to="/inscription">
                            Créer un compte
                          </router-link>
                        </p>
                        <p class="mt-4 mb-0">
                          Mot de passe oublié?
                          <router-link class="ml-2" tag="a" to="/reinitialiser-mot-de-passe">
                            Réinitialiser
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
          username: '',
          password: '',
        },
        submitted: false,
      };
    },
    computed: {

    },
    created() {
    },
    methods: {
      async Login() {
        await axios.post('https://shopyscience.herokuapp.com/authentication/login/',
        {
          email: this.user.username,
          password: this.user.password
        })
        .then((res) => {
          localStorage.setItem('access_token', res.data.key)
          this.$router.push('/dashboard/default')
        })
      }
    },
  };
</script>