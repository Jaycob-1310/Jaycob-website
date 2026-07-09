export default {
  name: 'map-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const router = VueRouter.useRouter();
    const route = VueRouter.useRoute();

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

    const storageKey = 'mapPinPositions';
    const mapPositions = Vue.reactive(loadSavedPositions());

    function loadSavedPositions() {
      try {
        return JSON.parse(localStorage.getItem(storageKey) || '{}');
      } catch (error) {
        return {};
      }
    }

    function getSavedPosition(item) {
      return mapPositions[item.id] || null;
    }

    function handleMarkerClick(point) {
      focusSpecies(point.item);
    }

    const getMapPositionFromGeo = (lat, lng) => {
      return { x: lng, y: lat };
    };

    const getFallbackPosition = (index) => {
      const fallbackOptions = [
        { x: 19, y: 42, label: 'North America' },
        { x: 29, y: 71, label: 'South America' },
        { x: 53, y: 58, label: 'Africa' },
        { x: 49, y: 35, label: 'Europe' },
        { x: 71, y: 40, label: 'Asia' },
        { x: 41, y: 46, label: 'Atlantic Ocean' },
        { x: 13, y: 56, label: 'Pacific Ocean' },
        { x: 54, y: 16, label: 'Arctic' },
        { x: 84, y: 78, label: 'Australia' },
        { x: 52, y: 95, label: 'Antarctica' },
      ];

      return fallbackOptions[index % fallbackOptions.length];
    };

    const getLocationPosition = (locationValue, fallbackIndex = 0) => {
      const normalized = String(locationValue || '').trim().toLowerCase();

      console.log('getLocationPosition called with:', locationValue, 'normalized:', normalized);

      if (!normalized) {
        const fallback = getFallbackPosition(fallbackIndex);
        console.log('No location provided, using fallback:', fallback);
        return fallback;
      }

      // Prioritize oceans and continents for label
      const oceanContinentLookup = {
        'atlantic ocean': { x: 41.0, y: 44.5, label: 'Atlantic Ocean' },
        'pacific ocean': { x: 12.4, y: 54.3, label: 'Pacific Ocean' },
        'arctic ocean': { x: 54.4, y: 15.0, label: 'Arctic Ocean' },
        'indian ocean': { x: 60.0, y: 50.0, label: 'Indian Ocean' },
        'southern ocean': { x: 50.0, y: 90.0, label: 'Southern Ocean' },
        'north america': { x: 20.4, y: 35.8, label: 'North America' },
        'south america': { x: 29.4, y: 67.8, label: 'South America' },
        'africa': { x: 54.4, y: 59.4, label: 'Africa' },
        'europe': { x: 49.6, y: 32.0, label: 'Europe' },
        'asia': { x: 70.8, y: 38.0, label: 'Asia' },
        'australia': { x: 84.2, y: 76.8, label: 'Australia' },
        'antarctica': { x: 52.2, y: 93.5, label: 'Antarctica' },
      };

      for (const key in oceanContinentLookup) {
        if (normalized.includes(key)) {
          console.log('Matched ocean/continent:', key, oceanContinentLookup[key]);
          return oceanContinentLookup[key];
        }
      }

      // Fallback to previous detailed locations
      const geoLookup = {
        'united states': { x: 20.4, y: 35.8, label: 'United States' },
        'north dakota': { x: 21.2, y: 28.0, label: 'North Dakota' },
        'montana': { x: 19.8, y: 26.0, label: 'Montana' },
        'colorado': { x: 22.5, y: 33.0, label: 'Colorado' },
        'south dakota': { x: 21.5, y: 30.6, label: 'South Dakota' },
        'wyoming': { x: 20.4, y: 29.2, label: 'Wyoming' },
        'kansas': { x: 24.4, y: 36.0, label: 'Kansas' },
        'egypt': { x: 53.8, y: 46.0, label: 'Egypt' },
        'northern africa': { x: 53.8, y: 46.0, label: 'Northern Africa' },
      };

      if (geoLookup[normalized]) {
        const geo = geoLookup[normalized];
        console.log('Matched geoLookup:', normalized, geo);
        return { x: geo.x, y: geo.y, label: geo.label };
      }

      // Fallback to generic continent or ocean if included
      if (normalized.includes('united states') || normalized.includes('usa')) {
        console.log('Matched generic United States to North America');
        return { x: 20.4, y: 38.9, label: 'North America' };
      }

      if (normalized.includes('north dakota')) {
        console.log('Matched generic North Dakota');
        return { x: 21.2, y: 32.4, label: 'North Dakota' };
      }

      if (normalized.includes('montana')) {
        console.log('Matched generic Montana');
        return { x: 19.8, y: 30.0, label: 'Montana' };
      }

      if (normalized.includes('colorado')) {
        console.log('Matched generic Colorado');
        return { x: 22.6, y: 36.2, label: 'Colorado' };
      }

      if (normalized.includes('south dakota')) {
        return { x: 21.2, y: 32.0, label: 'South Dakota' };
      }

      if (normalized.includes('wyoming')) {
        return { x: 20.6, y: 33.2, label: 'Wyoming' };
      }

      if (normalized.includes('kansas')) {
        return { x: 24.2, y: 38.2, label: 'Kansas' };
      }

      if (normalized.includes('egypt') || normalized.includes('northern africa') || normalized.includes('africa')) {
        return { x: 54.4, y: 49.0, label: 'Egypt' };
      }

      return getFallbackPosition(fallbackIndex);
    };

    const getSpeciesOverridePosition = (item) => {
      const savedPosition = getSavedPosition(item);
      if (savedPosition) {
        return savedPosition;
      }

      const idLookup = String(item.id || '').trim().toLowerCase();
      const nameLookup = String(item.name || '').trim().toLowerCase();

      const overrides = {
        'tyrannosaurs-rex': { x: 21.2, y: 28.0, label: 'North America' },
        'ankylosaurus-magniventris': { x: 19.8, y: 26.0, label: 'North America' },
        'stegosaurus-stenops': { x: 22.5, y: 33.0, label: 'North America' },
        'ceratops-horridus': { x: 21.5, y: 30.6, label: 'North America' },
        'brachiosaurus-altithorax': { x: 20.4, y: 29.2, label: 'North America' },
        'pteranodon-longiceps': { x: 24.4, y: 36.0, label: 'North America' },
        'spinosaurus-aegyptiacus': { x: 53.8, y: 46.0, label: 'Africa' },
      };

      return overrides[idLookup] || overrides[nameLookup] || null;
    };

    const getMapPointsForItem = (item, index) => {
      const speciesOverride = getSpeciesOverridePosition(item);
      if (speciesOverride) {
        return {
          id: item.id,
          item,
          label: speciesOverride.label || 'Unknown Location',
          x: speciesOverride.x,
          y: speciesOverride.y,
        };
      }

      const rawLocations = String(item.location || '')
        .split(/(?:,\s*|\s+and\s+)/)
        .map((part) => part.trim())
        .filter(Boolean);

      const primaryLocation = rawLocations[0] || 'Unknown';
      const position = getLocationPosition(primaryLocation, index);

      return {
        id: item.id,
        item,
        label: position.label || 'Unknown Location',
        x: position.x,
        y: position.y,
      };
    };

    const mapPoints = Vue.computed(() => {
      return filteredItems.value
        .map((item, index) => getMapPointsForItem(item, index))
        .filter((point) => point.item);
    });

    const selectedSpeciesId = Vue.computed(() => String(route.query.species || '').trim());

    const selectedItem = Vue.computed(() => {
      return filteredItems.value.find((item) => item.id === selectedSpeciesId.value) || null;
    });

    const focusSpecies = (item) => {
      router.replace({
        path: '/map',
        query: { species: item.id },
      });
    };

    const goToDetail = (item) => {
      router.push('/items/' + item.id);
    };

    return {
      itemsStore,
      filters,
      getUniqueValues,
      filteredItems,
      mapPoints,
      selectedItem,
      selectedSpeciesId,
      handleMarkerClick,
      focusSpecies,
      goToDetail,
    };
  },
  template: /* html */ `
    <section class="page-shell">
      <div class="intro-box mb-4">
        <div class="d-flex flex-column flex-md-row justify-content-between gap-2">
          <div>
            <span class="accent-pill"><i class="bi bi-geo-alt-fill"></i> Interactive fossil map</span>
            <h1 class="h3 mb-2">Explore where these extinct species lived</h1>
            <p class="mb-0 text-muted">Use the filters to narrow the species shown on the map, then click a marker to inspect that species in detail.</p>
          </div>
          <router-link to="/items" class="nav-pill nav-pill-outline"><i class="bi bi-arrow-left me-1"></i>Back to collection</router-link>
        </div>
      </div>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading map data...
      </div>

      <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else class="row g-4">
        <div class="col-12 col-lg-8">
          <div class="card map-page-card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h2 class="h5 mb-1">Species locations</h2>
                  <p class="text-muted small mb-0">The map updates with the active filters.</p>
                </div>
                <span class="badge text-bg-light border">{{ mapPoints.length }} markers</span>
              </div>

              <div class="row g-3 mb-3">
                <div class="col-12 col-md-6 col-lg-3">
                  <label class="form-label small">Search</label>
                  <input v-model="filters.search" type="text" class="form-control form-control-sm" placeholder="Name or description" />
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                  <label class="form-label small">Era</label>
                  <select v-model="filters.era" class="form-select form-select-sm">
                    <option value="">All Eras</option>
                    <option v-for="era in getUniqueValues('period')" :key="era" :value="era">{{ era }}</option>
                  </select>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                  <label class="form-label small">Location</label>
                  <select v-model="filters.location" class="form-select form-select-sm">
                    <option value="">All Locations</option>
                    <option v-for="location in getUniqueValues('location')" :key="location" :value="location">{{ location }}</option>
                  </select>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                  <label class="form-label small">Family</label>
                  <select v-model="filters.family" class="form-select form-select-sm">
                    <option value="">All Families</option>
                    <option v-for="family in getUniqueValues('family')" :key="family" :value="family">{{ family }}</option>
                  </select>
                </div>
              </div>

              <div class="row g-3 mb-3">
                <div class="col-12 col-md-6">
                  <label class="form-label small">Diet</label>
                  <select v-model="filters.diet" class="form-select form-select-sm">
                    <option value="">All Diets</option>
                    <option v-for="diet in getUniqueValues('diet')" :key="diet" :value="diet">{{ diet }}</option>
                  </select>
                </div>
                <div class="col-12 col-md-6 d-flex align-items-end">
                  <button @click="filters.era = ''; filters.location = ''; filters.family = ''; filters.diet = ''; filters.search = ''" class="btn btn-sm btn-outline-secondary w-100">
                    Clear filters
                  </button>
                </div>
              </div>

              <div class="map-shell">
                <img
                  src="https://th.bing.com/th/id/R.d10796d81579cd9f0aebf5fa3d07d635?rik=%2bLed0zWYhmbijw&riu=http%3a%2f%2fclipart-library.com%2fnew_gallery%2f356-3569105_globe-blank-transprent-world-map-white-background.png&ehk=%2fkdTR%2bNfPhZl%2bUn9SVLHLGhlhu8cIAaXJ%2fNpx8XRkx8%3d&risl=&pid=ImgRaw&r=0"
                  alt="World map"
                  class="map-image" />

                <button
                  v-for="point in mapPoints"
                  :key="point.id"
                  type="button"
                  class="map-marker"
                  :class="{
                    'map-marker-selected': point.item.id === selectedSpeciesId
                  }"
                  :style="{ left: point.x + '%', top: point.y + '%' }"
                  :title="point.item.name + ' · ' + (point.label || 'Unknown Location')"
                  @click="handleMarkerClick(point)">
                  <span class="map-marker-dot"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="card map-info-card border-0 shadow-sm">
            <div class="card-body">
              <h2 class="h6 mb-3">Selected species</h2>

              <div v-if="selectedItem" class="d-flex flex-column gap-3">
                <div>
                  <h3 class="h5 mb-1">{{ selectedItem.name }}</h3>
                  <p class="text-muted small mb-0">{{ selectedItem.description || 'No description available.' }}</p>
                </div>

                <div class="map-info-panel">
                  <p class="small mb-1"><strong>Location:</strong> {{ selectedItem.location || 'N/A' }}</p>
                  <p class="small mb-1"><strong>Era:</strong> {{ selectedItem.period || 'Unknown' }}</p>
                  <p class="small mb-0"><strong>Family:</strong> {{ selectedItem.family || 'N/A' }}</p>
                </div>

                <div class="d-grid gap-2">
                  <button class="btn btn-primary btn-sm" @click="goToDetail(selectedItem)">Open detail page</button>
                  <router-link to="/items" class="btn btn-outline-secondary btn-sm">Back to collection</router-link>
                </div>
              </div>

              <div v-else class="text-muted small">
                Click a marker on the map to highlight a species and read more about it here.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
};
