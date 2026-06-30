export default {
  name: 'item-detail-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const route = VueRouter.useRoute();

    const selectedItem = Vue.computed(() => {
      return itemsStore.items.find((item) => item.id === route.params.id);
    });

    return {
      itemsStore,
      selectedItem,
    };
  },
  template: /* html */ `
    <section class="page-shell">
      <router-link to="/items" class="btn btn-outline-primary btn-sm mb-3">
        <i class="bi bi-arrow-left me-1"></i>Back to collection
      </router-link>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading item details...
      </div>

      <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="!selectedItem" class="alert alert-warning" role="alert">
        Species not found.
      </div>

      <article v-else class="hero-panel">
        <div class="hero-card-header mb-3">
          <h2 class="h5 mb-0">{{ selectedItem.category || 'Species' }}</h2>
        </div>

        <div class="hero-title-card mb-3">
          <h1 class="h5 mb-2">{{ selectedItem.name }}</h1>
          <p class="mb-0 text-muted">{{ selectedItem.description || 'No description available.' }}</p>
        </div>

        <div class="hero-content">
          <div class="hero-card hero-image-card">
            <img
              v-if="selectedItem.imageUrl"
              :src="selectedItem.imageUrl"
              :alt="selectedItem.name"
              class="hero-image" />
            <div
              v-else
              class="hero-image d-flex align-items-center justify-content-center bg-light text-muted">
              No image available
            </div>
          </div>

          <div class="hero-side-stack">
            <div class="hero-side-card">
              <h3 class="h6 mb-2">Information</h3>
              <p class="mb-0 text-muted">{{ selectedItem.period || 'Unknown' }}, {{ selectedItem.location || 'N/A' }}, {{ selectedItem.family || 'N/A' }}, {{ selectedItem.diet || 'N/A' }}</p>
            </div>
            <div class="hero-side-card">
              <h3 class="h6 mb-2">Discovery</h3>
              <p class="mb-0 text-muted">{{ selectedItem.discoveryInfo || 'No discovery information available.' }}</p>
            </div>
            <div class="hero-side-card">
              <h3 class="h6 mb-2">Palaeobiology</h3>
              <p class="mb-0 text-muted">{{ selectedItem.palaeobiologyInfo || 'No palaeobiology information available.' }}</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  `,
};