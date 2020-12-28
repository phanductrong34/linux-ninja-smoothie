<template>
      <div class="index container">
        <form>
          <div class="row">
            <div class="input-field col s6 offset-s3">
              <i class="material-icons prefix">search</i>
              <input type="text"  id="name" name="search" v-model="searchInput">
              <label for="name"></label>
              <i v-if="searchInput" @click="discardType()" class="material-icons prefix close-btn">close</i>
            </div>
          </div>

        </form>
        
        <div class="row" v-if="!searchInput">
          <div class="col s12 m4 l3" v-for="smoothie in smoothies" :key="smoothie.id">
            <div class="card small">
              <div class="card-content">
                <i class="material-icons delete right" @click="deleteSmoothie(smoothie.id)">delete</i>
                  <h2 class="indigo-text flow-text">{{smoothie.title}}</h2>
                  <ul class="ingredients">
                    <li v-for="(ing,index) in smoothie.ingredients" :key="index">
                      <span class="chip">{{ ing }}</span>
                    </li>
                  </ul>
              </div>
              <span class="btn-floating btn-large halfway-fab pink">
                <router-link :to="{ name: 'EditSmoothie', params:{smoothie_slug : smoothie.slug}}">
                  <i class="material-icons edit">edit</i>
                </router-link>
            </span>
            </div>
          </div>

        </div>

        <div class="row" v-if="searchInput && searchComputed">
            <div class="col s12 m4 l3" v-for="smoothie in searchComputed" :key="smoothie.id">
              <div class="card small">
                <div class="card-content">
                  <i class="material-icons delete right" @click="deleteSmoothie(smoothie.id)">delete</i>
                    <h2 class="indigo-text flow-text">{{smoothie.title}}</h2>
                    <ul class="ingredients">
                      <li v-for="(ing,index) in smoothie.ingredients" :key="index">
                        <span class="chip">{{ ing }}</span>
                      </li>
                    </ul>
                </div>
                <span class="btn-floating btn-large halfway-fab pink">
                  <router-link :to="{ name: 'EditSmoothie', params:{smoothie_slug : smoothie.slug}}">
                    <i class="material-icons edit">edit</i>
                  </router-link>
              </span>
              </div>
            </div>
        </div>

        <div class="row" v-if="searchInput && !searchComputed">
          <h2 class="center-align">Nothing Match...</h2>
        </div>
      </div>
</template>

<script>
import db from '@/firebase/init'
export default {
  name: 'Index',
  data () {
    return {
      smoothies: [],
      searchInput: null,
    }
  },
  methods:{
    deleteSmoothie(id){
        db.collection("smoothies").doc(id).delete()
          .then(()=>{
              this.smoothies = this.smoothies.filter(smoothie => {
                return smoothie.id != id;
              })
          })
    },
    discardType(){
      this.searchInput = null;
    }
  },
  watch:{

  },
  computed:{
    searchComputed(){
      let result = [];
      result = this.smoothies.filter(smoothie =>{
        return smoothie.title.toLowerCase().includes(this.searchInput.toLowerCase());
      })
      if(result.length == 0) return null;
      else return result
    }

  },
  created(){
    db.collection("smoothies").get()
      .then(snapshot =>{
        snapshot.forEach(doc =>{
          let smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        })
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .index{
    /* display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px; */
    margin-top: 60px;

  }

  .index card{
    box-sizing: border-box;
    /* padding: 0 20px */
  }

  .index h2{
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }
  .index .ingredients{
    margin: 30px auto;

  }
  .index .ingredients li{
    display: inline-block;
  }

  .index .delete{
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }
  .index .favorite{
    position: absolute;
    top: 4px;
    left: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }
  .index .close-btn{
    cursor: pointer;
  }
</style>
