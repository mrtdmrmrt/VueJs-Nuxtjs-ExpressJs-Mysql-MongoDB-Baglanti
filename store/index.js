import Vuex from "vuex" 

const createStore = ()=>{
    return new Vuex.Store({
        state : {
            courses : []
        },
        mutations : {
            setCourses(state,courses){
                state.courses = courses
            }
        },
        actions : {
            //NuxtJs tarafından sayfa yenilendiğinde otamatiok olarak çağrılır
            //vuexContext bizim vuex içindeki verilere erişmemizi sağlar
            //this yerine geçer kendi içinde store u ..çok şeyi veriyor
            nuxtServerInit(vuexContext,context){
                return context.$axios.get("/mongodb-get-data")
                .then(response=>{
                    console.log(response.data.courses)
                    vuexContext.commit("setCourses",response.data.courses)
                })
            }
        },
        getters : {
            getCourses(state){
                return state.courses
            }
        }
    })
}


export default createStore