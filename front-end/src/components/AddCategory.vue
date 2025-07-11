<template>
  <div class="pa-4 text-center drop-shadow-lg">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="bg-sky-600 text-white hover:bg-sky-700"
          text="Add Category"
          variant=""
          v-bind="activatorProps"
          @click="clearForm"
        ></v-btn>
      </template>

      <v-card title="Add Category" class="items-center">
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
  }),
  methods: {
    async saveCategory() {
      const trimmedName = this.name.trim();

      if (!trimmedName) {
        this.dialog = false;
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

      try {
        await this.$store.dispatch("category/names", payload);
        this.dialog = false;
        this.name = "";
      } catch (error) {
        console.error("Error saving category:", error);
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to save category. Please try again.",
        });
      }
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

<style scoped></style>
