<template>
    <div>
        <Breadcrumbs main="" title="Commandes"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                      <h5>Liste Des Commandes</h5>
                    </div>

                    <div class="card-body">
                      <b-row>
                      <b-col xl="6" class="delete-datatable">
                        <div v-if="selected == null">
                          <b-button disabled v-b-modal.edit-modal variant="primary" class="ml-4 mb-3" @click="GetCommande">Détails</b-button>
                        </div>
                        <div v-else>
                          <b-button v-b-modal.edit-modal variant="primary" class="ml-4 mb-3" @click="GetCommande">Détails</b-button>
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
                        <b-form-group label-cols="6" class="datatable-select mt-3">
                          <b-button to="/ajouter-Commande" variant="primary">Ajouter</b-button>
                          <b-button @click="downloadFile()" class="mt-3" variant="primary">Télécharger CSV</b-button>
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
                          :items="Commandes"
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
        <b-modal id="edit-modal" size="xl" title="Détails de Commande" hide-footer class="theme-modal">
          <px-card :actions="false">
                  <div class="needs-validation" >
                      <div class="form-row">
                        <div class="form-row">
                            <div class="col-md-4 mb-3">
                                <label for="Order">Montant</label>
                                <b-form-input disabled type="number" id="Order" v-model="Commande.Amount" ></b-form-input>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="Order">Livrer à</label>
                                <b-form-input disabled  type="number" id="Order" v-model="Commande.DeliverTo"></b-form-input>
                            </div>
                            <div class="col-md-3 mb-3">
                              <label for="Order">Devise</label>
                              <b-form-input disabled type="number" id="Order" v-model="Commande.Currency"></b-form-input>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="Order">Numéro de commande</label>
                                <b-form-input disabled type="number" id="Order" v-model="Commande.OrderNumber"></b-form-input>
                            </div>
                            <div class="col-md-8 mb-3">
                              <label for="Order">Produits commandés</label>
                              <table>
                                <tr>
                                  <th>Montant</th>
                                  <th>Description</th>
                                  <th>Remise</th> 
                                  <th>Desc U</th> 
                                  <th>Qte</th> 
                                  <th>C.U</th> 
                                  <th>Description de l'unité</th> 
                                  <th>P.U</th> 
                                  <th>Montant TVA</th> 
                                  <th>Pourcentage TVA</th> 
                                </tr>
                                <tr v-for="command in Commande.SalesOrderLines" :key="command.Item">
                                  <td>{{command.Amount}}</td>
                                  <td>{{command.Description}}</td>
                                  <td>{{command.Discount}}</td>
                                  <td>{{command.ItemDescription}}</td>
                                  <td>{{command.Quantity}}</td>
                                  <td>{{command.UnitCode}}</td>
                                  <td>{{command.UnitDescription}}</td>
                                  <td>{{command.UnitPrice}}</td>
                                  <td>{{command.VATAmount}}</td>
                                  <td>{{command.VATPercentage}}</td>
                                </tr>
                              </table>
                            </div>
                        </div>
                      </div>
                      <b-button @click="HideEditModal" class="ml-3" variant="primary">Annuler</b-button>
                  </div>
          </px-card>
        </b-modal>
        <b-modal id="delete-modal" title="Suppression de Commande" hide-footer class="theme-modal">
          <px-card :actions="false">
                  <div class="needs-validation" >
                      <div class="form-row">
                          <div class="col-md-8 mb-3">
                              <h5> Voulez vous supprimer  <b>{{Commande.AccountName}}</b>?</h5>
                          </div>
                      </div>
                      <b-button @click="DeleteCommande" variant="danger">Supprimer</b-button>
                      <b-button @click="HideDeleteModal" class="ml-3" variant="primary">Annuler</b-button>
                  </div>
          </px-card>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import JsonCSV from 'vue-json-csv'

  export default {
    components: {
      downloadCsv: JsonCSV
    },
    data(){
      return{
        csv:'',
        countries:[ 
            {name: 'Afghanistan', code: 'AF'}, 
            {name: 'Åland Islands', code: 'AX'}, 
            {name: 'Albania', code: 'AL'}, 
            {name: 'Algeria', code: 'DZ'}, 
            {name: 'American Samoa', code: 'AS'}, 
            {name: 'AndorrA', code: 'AD'}, 
            {name: 'Angola', code: 'AO'}, 
            {name: 'Anguilla', code: 'AI'}, 
            {name: 'Antarctica', code: 'AQ'}, 
            {name: 'Antigua and Barbuda', code: 'AG'}, 
            {name: 'Argentina', code: 'AR'}, 
            {name: 'Armenia', code: 'AM'}, 
            {name: 'Aruba', code: 'AW'}, 
            {name: 'Australia', code: 'AU'}, 
            {name: 'Austria', code: 'AT'}, 
            {name: 'Azerbaijan', code: 'AZ'}, 
            {name: 'Bahamas', code: 'BS'}, 
            {name: 'Bahrain', code: 'BH'}, 
            {name: 'Bangladesh', code: 'BD'}, 
            {name: 'Barbados', code: 'BB'}, 
            {name: 'Belarus', code: 'BY'}, 
            {name: 'Belgium', code: 'BE'}, 
            {name: 'Belize', code: 'BZ'}, 
            {name: 'Benin', code: 'BJ'}, 
            {name: 'Bermuda', code: 'BM'}, 
            {name: 'Bhutan', code: 'BT'}, 
            {name: 'Bolivia', code: 'BO'}, 
            {name: 'Bosnia and Herzegovina', code: 'BA'}, 
            {name: 'Botswana', code: 'BW'}, 
            {name: 'Bouvet Island', code: 'BV'}, 
            {name: 'Brazil', code: 'BR'}, 
            {name: 'British Indian Ocean Territory', code: 'IO'}, 
            {name: 'Brunei Darussalam', code: 'BN'}, 
            {name: 'Bulgaria', code: 'BG'}, 
            {name: 'Burkina Faso', code: 'BF'}, 
            {name: 'Burundi', code: 'BI'}, 
            {name: 'Cambodia', code: 'KH'}, 
            {name: 'Cameroon', code: 'CM'}, 
            {name: 'Canada', code: 'CA'}, 
            {name: 'Cape Verde', code: 'CV'}, 
            {name: 'Cayman Islands', code: 'KY'}, 
            {name: 'Central African Republic', code: 'CF'}, 
            {name: 'Chad', code: 'TD'}, 
            {name: 'Chile', code: 'CL'}, 
            {name: 'China', code: 'CN'}, 
            {name: 'Christmas Island', code: 'CX'}, 
            {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
            {name: 'Colombia', code: 'CO'}, 
            {name: 'Comoros', code: 'KM'}, 
            {name: 'Congo', code: 'CG'}, 
            {name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
            {name: 'Cook Islands', code: 'CK'}, 
            {name: 'Costa Rica', code: 'CR'}, 
            {name: 'Cote D\'Ivoire', code: 'CI'}, 
            {name: 'Croatia', code: 'HR'}, 
            {name: 'Shopy Science', code: 'CU'}, 
            {name: 'Cyprus', code: 'CY'}, 
            {name: 'Czech Republic', code: 'CZ'}, 
            {name: 'Denmark', code: 'DK'}, 
            {name: 'Djibouti', code: 'DJ'}, 
            {name: 'Dominica', code: 'DM'}, 
            {name: 'Dominican Republic', code: 'DO'}, 
            {name: 'Ecuador', code: 'EC'}, 
            {name: 'Egypt', code: 'EG'}, 
            {name: 'El Salvador', code: 'SV'}, 
            {name: 'Equatorial Guinea', code: 'GQ'}, 
            {name: 'Eritrea', code: 'ER'}, 
            {name: 'Estonia', code: 'EE'}, 
            {name: 'Ethiopia', code: 'ET'}, 
            {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
            {name: 'Faroe Islands', code: 'FO'}, 
            {name: 'Fiji', code: 'FJ'}, 
            {name: 'Finland', code: 'FI'}, 
            {name: 'France', code: 'FR'}, 
            {name: 'French Guiana', code: 'GF'}, 
            {name: 'French Polynesia', code: 'PF'}, 
            {name: 'French Southern Territories', code: 'TF'}, 
            {name: 'Gabon', code: 'GA'}, 
            {name: 'Gambia', code: 'GM'}, 
            {name: 'Georgia', code: 'GE'}, 
            {name: 'Germany', code: 'DE'}, 
            {name: 'Ghana', code: 'GH'}, 
            {name: 'Gibraltar', code: 'GI'}, 
            {name: 'Greece', code: 'GR'}, 
            {name: 'Greenland', code: 'GL'}, 
            {name: 'Grenada', code: 'GD'}, 
            {name: 'Guadeloupe', code: 'GP'}, 
            {name: 'Guam', code: 'GU'}, 
            {name: 'Guatemala', code: 'GT'}, 
            {name: 'Guernsey', code: 'GG'}, 
            {name: 'Guinea', code: 'GN'}, 
            {name: 'Guinea-Bissau', code: 'GW'}, 
            {name: 'Guyana', code: 'GY'}, 
            {name: 'Haiti', code: 'HT'}, 
            {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
            {name: 'Holy See (Vatican CommandeName State)', code: 'VA'}, 
            {name: 'Honduras', code: 'HN'}, 
            {name: 'Hong Kong', code: 'HK'}, 
            {name: 'Hungary', code: 'HU'}, 
            {name: 'Iceland', code: 'IS'}, 
            {name: 'India', code: 'IN'}, 
            {name: 'Indonesia', code: 'ID'}, 
            {name: 'Iran, Islamic Republic Of', code: 'IR'}, 
            {name: 'Iraq', code: 'IQ'}, 
            {name: 'Ireland', code: 'IE'}, 
            {name: 'Isle of Man', code: 'IM'}, 
            {name: 'Israel', code: 'IL'}, 
            {name: 'Italy', code: 'IT'}, 
            {name: 'Jamaica', code: 'JM'}, 
            {name: 'Japan', code: 'JP'}, 
            {name: 'Jersey', code: 'JE'}, 
            {name: 'Jordan', code: 'JO'}, 
            {name: 'Kazakhstan', code: 'KZ'}, 
            {name: 'Kenya', code: 'KE'}, 
            {name: 'Kiribati', code: 'KI'}, 
            {name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
            {name: 'Korea, Republic of', code: 'KR'}, 
            {name: 'Kuwait', code: 'KW'}, 
            {name: 'Kyrgyzstan', code: 'KG'}, 
            {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
            {name: 'Latvia', code: 'LV'}, 
            {name: 'Lebanon', code: 'LB'}, 
            {name: 'Lesotho', code: 'LS'}, 
            {name: 'Liberia', code: 'LR'}, 
            {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
            {name: 'Liechtenstein', code: 'LI'}, 
            {name: 'Lithuania', code: 'LT'}, 
            {name: 'Luxembourg', code: 'LU'}, 
            {name: 'Macao', code: 'MO'}, 
            {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
            {name: 'Madagascar', code: 'MG'}, 
            {name: 'Malawi', code: 'MW'}, 
            {name: 'Malaysia', code: 'MY'}, 
            {name: 'Maldives', code: 'MV'}, 
            {name: 'Mali', code: 'ML'}, 
            {name: 'Malta', code: 'MT'}, 
            {name: 'Marshall Islands', code: 'MH'}, 
            {name: 'Martinique', code: 'MQ'}, 
            {name: 'Mauritania', code: 'MR'}, 
            {name: 'Mauritius', code: 'MU'}, 
            {name: 'Mayotte', code: 'YT'}, 
            {name: 'Mexico', code: 'MX'}, 
            {name: 'Micronesia, Federated States of', code: 'FM'}, 
            {name: 'Moldova, Republic of', code: 'MD'}, 
            {name: 'Monaco', code: 'MC'}, 
            {name: 'Mongolia', code: 'MN'}, 
            {name: 'Montserrat', code: 'MS'}, 
            {name: 'Morocco', code: 'MA'}, 
            {name: 'Mozambique', code: 'MZ'}, 
            {name: 'Myanmar', code: 'MM'}, 
            {name: 'Namibia', code: 'NA'}, 
            {name: 'Nauru', code: 'NR'}, 
            {name: 'Nepal', code: 'NP'}, 
            {name: 'Netherlands', code: 'NL'}, 
            {name: 'Netherlands Antilles', code: 'AN'}, 
            {name: 'New Caledonia', code: 'NC'}, 
            {name: 'New Zealand', code: 'NZ'}, 
            {name: 'Nicaragua', code: 'NI'}, 
            {name: 'Niger', code: 'NE'}, 
            {name: 'Nigeria', code: 'NG'}, 
            {name: 'Niue', code: 'NU'}, 
            {name: 'Norfolk Island', code: 'NF'}, 
            {name: 'Northern Mariana Islands', code: 'MP'}, 
            {name: 'Norway', code: 'NO'}, 
            {name: 'Oman', code: 'OM'}, 
            {name: 'Pakistan', code: 'PK'}, 
            {name: 'Palau', code: 'PW'}, 
            {name: 'Palestinian Territory, Occupied', code: 'PS'}, 
            {name: 'Panama', code: 'PA'}, 
            {name: 'Papua New Guinea', code: 'PG'}, 
            {name: 'Paraguay', code: 'PY'}, 
            {name: 'Peru', code: 'PE'}, 
            {name: 'Philippines', code: 'PH'}, 
            {name: 'Pitcairn', code: 'PN'}, 
            {name: 'Poland', code: 'PL'}, 
            {name: 'Portugal', code: 'PT'}, 
            {name: 'Puerto Rico', code: 'PR'}, 
            {name: 'Qatar', code: 'QA'}, 
            {name: 'Reunion', code: 'RE'}, 
            {name: 'Romania', code: 'RO'}, 
            {name: 'Russian Federation', code: 'RU'}, 
            {name: 'RWANDA', code: 'RW'}, 
            {name: 'Saint Helena', code: 'SH'}, 
            {name: 'Saint Kitts and Nevis', code: 'KN'}, 
            {name: 'Saint Lucia', code: 'LC'}, 
            {name: 'Saint Pierre and Miquelon', code: 'PM'}, 
            {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
            {name: 'Samoa', code: 'WS'}, 
            {name: 'San Marino', code: 'SM'}, 
            {name: 'Sao Tome and Principe', code: 'ST'}, 
            {name: 'Saudi Arabia', code: 'SA'}, 
            {name: 'Senegal', code: 'SN'}, 
            {name: 'Serbia and Montenegro', code: 'CS'}, 
            {name: 'Seychelles', code: 'SC'}, 
            {name: 'Sierra Leone', code: 'SL'}, 
            {name: 'Singapore', code: 'SG'}, 
            {name: 'Slovakia', code: 'SK'}, 
            {name: 'Slovenia', code: 'SI'}, 
            {name: 'Solomon Islands', code: 'SB'}, 
            {name: 'Somalia', code: 'SO'}, 
            {name: 'South Africa', code: 'ZA'}, 
            {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
            {name: 'Spain', code: 'ES'}, 
            {name: 'Sri Lanka', code: 'LK'}, 
            {name: 'Sudan', code: 'SD'}, 
            {name: 'Suriname', code: 'SR'}, 
            {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
            {name: 'Swaziland', code: 'SZ'}, 
            {name: 'Sweden', code: 'SE'}, 
            {name: 'Switzerland', code: 'CH'}, 
            {name: 'Syrian Arab Republic', code: 'SY'}, 
            {name: 'Taiwan, Province of China', code: 'TW'}, 
            {name: 'Tajikistan', code: 'TJ'}, 
            {name: 'Tanzania, United Republic of', code: 'TZ'}, 
            {name: 'Thailand', code: 'TH'}, 
            {name: 'Timor-Leste', code: 'TL'}, 
            {name: 'Togo', code: 'TG'}, 
            {name: 'Tokelau', code: 'TK'}, 
            {name: 'Tonga', code: 'TO'}, 
            {name: 'Trinidad and Tobago', code: 'TT'}, 
            {name: 'Tunisia', code: 'TN'}, 
            {name: 'Turkey', code: 'TR'}, 
            {name: 'Turkmenistan', code: 'TM'}, 
            {name: 'Turks and Caicos Islands', code: 'TC'}, 
            {name: 'Tuvalu', code: 'TV'}, 
            {name: 'Uganda', code: 'UG'}, 
            {name: 'Ukraine', code: 'UA'}, 
            {name: 'United Arab Emirates', code: 'AE'}, 
            {name: 'United Kingdom', code: 'GB'}, 
            {name: 'United States', code: 'US'}, 
            {name: 'United States Minor Outlying Islands', code: 'UM'}, 
            {name: 'Uruguay', code: 'UY'}, 
            {name: 'Uzbekistan', code: 'UZ'}, 
            {name: 'Vanuatu', code: 'VU'}, 
            {name: 'Venezuela', code: 'VE'}, 
            {name: 'Viet Nam', code: 'VN'}, 
            {name: 'Virgin Islands, British', code: 'VG'}, 
            {name: 'Virgin Islands, U.S.', code: 'VI'}, 
            {name: 'Wallis and Futuna', code: 'WF'}, 
            {name: 'Western Sahara', code: 'EH'}, 
            {name: 'Yemen', code: 'YE'}, 
            {name: 'Zambia', code: 'ZM'}, 
            {name: 'Zimbabwe', code: 'ZW'} 
          ],
        orders_data: [],
        Commande: [],
        Commandes: [],
        modes: ['single'],
        tablefields: [
          { key: 'Amount', label: 'Montant', sortable: true, },
          { key: 'Currency', label: 'Devise', sortable: true, },
          { key: 'DeliverTo', label: 'Livrer à', sortable: true, },
          { key: 'OrderID', label: "Pays", sortable: true, },
          { key: 'OrderNumber', label: 'N° commande', sortable: true, },
          { key: 'SalesOrderLines.length', label: 'N° produits commandés', sortable: true, },
        ],
        Commande_verif: {
            AccountName: null,
            AddressLine1: null,
            AddressLine2: null,
            City: null,
            CommandeName: null,
            Country: null,
            ZipCode: null,
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
      // Set the initial number of Commandes
      this.GetCommandes()
      this.totalRows = this.Commandes.length;
    },
    methods: {
      downloadFile() {
        axios({
            url: 'https://shopyscience.herokuapp.com/flow/orders_to_csv',
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');
          
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'commandes.csv');
            document.body.appendChild(fileLink);
          
            fileLink.click();
        });
      },
      convert_json() {
        this.orders_data.order = this.Commandes.OrderNumber
        this.orders_data.delivery_name = this.Commandes.Conact_Name
        this.orders_data.delivery_address = this.Commandes.OrderNumber
        this.orders_data.delivery_country = this.Commandes.OrderNumber
        this.orders_data.delivery_zipcode = this.Commandes.OrderNumber
        this.orders_data.delivery_city = this.Commandes.OrderNumber
        this.orders_data.items_count = this.Commandes.OrderNumber
        this.orders_data.item_index = this.Commandes.OrderNumber
        this.orders_data.item_id = this.Commandes.OrderNumber
        this.orders_data.item_quantity = this.Commandes.OrderNumber
        this.orders_data.line_price_excl_vat = this.Commandes.OrderNumber
        this.orders_data.line_price_incl_vat = this.Commandes.OrderNumber 
      },
      onTooltipSubmit(evt){
        evt.preventDefault();
        if(this.Commande.AccountName !== '') {
          this.Commande_verif.AccountName = true;
        } else {
          this.Commande_verif.AccountName = false;
        }
        if(this.Commande.AddressLine1 !== '') {
          this.Commande_verif.AddressLine1 = true;
        } else {
          this.Commande_verif.AddressLine1 = false;
        }
        if(this.Commande.AddressLine2 !== '') {
          this.Commande_verif.AddressLine2 = true;
        } else {
          this.Commande_verif.AddressLine2 = false;
        }
        if(this.Commande.City !== '') {
          this.Commande_verif.City = true;
        } else {
          this.Commande_verif.City = false;
        }
        if(this.Commande.CommandeName !== '') {
          this.Commande_verif.CommandeName = true;
        } else {
          this.Commande_verif.CommandeName = false;
        }
        if(this.Commande.Country !== '') {
          this.Commande_verif.Country = true;
        } else {
          this.Commande_verif.Country = false;
        }
        if(this.Commande.ZipCode !== '') {
          this.Commande_verif.ZipCode = true;
        } else {
          this.Commande_verif.ZipCode = false;
        }
      },
      HideEditModal() {
        this.$bvModal.hide('edit-modal')
      },
      HideDeleteModal() {
        this.$bvModal.hide('delete-modal')
      },
      async GetCommandes() {
        await axios.get('https://shopyscience.herokuapp.com/orders/', 
        {
          headers:{
            Authorization: `Token ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          this.Commandes = res.data
          this.totalRows = res.data.length
        })
      },
      async GetCommande() {
        await axios.get(`https://shopyscience.herokuapp.com/orders/${this.selected.OrderID}/`, 
        {
          headers:{
            Authorization: `Token ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          this.Commande = res.data
        })
      },
      async PutCommande() {
        await axios.put(`https://shopyscience.herokuapp.com/orders/${this.selected.OrderID}/`,this.Commande, 
        {
          headers:{
            Authorization: `Token ${localStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          this.$bvModal.hide('edit-modal')
        })
      },
      async DeleteCommande() {
        await axios.delete(`https://shopyscience.herokuapp.com/orders/${this.selected.OrderID}/`, 
        {
          headers:{
            Authorization: `Token ${localStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          this.$bvModal.hide('delete-modal')
          this.Commandes.splice(this.selected,1);

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
<style>
.mg-rg {
      margin-right: 20px;
    }
th, td {
  padding: 10px;
}
tr:hover {background-color: rgba(144, 221, 169, 0.445);}
tr:nth-child(even) {background-color: #f2f2f2;}
</style>