<template>
    <div>
        <Breadcrumbs main="" title="Contacts"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                      <h5>Liste Des Contacts</h5>
                    </div>

                    <div class="card-body">
                      <b-row>
                      <b-col xl="6" class="delete-datatable">
                        <div v-if="selected == null">
                          <b-button disabled v-b-modal.delete-modal variant="danger" @click="GetContact" class="mb-3">Supprimer</b-button>
                          <b-button disabled v-b-modal.edit-modal variant="primary" class="ml-4 mb-3" @click="GetContact">Modifier</b-button>
                        </div>
                        <div v-else>
                          <b-button v-b-modal.delete-modal variant="danger" @click="GetContact" class="mb-3">Supprimer</b-button>
                          <b-button v-b-modal.edit-modal variant="primary" class="ml-4 mb-3" @click="GetContact">Modifier</b-button>
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
                                    <download-csv :data="Contacts">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="secondary"
                class="btn-icon mr-1"
              >
                <i class="fas fa-file-csv fa-lg" />
              </b-button></download-csv>
                        <b-form-group label-cols="4" class="datatable-select mt-3">
                          <b-button to="/ajouter-Contact" variant="primary">Ajouter</b-button>
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
                          :items="Contacts"
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
        <b-modal id="edit-modal" size="lg" title="Détails de Contact" hide-footer class="theme-modal">
          <px-card :actions="false">
                  <div class="needs-validation" >
                      <div class="form-row">
                        <div class="form-row">
                            <div class="col-md-3 mb-3">
                                <label for="Contact">Nom Compte</label>
                                <b-form-input type="text" id="Contact" v-model="Contact.AccountName" :state="Contact_verif.AccountName"></b-form-input>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="Contact">Adresse 1</label>
                                <b-form-input type="text" id="Contact" v-model="Contact.AddressLine1" :state="Contact_verif.AddressLine1"></b-form-input>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="Contact">Adresse 2</label>
                                <b-form-input type="text" id="Contact" v-model="Contact.AddressLine2" :state="Contact_verif.AddressLine2"></b-form-input>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="Contact">Pays</label>
                                  <b-form-select type="text" id="contact" v-model="Contact.Country" :state="Contact_verif.Country">
                                    <option v-for="country in countries" :key="country.code"  :value="`${country.code}`">{{country.code}}</option>
                                  </b-form-select>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="Contact">Nom & Prénom</label>
                                <b-form-input type="text" id="Contact" v-model="Contact.ContactName" :state="Contact_verif.ContactName"></b-form-input>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="Contact">Ville</label>
                                <b-form-input type="text" id="Contact" v-model="Contact.City" :state="Contact_verif.City"></b-form-input>
                            </div>
                            <div class="col-md-2 mb-3">
                                <label for="Contact">Code Postal</label>
                                <b-form-input type="number" id="Contact" v-model="Contact.ZipCode" :state="Contact_verif.ZipCode"></b-form-input>
                            </div>
                        </div>
                      </div>
                      <b-button @click.prevent="onTooltipSubmit" @click="PutContact" variant="primary">Modifier</b-button>
                      <b-button @click="HideEditModal" class="ml-3" variant="warning">Annuler</b-button>
                  </div>
          </px-card>
        </b-modal>
        <b-modal id="delete-modal" title="Suppression de Contact" hide-footer class="theme-modal">
          <px-card :actions="false">
                  <div class="needs-validation" >
                      <div class="form-row">
                          <div class="col-md-8 mb-3">
                              <h5> Voulez vous supprimer  <b>{{Contact.AccountName}}</b>?</h5>
                          </div>
                      </div>
                      <b-button @click="DeleteContact" variant="danger">Supprimer</b-button>
                      <b-button @click="HideDeleteModal" class="ml-3" variant="primary">Annuler</b-button>
                  </div>
          </px-card>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'

  export default {
    components: {
    },

    data(){
      return{
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
            {name: 'Holy See (Vatican ContactName State)', code: 'VA'}, 
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
        Contacts: [],
        Contact: [],
        modes: ['single'],
        tablefields: [
          { key: 'AccountName', label: 'Nom Compte', sortable: true, },
          { key: 'AddressLine1', label: 'Adresse 1', sortable: true, },
          { key: 'AddressLine2', label: 'Adresse 2', sortable: true, },
          { key: 'Country', label: "Pays", sortable: true, },
          { key: 'ContactName', label: 'Nom & Prénom', sortable: true, },
          { key: 'City', label: 'Ville', sortable: true, },
          { key: 'ZipCode', label: "Code Postal", sortable: true, },
        ],
        Contact_verif: {
            AccountName: null,
            AddressLine1: null,
            AddressLine2: null,
            City: null,
            ContactName: null,
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
      // Set the initial number of Contacts
      this.GetContacts()
      this.totalRows = this.Contacts.length;
    },
    methods: {
      onTooltipSubmit(evt){
        evt.preventDefault();
        if(this.Contact.AccountName !== '') {
          this.Contact_verif.AccountName = true;
        } else {
          this.Contact_verif.AccountName = false;
        }
        if(this.Contact.AddressLine1 !== '') {
          this.Contact_verif.AddressLine1 = true;
        } else {
          this.Contact_verif.AddressLine1 = false;
        }
        if(this.Contact.AddressLine2 !== '') {
          this.Contact_verif.AddressLine2 = true;
        } else {
          this.Contact_verif.AddressLine2 = false;
        }
        if(this.Contact.City !== '') {
          this.Contact_verif.City = true;
        } else {
          this.Contact_verif.City = false;
        }
        if(this.Contact.ContactName !== '') {
          this.Contact_verif.ContactName = true;
        } else {
          this.Contact_verif.ContactName = false;
        }
        if(this.Contact.Country !== '') {
          this.Contact_verif.Country = true;
        } else {
          this.Contact_verif.Country = false;
        }
        if(this.Contact.ZipCode !== '') {
          this.Contact_verif.ZipCode = true;
        } else {
          this.Contact_verif.ZipCode = false;
        }
      },
      HideEditModal() {
        this.$bvModal.hide('edit-modal')
      },
      HideDeleteModal() {
        this.$bvModal.hide('delete-modal')
      },
      async GetContacts() {
        await axios.get('https://shopyscience.herokuapp.com/contacts/', 
        {
          headers:{
            Authorization: `Token ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          this.Contacts = res.data
          this.totalRows = res.data.length
        })
      },
      async GetContact() {
        await axios.get(`https://shopyscience.herokuapp.com/contacts/${this.selected.ID}/`, 
        {
          headers:{
            Authorization: `Token ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          this.Contact = res.data
        })
      },
      async PutContact() {
        await axios.put(`https://shopyscience.herokuapp.com/contacts/${this.selected.ID}/`,this.Contact, 
        {
          headers:{
            Authorization: `Token ${localStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          this.$bvModal.hide('edit-modal')
        })
      },
      async DeleteContact() {
        await axios.delete(`https://shopyscience.herokuapp.com/contacts/${this.selected.ID}/`, 
        {
          headers:{
            Authorization: `Token ${localStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          this.$bvModal.hide('delete-modal')
          this.Contacts.splice(this.selected,1);

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