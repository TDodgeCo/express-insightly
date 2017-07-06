

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue',
    leads: []
  },
  computed: {
    getLeads: function() {
      axios.get('/contact')
      .then(function (response) {
        this.leads = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }
})

app.getLeads();
