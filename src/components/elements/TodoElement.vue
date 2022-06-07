<template>
  <div>
    <div v-on:click="clickedTodo()" :class="{ 'todo-frame-hover': !isTemplate }" class="todo-frame">

      <div class="todo-image-holder">

        <template v-if="image">
          <img v-if="image" class="todo-image todo-image-holder" :src="image">
        </template>
        <template v-if="!image">
          <div class="todo-image todo-image-holder todo-image-no-image display-flex centralize-flex"><i class="fa fa-question-circle"></i></div>
        </template>

      </div>

      <div class="todo-meta-holder display-flex">
        <div class="todo-meta-wrapper display-flex width-100-percent">

          <div class="display-flex flex-direction-col height-100-percent width-100-percent">

            <div class="display-flex justify-content-flex-end font-size-14-px"><DateElement :date="date"></DateElement></div>

            <div class="display-flex height-100-percent">
              <template v-if="!edit">
                <div class="flex-4 display-flex flex-direction-col font-size-18-px">
                  <div class="font-weight-bold">{{ name }}</div>
                  <div class="padding-top-10-px">{{ description }}</div>
                </div>
                <div class="display-flex flex-direction-col justify-content-flex-end">
                  <button v-if="!isTemplate" v-on:click="switchEdit()" :disabled="isDisabled" class="basic-round-button basic-round-button-size-small"><i class="fa fa-pencil"></i></button>
                </div>
              </template>
              <template v-if="edit">
                <div class="flex-4 display-flex flex-direction-col">
                  <div>
                    <input :value="name" class="basic-input-field-small" @input="storeInput($event, 'name')" placeholder="Todo" />
                  </div>
                  <div class="padding-top-5-px">
                    <input :value="description" class="basic-input-field-small" @input="storeInput($event, 'description')" placeholder="Todo" /><br>
                  </div>
                </div>
                <div class="display-flex flex-direction-col justify-content-flex-end justify-content-space-between padding-left-20-px">
                  <button v-on:click="switchEdit(); saveChanges()" class="basic-round-button basic-round-button-size-small button-color-green">
                    <i class="fa fa-check"></i>
                  </button>
                  <button v-on:click="switchEdit()" class="basic-round-button basic-round-button-size-small button-color-red">
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </template>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import DateElement from "./DateElement";

export default {
  name: "TodoElement",
  components: {
    DateElement
  },
  props: {
    id: { type: Number, required: false },
    name: { type: String, required: false },
    description: { type: String, required: false },
    date: { type: Date, required: false },
    image: { type: String, required: false },
    checked: { type: Boolean, required: false },
    isTemplate: { type: Boolean, required: false },
    isDisabled: { type: Boolean, required: false }
  },
  data() {
    return {
      edit: false,
      displayDate: '',
      tempEditData: {}
    }
  },
  methods: {
    switchEdit() {
      this.edit = !this.edit;
    },

    storeInput(e, target) {
      this.tempEditData[target] = e.target.value;
    },

    saveChanges() {
      console.log(this.date.constructor.name);

      this.patchData(this.tempEditData)
    },

    clickedTodo() {
      if (!this.isDisabled) {
        this.$emit("clicked-todo");
      }
    },

    async patchData(data) {
      try {
        await axios.patch(`${`http://localhost:3000/todos`}/${this.id}`, data
        ).then(response => {
          this.$emit("updated-todo", response.data);
        });
      } catch (error) {
        console.error(error);
      }
    },

    testFunc(inp) {
      console.log(inp);
    }
  }
}
</script>

<style scoped>
@import '../../global.css';

.todo-frame {
  display: flex;
  flex-direction: row;
  width: max-content;
  background-color: white;
  border-radius: 16px 16px 16px 16px;
}

.todo-frame-hover:hover {
  background-color: #add1ff; /* #0075ff */
}

.todo-image-holder {
  width: 180px;
  height: 120px;
  border-radius: 16px 0px 0px 16px;
}

.todo-image {
  object-fit: cover;
}

.todo-meta-holder {
  width: 350px;
  height: 120px;
  font-size: 10px;
  border-radius: 0px 16px 16px 0px;
}

.todo-meta-wrapper {
  padding: 16px 24px 24px;
  align-items: center;
}
</style>
