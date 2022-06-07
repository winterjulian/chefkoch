<template>
  <div class="display-flex centralize-flex font-type padding-top-30-px">

    <div class="chefkoch-holder min-width-holder-px fade-in">
      <div class="padding-20-px">



        <!-- (1/4) title row  -->
        <div class="title-line-font-size padding-20-px">
          Aufgabe hinzufügen (Vorschau)
        </div>



        <!-- (2/4) img preview  -->
        <div class="display-flex">
          <div class="checkbox-container"></div>
          <TodoElement
              :name="newTodo.name"
              :description="newTodo.description"
              :date="new Date()"
              :image="newTodo.image"
              :isTemplate="true"
          ></TodoElement>
        </div>



        <!-- (3/4) input  -->
        <div>
          <div class="display-flex padding-top-10-px">
            <div class="checkbox-container"></div>
            <div class="width-100-percent">
              <div class="padding-top-10-px">
                Aufgabe
              </div>
              <div class="display-flex padding-top-10-px">
                <input v-model="newTodo.name" placeholder="Titel des Todos" class="basic-input-field width-100-percent"/>
              </div>
            </div>
          </div>
          <div class="display-flex padding-top-10-px">
            <div class="checkbox-container"></div>
            <div class="width-100-percent">
              <div class="padding-top-10-px">
                Beschreibung
              </div>
              <div class="display-flex padding-top-10-px">
                <input v-model="newTodo.description" placeholder="Beschreibung des Todos" class="basic-input-field width-100-percent"/>
              </div>
            </div>
          </div>
        </div>



        <!-- (4/4) buttons  -->
        <div class="display-flex justify-content-flex-end">
          <div class="checkbox-container"></div>
          <div class="display-flex flex-1 button-group-padding">
            <!-- upload button customisation  -->
            <input type="file" id="upload" @change="uploadImage($event)" hidden/>
            <label class="basic-label basic-button-border-radius basic-border-none font-color-white background-color-raspberry" for="upload">
              Bild hochladen
            </label>

          </div>
          <div class="button-group-padding">
            <ButtonGroupElement
                first-button-text="Abbrechen"
                second-button-text="Speichern"
                @first-button-clicked="navigateToMainPage()"
                @second-button-clicked="saveNewTodo()"
            >
            </ButtonGroupElement>
          </div>
        </div>



      </div>
    </div>

  </div>
</template>

<script>
import TodoElement from '../elements/TodoElement'
import ButtonGroupElement from '../elements/ButtonGroupElement'
import axios from "axios";

export default {
  name: "AddPage",
  components: {
    TodoElement, ButtonGroupElement
  },
  data() {
    return {
      newTodo: {
        name: 'Mein neues Todo',
        description: '',
        date: new Date(),
        image: null,
        checked: false,
      }
    }
  },
  methods: {

    uploadImage(e) {
      /**
       * Uploads the image in the previewer
       */
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
        this.newTodo.image = e.target.result;
      };
    },

    async saveNewTodo() {
      try {
        await axios.post('http://localhost:3000/todos', this.newTodo
        ).then(() =>
          {
            this.navigateToMainPage();
          }
        ).catch(error => { console.log(error) });
      } catch {
        console.log('Saving of a new todo failed')
      }
    },

    navigateToMainPage() {
      window.location.hash = '/';
    }


  }
}
</script>

<style scoped>
@import '../../global.css';

.basic-label {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0px 10px 0px 10px;
}
</style>
