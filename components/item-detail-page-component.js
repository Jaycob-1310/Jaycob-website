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

      <article v-else class="detail-layout">
        <div class="detail-visual">
          <img
            v-if="selectedItem.imageUrl"
            :src="selectedItem.imageUrl"
            :alt="selectedItem.name" />
          <div
            v-else
            class="h-100 d-flex align-items-center justify-content-center text-muted">
            No image available
          </div>
        </div>

        <div class="detail-content">
          <div class="d-flex align-items-center gap-2 mb-2">
            <h1 class="h3 mb-0">{{ selectedItem.name }}</h1>
            <span class="badge text-bg-primary">{{ selectedItem.category || 'General' }}</span>
          </div>

          <p class="lead mb-3">{{ selectedItem.description || 'No description available.' }}</p>

          <div class="info-grid">
            <div class="info-panel">
              <strong>When</strong>
              <div class="text-muted">{{ selectedItem.period || 'Unknown' }}</div>
            </div>
            <div class="info-panel">
              <strong>Location</strong>
              <div class="text-muted">{{ selectedItem.location || 'N/A' }}</div>
            </div>
            <div class="info-panel" v-if="selectedItem.howLived">
              <strong>How it lived</strong>
              <div class="text-muted">{{ selectedItem.howLived }}</div>
            </div>
            <div class="info-panel">
              <strong>Species ID</strong>
              <div class="text-muted">{{ selectedItem.id }}</div>
            </div>
          </div>
        </div>
      </article>
    </section>
  `,
};