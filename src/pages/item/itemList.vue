<template>
    <div>
        <Breadcrumbs main="" title="Produits"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                      <h5>Liste Des Produits</h5>
                    </div>

                    <div class="card-body">
                      <b-row>
                      <b-col xl="6" class="delete-datatable">
                        <div v-if="selected == null">
                          <b-button disabled v-b-modal.delete-modal variant="danger" @click="GetProduit" class="mb-3">Supprimer</b-button>
                          <b-button disabled v-b-modal.edit-modal variant="primary" class="ml-4 mb-3" @click="GetProduit">Modifier</b-button>
                          <b-button disabled v-b-modal.order-modal variant="primary" class="ml-4 mb-3" @click="GetProduit">Commander</b-button>
                        </div>
                        <div v-else>
                          <b-button v-b-modal.delete-modal variant="danger" @click="GetProduit" class="mb-3">Supprimer</b-button>
                          <b-button v-b-modal.edit-modal variant="primary" class="ml-4 mb-3" @click="GetProduit">Modifier</b-button>
                          <b-button v-b-modal.order-modal variant="primary" class="ml-4 mb-3" @click="GetProduit">Commander</b-button>
                        </div>
                          <b-input-group class="datatable-btn">
                            <b-form-input v-model="filter" placeholder="Chercher"></b-form-input>
                            <b-input-group-append>
                              <b-button :disabled="!filter" @click="filter = ''">Effacer</b-button>
                            </b-input-group-append>
                          </b-input-group>

                      </b-col>
                      
                      <b-col xl="6">
                        <b-form-group label-cols="2" label="Par page" class="datatable-select">
                          <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                        </b-form-group>
                        <b-form-group label-cols="4" class="datatable-select mt-3">
                          <b-button to="/ajouter-Produit" variant="primary">Ajouter</b-button>
                          </b-form-group>
                      </b-col>
                      </b-row>
                      <div class="table-responsive datatable-vue">
                        
                        <b-table v-if="renderComponent"
                          selectable
                          :select-mode="selectMode"
                          show-empty
                          stacked="md"
                          selectedVariant="success"
                          :items="Produits"
                          :fields="tablefields"
                          :filter="filter"
                          :current-page="currentPage"
                          :per-page="perPage"
                          @filtered="onFiltered"
                          @row-selected="rowSelected"
                        >
                        </b-table>
                      </div>

                      <b-col md="6" class="my-1 p-0">
                        <b-pagination
                          v-model="currentPage"
                          :total-rows="totalRows"
                          :per-page="perPage"
                          class="my-0"
                        ></b-pagination>
                      </b-col>
                    </div>
                </div>
              </div>

            </div>
        </div>
        <!-- Container-fluid Ends-->
        <b-modal id="edit-modal" size="lg" title="Détails de Produit" hide-footer class="theme-modal">
          <px-card :actions="false">
                  <div class="needs-validation" >
                      <div class="form-row">
                        <div class="form-row">
                            <div class="col-md-2 mb-3">
                                <label for="produit">Prix</label>
                                <b-form-input type="number" id="produit" v-model="Produit.Amount" :state="Item_verif.Amount"></b-form-input>
                            </div>
                            <div class="col-md-2 mb-3">
                                <label for="produit">Remise</label>
                                <b-form-input type="number" id="produit" v-model="Produit.Discount" :state="Item_verif.Discount"></b-form-input>
                            </div>
                            <div class="col-md-2 mb-3">
                                <label for="produit">Quantité</label>
                                <b-form-input type="number" id="produit" v-model="Produit.Quantity" :state="Item_verif.Quantity"></b-form-input>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="produit">CodeUnité</label>
                                <b-form-input type="text" id="produit" v-model="Produit.UnitCode" :state="Item_verif.UnitCode"></b-form-input>
                            </div>
                            <div class="col-md-2 mb-3">
                                <label for="produit">P.U</label>
                                <b-form-input type="number" id="produit" v-model="Produit.UnitPrice" :state="Item_verif.UnitPrice"></b-form-input>
                            </div>
                            <div class="col-md-2 mb-3">
                                <label for="produit">Montant TVA</label>
                                <b-form-input type="number" id="produit" v-model="Produit.VATAmount" :state="Item_verif.VATAmount"></b-form-input>
                            </div>
                            <div class="col-md-2 mb-3">
                                <label for="produit">Pourcentage TVA</label>
                                <b-form-input type="number" id="produit" v-model="Produit.VATPercentage" :state="Item_verif.VATPercentage"></b-form-input>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="produit">Description</label>
                                <b-form-input type="text" id="produit" v-model="Produit.Description" :state="Item_verif.Description"></b-form-input>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="produit">Description de l'article</label>
                                <b-form-input type="text" id="produit" v-model="Produit.ItemDescription" :state="Item_verif.ItemDescription"></b-form-input>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="produit">Description de l'unité</label>
                                <b-form-input type="text" id="produit" v-model="Produit.UnitDescription" :state="Item_verif.UnitDescription"></b-form-input>
                            </div>
                        </div>
                      </div>
                      <b-button @click.prevent="onTooltipSubmit" @click="PutProduit" variant="primary">Modifier</b-button>
                      <b-button @click="HideEditModal" class="ml-3" variant="warning">Annuler</b-button>
                  </div>
          </px-card>
        </b-modal>
        <b-modal id="delete-modal" title="Suppression de Produit" hide-footer class="theme-modal">
          <px-card :actions="false">
                  <div class="needs-validation" >
                      <div class="form-row">
                          <div class="col-md-8 mb-3">
                              <h5> Voulez vous supprimer  <b>{{Produit.Description}}</b>?</h5>
                          </div>
                      </div>
                      <b-button @click="DeleteProduit" variant="danger">Supprimer</b-button>
                      <b-button @click="HideDeleteModal" class="ml-3" variant="primary">Annuler</b-button>
                  </div>
          </px-card>
        </b-modal>
        <b-modal id="order-modal" title="Commander ce Produit" hide-footer class="theme-modal">
          <px-card :actions="false">
                  <div class="needs-validation" >
                      <div class="form-row mb-4">
                        <label for="produit">Description de l'article</label>
                        <b-form-input type="text" id="produit" v-model="Produit.ItemDescription" disabled></b-form-input>
                      </div>
                      <div class="form-row mb-4">
                        <label for="produit">Quantité</label>
                        <b-form-input type="number" id="produit" v-model="OrdredProduit.Quantity" :state="Item_verif.OrdredProduit"></b-form-input>
                      </div>
                      <b-button @click="AddOrdredProduit" variant="success">Ajouter au panier</b-button>
                      <b-button @click="HideDeleteModal" class="ml-3" variant="primary">Annuler</b-button>
                  </div>
          </px-card>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'

  export default {

    data(){
      return{
        Produits: [],
        OrdredProduit: {
          Quantity: ''
        },
        Produit: [],
        modes: ['single'],
        tablefields: [
          { key: 'Amount', label: 'Prix', sortable: true, },
          { key: 'Description', label: 'Description', sortable: true, },
          { key: 'Discount', label: 'Remise', sortable: true, },
          { key: 'ItemDescription', label: "Description de l'unité", sortable: true, },
          { key: 'Quantity', label: 'Quantité', sortable: true, },
          { key: 'UnitCode', label: 'CodeUnité', sortable: true, },
          { key: 'UnitDescription', label: "Description de l'unité", sortable: true, },
          { key: 'UnitPrice', label: 'Prix ​​unitaire', sortable: true, },
          { key: 'VATAmount', label: 'Montant de la TVA', sortable: true, },
          { key: 'VATPercentage', label: 'Pourcentage TVA', sortable: true, },
        ],
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
            VATPercentage: null,
            OrdredProduit: null
        },
        filter: null,
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [5, 10, 15],
        selectMode: 'single',
        selected: null,
        renderComponent: true,
      };
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.tablefields.filter(f => f.sortable).map(f => {
        return { text: f.label, value: f.key }; 
        });
      }
    },
    created() {
      
    },
    mounted() {
      // Set the initial number of Produits
      this.GetProduits()
      this.totalRows = this.Produits.length;
    },
    methods: {
      onTooltipSubmit(evt){
        evt.preventDefault();
        if(this.Produit.Amount !== '') {
          this.Item_verif.Amount = true;
        } else {
          this.Item_verif.Amount = false;
        }
        if(this.Produit.Description !== '') {
          this.Item_verif.Description = true;
        } else {
          this.Item_verif.Description = false;
        }
        if(this.Produit.Discount !== '') {
          this.Item_verif.Discount = true;
        } else {
          this.Item_verif.Discount = false;
        }
        if(this.Produit.ItemDescription !== '') {
          this.Item_verif.ItemDescription = true;
        } else {
          this.Item_verif.ItemDescription = false;
        }
        if(this.Produit.Quantity !== '') {
          this.Item_verif.Quantity = true;
        } else {
          this.Item_verif.Quantity = false;
        }
        if(this.Produit.UnitCode !== '') {
          this.Item_verif.UnitCode = true;
        } else {
          this.Item_verif.UnitCode = false;
        }
        if(this.Produit.UnitDescription !== '') {
          this.Item_verif.UnitDescription = true;
        } else {
          this.Item_verif.UnitDescription = false;
        }
        if(this.Produit.UnitPrice !== '') {
          this.Item_verif.UnitPrice = true;
        } else {
          this.Item_verif.UnitPrice = false;
        }
        if(this.Produit.VATAmount !== '') {
          this.Item_verif.VATAmount = true;
        } else {
          this.Item_verif.VATAmount = false;
        }
        if(this.Produit.VATPercentage !== '') {
          this.Item_verif.VATPercentage = true;
        } else {
          this.Item_verif.VATPercentage = false;
        }
        if(this.OrdredProduit.Quantity !== '') {
          this.Item_verif.OrdredProduit = true;
        } else {
          this.Item_verif.OrdredProduit = false;
        }
      },
      HideEditModal() {
        this.$bvModal.hide('edit-modal')
      },
      HideDeleteModal() {
        this.$bvModal.hide('delete-modal')
      },
      HideOrderModal() {
        this.$bvModal.hide('order-modal')
      },
      async GetProduits() {
        await axios.get('https://shopyscience.herokuapp.com/items/', 
        {
          headers:{
            Authorization: `Token ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          this.Produits = res.data
          this.totalRows = res.data.length
        })
      },
      async GetProduit() {
        await axios.get(`https://shopyscience.herokuapp.com/items/${this.selected.Item}/`, 
        {
          headers:{
            Authorization: `Token ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          this.Produit = res.data
        })
      },
      async PutProduit() {
        await axios.put(`https://shopyscience.herokuapp.com/items/${this.selected.Item}/`,this.Produit, 
        {
          headers:{
            Authorization: `Token ${localStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          this.$bvModal.hide('edit-modal')
        })
      },
      async DeleteProduit() {
        await axios.delete(`https://shopyscience.herokuapp.com/items/${this.selected.Item}/`, 
        {
          headers:{
            Authorization: `Token ${localStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          this.$bvModal.hide('delete-modal')
          this.Produits.splice(this.selected,1);

        })
      },
      async AddOrdredProduit() {
        await axios.post('https://shopyscience.herokuapp.com/ordreditems/',
        {
          Amount: this.selected.Amount,
          Description: this.selected.Description,
          Discount: this.selected.Discount,
          Item: this.selected.Item,
          ItemDescription: this.selected.ItemDescription,
          Quantity: this.OrdredProduit.Quantity,
          UnitCode: this.selected.UnitCode,
          UnitDescription: this.selected.UnitDescription,
          UnitPrice: this.selected.UnitPrice,
          VATAmount: this.selected.VATAmount,
          VATPercentage: this.selected.VATPercentage,
        },
        {
          headers:{
            Authorization: `Token ${localStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          this.HideOrderModal()
          this.OrdredProduit.Quantity = 0
        })
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      rowSelected(item) {
        this.selected = item[0];
      },
    },
  };
</script>