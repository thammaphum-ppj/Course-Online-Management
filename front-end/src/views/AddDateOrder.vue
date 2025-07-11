<template>
  <div class="p-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          text="Schedule a class" 
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card class="text-center mx-auto max-w-lg">
        <v-card-title class="justify-center text-lg font-bold">Schedule a class</v-card-title>
        <v-card-text>
          <div class="flex justify-center space-x-2">
            <v-text-field label="Start Date" required class="w-60"></v-text-field>
            <v-text-field label="End Date" required class="w-60"></v-text-field>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="justify-end">
          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
};
</script>

<style>
/* Additional Tailwind CSS classes can be added here if needed */
</style>
