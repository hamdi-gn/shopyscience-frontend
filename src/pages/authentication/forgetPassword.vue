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
                        <h4>Réinitialiser votre mot de passe</h4>
                        <p>Entrez votre email</p>
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
                        <div class="form-group mb-0">
                          <button
                            class="mt-4 btn btn-primary btn-block"
                            type="button"
                            @click="ResetPassword"
                          >
                            Réinitialiser
                          </button>
                        </div>
                        <p class="mt-4 mb-0">
                          Retourner à la page de connexion?
                          <router-link class="ml-2" tag="a" to="/connexion">
                            Retourner
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
        },
        submitted: false,
      };
    },
    computed: {

    },
    created() {
    },
    methods: {
      async ResetPassword() {
        await axios.post('/authentification/password/reset/',
        {
          email: this.user.username,
        }
        )
        .then(() => {
          this.$router.push('/nouveau-mot-de-passe')
        })
      }
    },
  };
</script>