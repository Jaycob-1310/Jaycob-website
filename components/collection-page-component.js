export default {
  name: 'collection-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    
    const filters = Vue.reactive({
      era: '',
      location: '',
      family: '',
      diet: '',
      search: '',
    });

    const getUniqueValues = (field) => {
      const values = itemsStore.items
        .map((item) => item[field])
        .filter((value) => value && value !== '');
      return [...new Set(values)].sort();
    };

    const filteredItems = Vue.computed(() => {
      return itemsStore.items.filter((item) => {
        const matchesEra = !filters.era || item.period === filters.era;
        const matchesLocation = !filters.location || item.location === filters.location;
        const matchesFamily = !filters.family || item.family === filters.family;
        const matchesDiet = !filters.diet || item.diet === filters.diet;
        const matchesSearch =
          !filters.search ||
          item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.description.toLowerCase().includes(filters.search.toLowerCase());

        return matchesEra && matchesLocation && matchesFamily && matchesDiet && matchesSearch;
      });
    });

    return {
      itemsStore,
      filters,
      getUniqueValues,
      filteredItems,
    };
  },
  template: /* html */ `
    <section class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="h3 mb-0">Collection</h1>
        <span class="badge text-bg-light border">{{ filteredItems.length }} shown</span>
      </div>

      <p class="text-muted mb-4">Browse and filter the collection by era, location, family, or diet.</p>

      <!-- Filters Section -->
      <div v-if="!itemsStore.isLoading" class="card mb-4 border-0 bg-light">
        <div class="card-body">
          <h2 class="h6 mb-3">Filter by:</h2>
          <div class="row g-3">
            <!-- Search Bar -->
            <div class="col-12 col-md-6 col-lg-2">
              <label class="form-label small">Search</label>
              <input
                v-model="filters.search"
                type="text"
                class="form-control form-control-sm"
                placeholder="Name or description" />
            </div>

            <!-- Era Filter -->
            <div class="col-12 col-md-6 col-lg-2">
              <label class="form-label small">Era</label>
              <select v-model="filters.era" class="form-select form-select-sm">
                <option value="">All Eras</option>
                <option v-for="era in getUniqueValues('period')" :key="era" :value="era">
                  {{ era }}
                </option>
              </select>
            </div>

            <!-- Location Filter -->
            <div class="col-12 col-md-6 col-lg-2">
              <label class="form-label small">Location</label>
              <select v-model="filters.location" class="form-select form-select-sm">
                <option value="">All Locations</option>
                <option v-for="location in getUniqueValues('location')" :key="location" :value="location">
                  {{ location }}
                </option>
              </select>
            </div>

            <!-- Family Filter -->
            <div class="col-12 col-md-6 col-lg-2">
              <label class="form-label small">Family</label>
              <select v-model="filters.family" class="form-select form-select-sm">
                <option value="">All Families</option>
                <option v-for="family in getUniqueValues('family')" :key="family" :value="family">
                  {{ family }}
                </option>
              </select>
            </div>

            <!-- Diet Filter -->
            <div class="col-12 col-md-6 col-lg-2">
              <label class="form-label small">Diet</label>
              <select v-model="filters.diet" class="form-select form-select-sm">
                <option value="">All Diets</option>
                <option v-for="diet in getUniqueValues('diet')" :key="diet" :value="diet">
                  {{ diet }}
                </option>
              </select>
            </div>

            <!-- Clear Filters Button -->
            <div class="col-12 col-lg-2 d-flex align-items-end">
              <button
                @click="filters.era = ''; filters.location = ''; filters.family = ''; filters.diet = ''; filters.search = ''"
                class="btn btn-sm btn-outline-secondary w-100">
                Clear filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading items...
      </div>

      <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="itemsStore.items.length === 0" class="alert alert-warning" role="alert">
        No items found in the dataset.
      </div>

      <div v-else-if="filteredItems.length === 0" class="alert alert-info" role="alert">
        No items match your filters. Try clearing some filters.
      </div>

      <div v-else class="row g-3">
        <div class="col-12 col-md-6 col-lg-4" v-for="item in filteredItems" :key="item.id">
          <article class="card h-100 shadow-sm border-0">
            <img
              v-if="item.imageUrl"
              :src="item.imageUrl"
              :alt="item.name"
              class="card-img-top collection-card-image object-fit-contain" />
            <div
              v-else
              class="collection-card-image d-flex align-items-center justify-content-center bg-light text-muted">
              No image available
            </div>

            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h2 class="h5 card-title mb-0">{{ item.name }}</h2>
                <span class="badge text-bg-primary ms-2">{{ item.category || 'General' }}</span>
              </div>

              <p class="card-text text-muted flex-grow-1 collection-description">
                {{ item.description || 'No description available.' }}
              </p>

              <p class="small mb-1"><strong>Era:</strong> {{ item.period || 'Unknown' }}</p>
              <p class="small mb-1"><strong>Location:</strong> {{ item.location || 'N/A' }}</p>
              <p class="small mb-1"><strong>Family:</strong> {{ item.family || 'N/A' }}</p>
              <p class="small mb-3"><strong>Diet:</strong> {{ item.diet || 'N/A' }}</p>

              <div class="d-grid">
                <router-link :to="'/items/' + item.id" class="btn btn-outline-secondary btn-sm">
                  View details
                </router-link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
};
