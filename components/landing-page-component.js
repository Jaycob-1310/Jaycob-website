export default {
  name: 'landing-page-component',
  template: /* html */ `
    <section class="page-shell">
      <h1 class="display-5 fw-bold mb-3">Extinct Species Database</h1>
      <div class="intro-box mb-3">
        <p class="lead mb-3">
          Explore animals that lived long ago and learn why, what, when, where, and how they survived in their time.
        </p>
        <div class="d-flex flex-wrap gap-2">
          <router-link to="/items" class="btn btn-primary">
            <i class="bi bi-list-check me-1"></i>Explore species
          </router-link>
          <router-link to="/about" class="btn btn-outline-primary">
            <i class="bi bi-info-circle me-1"></i>Learn about the app
          </router-link>
        </div>
      </div>
      <div class="hero-panel">
        <div class="hero-card-header mb-3">
          <h2 class="h5 mb-0">Featured Species</h2>
        </div>

        <div class="hero-title-card mb-3">
          <h3 class="h5 mb-2">Ankylosaurus</h3>
          <p class="mb-0 text-muted">A heavily armored herbivore from the Late Cretaceous period.</p>
        </div>

        <div class="hero-content">
          <div class="hero-card hero-image-card">
            <img
              src="assets/Screenshot (1).png"
              alt="Illustration of prehistoric life"
              class="hero-image" />
          </div>

          <div class="hero-side-stack">
            <div class="hero-side-card">
              <h3 class="h6 mb-2">Information</h3>
              <p class="mb-0 text-muted">Late Cretaceous, North America, Ankylosaurid, Herbivore</p>
            </div>
            <div class="hero-side-card">
              <h3 class="h6 mb-2">Discovery</h3>
              <p class="mb-0 text-muted">Ankylosaurus was first discovered in 1906 by Peter Kaisen during an expedition from the American Museum of Natural History.</p>
            </div>
            <div class="hero-side-card">
              <h3 class="h6 mb-2">Palaeobiology</h3>
              <p class="mb-0 text-muted">Its rigid, fused skeleton and extensive bony armor made it one of the most defensively adapted dinosaurs of its time.</p>
            </div>
          </div>
        </div>

      </div>


    </section>
  `,
};