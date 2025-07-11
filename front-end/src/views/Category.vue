<template>
  <div class="container px-8 mt-8">
    <div class="head-course">
      <h1>Manage Category</h1>
    </div>
    <div class="add-category-btn">
      <AddCategory />
    </div>

    <EditCategory v-if="isEditCategory" :isEditCategory="isEditCategory" :selectCategory="selectCategory"
      :onCloseEdit="onCloseEdit" />

    <v-data-table-virtual :headers="headers" :items="names" height="467" item-value="name">
      <template v-slot:[`item.no`]="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:[`item.createdAt`]="{ item }">
        <p>{{ formatDate(item.createdAt) }}</p>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div class="flex justify-center items-center">
          <v-btn class="mr-2" color="blue" @click="updateCategory(item)">Edit</v-btn>
          <v-btn color="warning" @click="deleteCategory(item.id)">Delete</v-btn>
        </div>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddCategory from "../components/AddCategory.vue";
import category from "@/store/modules/category";
import EditCategory from "../components/EditCategory.vue";
import Swal from "sweetalert2";
import { formatDate } from "@/constants/formatdate";

export default {
  components: {
    AddCategory,
    EditCategory,
  },
  data() {
    return {
      headers: [
        { title: "No.", align: "center", value: "no", sortable: true },
        {
          title: "CreateAt",
          align: "center",
          value: "createdAt",
          sortable: true,
        },
        { title: "Category Name", align: "center", value: "name", sortable: true },
        { title: "Actions", align: "center", value: "actions", sortable: true },

      ],
      categorys: [],
      isEditCategory: false,
      selectCategory: {},
    };
  },
  computed: {
    ...mapState({
      names: (state) => state.category.names.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    }),
  },
  watch: {
    names(newVal) {
      return newVal;
    },
  },
  async mounted() {
    this.getData();
  },
  methods: {
    formatDate,
    async getData() {
      const payload = {
        category: true,
      };
      await this.$store.dispatch("category/getCategory", payload);
      this.categorys = this.names.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    async deleteCategory(categoryId) {
      Swal.fire({
        title: "Do you want to delete it?",
        text: "Once deleted, it cannot be edited again.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm deletion",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$store.dispatch("category/deleteCategory", categoryId);
        }
      });
    },
    async updateCategory(item) {
      this.isEditCategory = true;
      this.selectCategory = item;
    },
    onCloseEdit(isClose) {
      this.isEditCategory = false;
    },

  },

};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
}

.head-course {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.head-course h1 {
  font-size: 30px;
  color: rgb(11, 94, 188);
  border-bottom: 1px solid #d9d9d9;
  font-style: italic;
  width: 100%;
  margin-bottom: 16px;
}

.add-category-btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  width: 100%;
}

.v-data-table-virtual {
  width: 100%;
}
</style>
