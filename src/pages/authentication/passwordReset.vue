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
                        <h4>Nouveau mot de passe</h4>
                        <p>Entrez vos coordonnées</p>
                        <div class="form-group">
                          <label class="col-form-label">Mot de passe</label>
                          <input
                            v-model="user.new_password1"
                            class="form-control"
                            type="password"
                            placeholder="*********"
                            :class="{
                              'is-invalid':!user.new_password1,
                            }"
                          />
                          <div
                            v-show="!user.new_password1"
                            class="invalid-feedback"
                          >
                            Mot de passe est requis
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-form-label">Confirmation mot de passe</label>
                          <input
                            v-model="user.new_password2"
                            class="form-control"
                            type="password"
                            placeholder="*********"
                            :class="{
                              'is-invalid':!user.new_password2,
                            }"
                          />
                          <div
                            v-show="!user.new_password2"
                            class="invalid-feedback"
                          >
                            Mot de passe est requis
                          </div>
                        </div>

                        <div class="row">
                        <div class="col-sm-6 col-md-5">
                          <div class="form-group">
                            <label class="col-form-label">UID</label>
                            <input
                              v-model="user.uid"
                              class="form-control"
                              type="text"
                              placeholder="2, 3, .."
                              :class="{
                                'is-invalid':!user.uid,
                              }"
                            />
                            <div
                              v-show="!user.uid"
                              class="invalid-feedback"
                            >
                              UID est requis
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-7">
                          <div class="form-group">
                            <label class="col-form-label">Token</label>
                            <input
                              v-model="user.token"
                              class="form-control"
                              type="text"
                              placeholder="qflh654eglihiadxndr"
                              :class="{
                                'is-invalid':!user.token,
                              }"
                            />
                            <div
                              v-show="!user.token"
                              class="invalid-feedback"
                            >
                              Token est requis
                            </div>
                          </div>
                        </div>
                        </div>

                        <div class="form-group mb-0">
                          <button
                            class="mt-4 btn btn-primary btn-block"
                            type="button"
                            @click="ConfirmResetPassword"
                          >
                            Réinitialiser
                          </button>
                        </div>
                        <p class="mt-4 mb-0">
                          Retourner à la page de connexion?
                          <router-link class="ml-2" tag="a" to="/reinitialiser-mot-de-passe">
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
          new_password1: '',
          new_password2: '',
          uid: '',
          token: '',
        },
        submitted: false,
      };
    },
    computed: {

    },
    created() {
    },
    methods: {
      async ConfirmResetPassword() {
        await axios.post('/authentification/password/reset/confirm/',this.user
        )
        .then(() => {
          this.$router.push('/connexion')
        })
      }
    },
  };
</script>