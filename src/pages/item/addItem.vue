<template>
    <div>
        <Breadcrumbs main="" title="produits"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                      <h5>Ajouter un produit</h5>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <b-form class="needs-validation">
                                <div class="form-row">
                                    <div class="col-md-2 mb-3">
                                        <label for="produit">Prix</label>
                                        <b-form-input type="number" id="produit" v-model="Item.Amount" :state="Item_verif.Amount"></b-form-input>
                                    </div>
                                    <div class="col-md-2 mb-3">
                                        <label for="produit">Remise</label>
                                        <b-form-input type="number" id="produit" v-model="Item.Discount" :state="Item_verif.Discount"></b-form-input>
                                    </div>
                                    <div class="col-md-2 mb-3">
                                        <label for="produit">Quantité</label>
                                        <b-form-input type="number" id="produit" v-model="Item.Quantity" :state="Item_verif.Quantity"></b-form-input>
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <label for="produit">Code Unité</label>
                                        <b-form-input type="text" id="produit" v-model="Item.UnitCode" :state="Item_verif.UnitCode"></b-form-input>
                                    </div>
                                    <div class="col-md-2 mb-3">
                                        <label for="produit">Prix U</label>
                                        <b-form-input type="number" id="produit" v-model="Item.UnitPrice" :state="Item_verif.UnitPrice"></b-form-input>
                                    </div>
                                    <div class="col-md-2 mb-3">
                                        <label for="produit">Montant de la TVA</label>
                                        <b-form-input type="number" id="produit" v-model="Item.VATAmount" :state="Item_verif.VATAmount"></b-form-input>
                                    </div>
                                    <div class="col-md-2 mb-3">
                                        <label for="produit">Pourcentage TVA</label>
                                        <b-form-input type="number" id="produit" v-model="Item.VATPercentage" :state="Item_verif.VATPercentage"></b-form-input>
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <label for="produit">Description</label>
                                        <b-form-input type="text" id="produit" v-model="Item.Description" :state="Item_verif.Description"></b-form-input>
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <label for="produit">Description de l'article</label>
                                        <b-form-input type="text" id="produit" v-model="Item.ItemDescription" :state="Item_verif.ItemDescription"></b-form-input>
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <label for="produit">Description de l'unité</label>
                                        <b-form-input type="text" id="produit" v-model="Item.UnitDescription" :state="Item_verif.UnitDescription"></b-form-input>
                                    </div>
                                </div>
                                <b-button @click.prevent="onTooltipSubmit" @click="Addproduit" variant="primary">Ajouter produit</b-button>
                            </b-form>
                        </div>
                    </div>
                </div>
              </div>

            </div>
        </div>
        <!-- Container-fluid Ends-->
    </div>
</template>

<script>
import axios from 'axios'

  export default {

    data(){
      return{
        Item: {
            Amount: '',
            Description: '',
            Discount: '',
            ItemDescription: '',
            Quantity: '',
            UnitCode: '',
            UnitDescription: '',
            UnitPrice: '',
            VATAmount: '',
            VATPercentage: '',
        },
        Item_verif: {
            Amount: null,
            Description: null,
            Discount: null,
            ItemDescription: null,
            Quantity: null,
            UnitCode: null,
            UnitDescription: null,
            UnitPrice: null,
            VATAmount: null,
            VATPercentage: null
        },
      };
    },
    computed: {
    },
    created() {
      
    },
    mounted() {
    },
    methods: {
      onTooltipSubmit(evt){
        evt.preventDefault();
        if(this.Item.Amount !== '') {
          this.Item_verif.Amount = true;
        } else {
          this.Item_verif.Amount = false;
        }
        if(this.Item.Description !== '') {
          this.Item_verif.Description = true;
        } else {
          this.Item_verif.Description = false;
        }
        if(this.Item.Discount !== '') {
          this.Item_verif.Discount = true;
        } else {
          this.Item_verif.Discount = false;
        }
        if(this.Item.ItemDescription !== '') {
          this.Item_verif.ItemDescription = true;
        } else {
          this.Item_verif.ItemDescription = false;
        }
        if(this.Item.Quantity !== '') {
          this.Item_verif.Quantity = true;
        } else {
          this.Item_verif.Quantity = false;
        }
        if(this.Item.UnitCode !== '') {
          this.Item_verif.UnitCode = true;
        } else {
          this.Item_verif.UnitCode = false;
        }
        if(this.Item.UnitDescription !== '') {
          this.Item_verif.UnitDescription = true;
        } else {
          this.Item_verif.UnitDescription = false;
        }
        if(this.Item.UnitPrice !== '') {
          this.Item_verif.UnitPrice = true;
        } else {
          this.Item_verif.UnitPrice = false;
        }
        if(this.Item.VATAmount !== '') {
          this.Item_verif.VATAmount = true;
        } else {
          this.Item_verif.VATAmount = false;
        }
        if(this.Item.VATPercentage !== '') {
          this.Item_verif.VATPercentage = true;
        } else {
          this.Item_verif.VATPercentage = false;
        }
      },
      async Addproduit() {
        await axios.post('https://shopyscience.herokuapp.com/items/',this.Item,
        {
          headers:{
            Authorization: `Token ${localStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          this.$router.push('/produits')
        })
      },
    },
  };
</script>