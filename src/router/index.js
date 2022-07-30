import Vue from 'vue'
import Router from "vue-router";

import Body from '../components/body'
import LoginForm from '../pages/authentication/login'
import RegisterForm from '../pages/authentication/registration'
import PasswordForget from '../pages/authentication/forgetPassword'
import NewPassword from '../pages/authentication/passwordReset'
import Accueil from '../pages/accueil'
import itemsList from '../pages/item/itemList'
import Additem from '../pages/item/addItem'
import contactList from '../pages/contact/contactList'
import addContact from '../pages/contact/addContact'
import orderList from '../pages/order/orderList'
import addOrder from '../pages/order/addOrder'

// component

Vue.use(Router)

const routes = [
  { path: '', redirect: { name: 'default' }},
  {
    path: '/dashboard',
    component: Body,
    children: [
    {
      path: 'default',
      name: 'default',
      component: Accueil,
      meta: {
        title: 'Default Dashboard | Endless - Premium Admin Template',
      }
    },
    {
      path: '/produits',
      name: 'produits',
      component: itemsList,
      meta: {
        title: 'produits | Endless - Premium Admin Template',
      }
    },
    {
      path: '/ajouter-produit',
      name: 'ajouter-produit',
      component: Additem,
      meta: {
        title: 'ajouter produit | Endless - Premium Admin Template',
      }
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: contactList,
      meta: {
        title: 'contacts | Endless - Premium Admin Template',
      }
    },
    {
      path: '/ajouter-contact',
      name: 'ajouter-contact',
      component: addContact,
      meta: {
        title: 'ajouter contact | Endless - Premium Admin Template',
      }
    },
    {
      path: '/commandes',
      name: 'commandes',
      component: orderList,
      meta: {
        title: 'commandes | Endless - Premium Admin Template',
      }
    },
    {
      path: '/ajouter-commande',
      name: 'ajouter-commande',
      component: addOrder,
      meta: {
        title: 'ajouter commande | Endless - Premium Admin Template',
      }
    },
    ]
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: LoginForm,
    meta: {
      title: 'Connexion | Endless - Premium Admin Template',
    }
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: RegisterForm,
    meta: {
      title: 'Inscription | Endless - Premium Admin Template',
    }
  },
  {
    path: '/reinitialiser-mot-de-passe',
    name: 'reinitialiser-mot-de-passe',
    component: PasswordForget,
    meta: {
      title: 'Réinitialiser le mot de passe | Endless - Premium Admin Template',
    }
  },
  {
    path: '/nouveau-mot-de-passe',
    name: 'nouveau-mot-de-passe',
    component: NewPassword,
    meta: {
      title: 'Nouveau le mot de passe | Endless - Premium Admin Template',
    }
  },
];

const router = new Router({
  routes,
  base: '/',
  mode: 'history',
  linkActiveClass: "active",
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

export default router
