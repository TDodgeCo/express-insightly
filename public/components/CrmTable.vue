<template>
  <div>
    <div v-if='loading'>
      <h1>Loading</h1>
    </div>
    <div v-else>
    <h3>Total Number of Rows: {{ rowCount }}</h3>
    <label for="rowStart">Rows Starting From</label>
    <input type="text" name="rowStart" v-model='rowStart'>
    <label for="rowEnd">Rows Ending At</label>
    <input type="text" name="rowEnd" v-model='rowEnd'>
    <button type="button" name="button" @click='setObjectTable()'>Update Table</button>
    <hr>
    <div v-if="objs.length > 0">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <div v-for="field in fieldMap">
              <td>{{ field.label }}</td>
            </div>
          </tr>
        </thead>
        <tr v-for="obj in objTable">
          <div v-for="field in obj">
            <td>{{ field.value }}</td>
          </div>
        </tr>
      </table>
    </div>
  </div>
  </div>
</template>

<script>
export default {
    props: ['settings'], // for child components
    data: {
      rowStart: 1,
      rowEnd: this.settings.rowCount,
      fieldMap: this.settings.fieldMap,
      objs: [],
      objTable: [],
      loading: true,
    },
    mounted: function() {
      this.getObjects();
      // this.getOpportunities();
    },
    computed: {
      rowCount(){
        return this.objs.length;
      },
    },
    methods: {
      getObjects: function() {
        axios.get(this.settings.endPoint).then(response => {
          this.objs = response.data
          if (response.data.length < this.rowEnd) {
              this.rowEnd = response.data.length;
          }
          this.setObjectTable()
        })
      },
      setObjectTable() {
        this.loading = true;
        var newObjTable = [];
        if (this.rowEnd > this.rowCount || this.rowStart >= this.rowEnd || this.rowEnd <= this.rowStart || this.rowStart >= this.rowCount) {
          this.loading = false;
          return this.errors();
        }
        for (var i = this.rowStart-1; i < numOfRows; i++) {
          var objSource = this.objs[i];
          var newObj = [];
          for (var x = 0; x < this.fieldMap.length; x++) {
            var field = {lable: this.fieldMap[x].label, value: ''};
            if (this.fieldMap[x].isStandard) {
              field.value = objSource[this.fieldMap[x].name];
            } else {
              for (var y = 0; y < objSource.CUSTOMFIELDS.length; y++) {
                if (objSource.CUSTOMFIELDS[y].CUSTOM_FIELD_ID == this.fieldMap[x].name) {
                  field.value = objSource.CUSTOMFIELDS[y].FIELD_VALUE;
                  break;
                }
              }
            }
            newObj.push(field);
          }
          newObjTable.push(newObj);
        }
        this.objTable = newObjTable;
        this.loading = false;
      },
      errors(){
        Window.alert('There was an error. Try not doing what you just did.');
        this.rowStart = 1;
        this.rowEnd = 10;
      }
    }
};
</script>
