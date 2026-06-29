export default {
  name: 'landing-page-component',
  template: /* html */ `
    <section class="page-shell">
      <div class="hero-panel">
        <div class="hero-card-header mb-3">
          <h2 class="h5 mb-0">Featured Species</h2>
        </div>
        
        <div class="hero-card mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Ankylosaurus_magniventris_by_sphenaphinae.png/500px-Ankylosaurus_magniventris_by_sphenaphinae.png"
            alt="Illustration of prehistoric life"
            class="hero-image" />
          <div class="hero-card-body">
            <h3 class="h6 mb-1">Ankylosaurus</h3>
          </div>
        </div>

        <h1 class="display-5 fw-bold mb-3">Extinct Species Database</h1>
        <p class="lead mb-4">
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

      <div class="page-section">
        <div class="section-heading">
          <h2>Description</h2>
          <p class="text-muted mb-0">Ankylosaurus was a heavily armored herbivore that lived during the late Cretaceous period.</p>
        </div>

        <div class="row g-3">
          <div class="col-md-4">
            <article class="page-card">
              <h3 class="h6">Informaion</h3>
              <p class="mb-0 text-muted">Late Cretaceous, North America, Anklosaurid, Herbivore</p>
            </article>
          </div>
          <div class="col-md-4">
            <article class="page-card">
              <h3 class="h6">Discovery</h3>
              <p class="mb-0 text-muted">Ankylosaurus was first discovered in 1906 by Peter Kaisen, a member of an expedition from the American Museum of Natural History led by Barnum Brown. The fossils were found in the Hell Creek Formation near Gilbert Creek, Montana, USA</p>
            </article>
          </div>
          <div class="col-md-4">
            <article class="page-card">
              <h3 class="h6">Palaeobiology</h3>
              <p class="mb-0 text-muted">Ankylosaurus was a heavily armored, slow-moving herbivore whose rigid, fused skeleton and extensive bony armor made it one of the most defensively adapted dinosaurs of its time.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  `,
};