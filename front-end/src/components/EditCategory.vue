<template>
  <div class="pa-4 text-center drop-shadow-lg">
    <v-dialog v-model="dialog" max-width="600">
      <v-card title="Edit Category" class="items-center">
        <div class="flex flex-col w-full px-12 mt-2">
          <label class="mb-2 text-gray-700">Category Name</label>
          <input
            type="text"
            class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
            v-model="name"
          />
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="#4A6FA5"
            text="Save"
            variant="tonal"
            @click="saveCategory"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data: () => ({
    dialog: false,
    name: "",
    formData: {},
  }),
  props: {
    isEditCategory: Boolean,
    onCloseEdit: Function,
    selectCategory: Object,
  },
  watch: {
    isEditCategory(newVal) {
      this.dialog = newVal;
    },
    dialog(newVal) {
      if (!newVal) {
        this.onCloseEdit(newVal);
      }
    },
  },
  mounted() {
    this.dialog = this.isEditCategory;
    this.name = this.selectCategory.name;
    console.log("selectCategory ", this.selectCategory);
  },
  methods: {
    async saveCategory() {
      const trimmedName = this.name.trim();
      
      if (!trimmedName) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Category name cannot be empty or just spaces!",
        });
        return;
      }

      const payload = {
        name: trimmedName,
      };

      await this.$store.dispatch("category/updateCategory", {
        categoryId: this.selectCategory.id,
        newData: payload,
      });

      this.dialog = false;
    },
    setData(item) {
      this.name = item.name;
      this.dialog = true;
    },
    clearForm() {
      this.name = "";
      this.dialog = true;
    },
  },
};
</script>

<style scoped>
.pa-4 {
  padding: 16px;
}
.text-center {
  text-align: center;
}
.drop-shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
</style>
