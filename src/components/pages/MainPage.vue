<template>
  <div class="display-flex centralize-flex font-type padding-top-30-px">


    <div class="chefkoch-holder min-width-holder-px fade-in">
      <div class="padding-20-px">

        <!-- (1/3) title -->
        <div class="title-line-font-size padding-20-px">Übersicht</div>

        <!-- (2/3) main part -->
        <div>
          <div v-if="!todos" class="display-flex centralize-flex">
            <LoadingElement></LoadingElement>
          </div>

          <template v-for="(todo, index) in todos" :key="todo.id">
            <div class="display-flex padding-top-10-px fade-in" :class="{'opacity-05': isDeleting}">

              <div class="display-flex centralize-flex checkbox-container">
                <input
                    v-model="todo.chosen"
                    class="check-box-size-large"
                    type="checkbox"
                    :id="'box' + index">
              </div>
              <div>
                <TodoElement
                    :id="todo.id"
                    :name="todo.name"
                    :description="todo.description"
                    :date="todo.date"
                    :image="todo.image"
                    :checked="todo.checked"
                    :isDisabled="isDeleting"
                    :isTemplate="false"
                    @clicked-todo="this.clickedTodo($event, index)"
                    @updated-todo="this.updateTodo($event, index)"
                >
                </TodoElement>
              </div>

            </div>
          </template>
        </div>

        <!-- (3/3) button part -->
        <div v-if="!isDeleting" class="display-flex">

          <div class="checkbox-container"></div>
          <div class="button-group-padding display-flex justify-content-space-between width-100-percent">
            <div>
              <button v-on:click="navigateToAddPage()" :disabled='isDeleting' class="basic-round-button basic-round-button-size-medium background-color-blue"><i style="font-size: 25px; color: white;" class="fa fa-plus"></i></button>
            </div>
            <div>
              <ButtonGroupElement
                  :first-button-text="'Erledigt'"
                  :second-button-text="'Löschen'"
                  :is-disabled="isDeleting"
                  @first-button-clicked="setTodosAsChecked()"
                  @second-button-clicked="deleteAllChosenTodos()"
              >
              </ButtonGroupElement>
            </div>
          </div>

        </div>
        <div v-if="isDeleting" class="display-flex centralize-flex width-100-percent">
          <LoadingElement :size="'small'"></LoadingElement>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import TodoElement from '../elements/TodoElement'
import ButtonGroupElement from '../elements/ButtonGroupElement'
import LoadingElement from "@/components/elements/LoadingElement";
import axios from "axios";

export default {
  name: "MainPage",
  components: {
    LoadingElement,
    TodoElement,
    ButtonGroupElement
  },
  data() {
    return {
      todos: null,
      isDeleting: false
    }
  },

  created() {
    this.loadData();
  },

  methods: {

    loadData() {
      axios.get("http://localhost:3000/todos"
      ).then(response => {
        response.data.forEach(todo => {
          this.convertDate(todo);
          this.addChosen(todo);
        })
        this.todos = response.data;
      }).catch(error => { console.log(error) })
    },

    convertDate(todo) {
      /**
       * Converts string from json into valid date object
       */
      try {
        todo.date = new Date(todo.date);
      } catch {
        console.log('Failed to create date out of ' + todo.date);
      }
    },

    addChosen(todo) {
      /**
       * Adds the chosen property to to-do object
       */
      todo['chosen'] = false;
    },

    updateTodo(todo, index) {
      /**
       * Updating to-do after child comp has received positive feedback
       * Date is string, convert to valid date object
       */
      this.convertDate(todo);
      this.todos[index] = todo;
    },

    clickedTodo(todo, index) {
      this.todos[index].chosen=!this.todos[index].chosen;
    },

    setTodosAsChecked() {
      /**
       * Collects all chosen todos and prepares them for marked as checked
       */
      let updateChainTodos = [];
      this.todos.forEach(todo => {
        if (todo.chosen) { updateChainTodos.push(todo) }
      })

      this.updateCascade(updateChainTodos, 0)
    },

    async updateCascade(todos, index) {
      if (index < todos.length) {
        axios.patch(`${`http://localhost:3000/todos/check`}/${todos[index].id}`, // changed to /todos/check/:id following instructions
            { checked: true }
        ).then(response => {
          todos[index].checked = response.data.checked;
        }).catch(error => { console.log(error) }
        ).finally(() => {
          this.updateCascade(todos, index+1)
        })
      }
    },

    deleteAllChosenTodos() {
      /**
       * Collects all chosen todos and prepares them for deletion
       */
      this.isDeleting = true;
      let deleteChainTodos = [];

      this.todos.forEach(todo => {
        if (todo.chosen) {
          deleteChainTodos.push(todo);
        }
      })

      this.deleteCascade(deleteChainTodos, 0)
    },

    async deleteCascade(todos, index) {
      if (index < todos.length) {
        axios.delete(`${`http://localhost:3000/todos`}/${todos[index].id}`
        ).catch(error => { console.log(error) }
        ).finally(() => {
          this.deleteCascade(todos, index+1)
        })
      } else {
        this.isDeleting = false;
        this.loadData();
      }
    },

    navigateToAddPage() {
      window.location.hash = '/add';
    }
  }


}
</script>

<style scoped>
@import '../../global.css';
</style>
