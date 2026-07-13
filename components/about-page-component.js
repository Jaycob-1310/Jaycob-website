export default {
  name: 'about-page-component',
  template: /* html */ `
    <section class="page-shell">
      <h1 class="display-5 fw-bold mb-3">About Me</h1>
      <div class="hero-panel" style="max-width: 1100px; margin: auto;">
        <div class="hero-card-header mb-3">
          <h2 class="h5 mb-0">Jaycob Smith</h2>
        </div>
        <div class="hero-content">
          <div class="hero-card hero-image-card" style="max-width: 200px;">
            <img
              src="assets/Jaycob-photo.png"
              alt="Photo of Jaycob Smith"
              class="hero-image" style="max-width: 100%; height: auto; border-radius: 8px;" />
          </div>

          <div class="hero-side-stack">
            <div class="hero-side-stack" style="flex-wrap: wrap; gap: 1rem;">
              <div class="hero-side-card" style="flex: 1 1 100%; min-width: 200px;">
                <h3 class="h6 mb-2">Academics</h3>
                <p class="mb-0 text-muted" style="word-wrap: break-word; width: 100%;">I am currently a Junior at Anderson High School and I am also valedictorian with a GPA of 4.508. I aim to go to Purdue in West Lafayette for Computer Engineering and Programming.</p>
              </div>
              <div class="hero-side-card" style="flex: 1 1 100%; min-width: 200px;">
                <h3 class="h6 mb-2">Projects</h3>
                <p class="mb-0 text-muted" style="word-wrap: break-word; width: 100%;">I have worked on a Podcast for Interact to inform people about racism and homelessness. I also have planned multiple events for Student Council including Homecoming, Graduation, and the Fall Carnival. I am currently working on a website for Nextech as well.</p>
              </div>
              <div class="hero-side-card" style="flex: 1 1 100%; min-width: 200px;">
                <h3 class="h6 mb-2">Contact Information</h3>
                <p class="mb-0 text-muted" style="word-wrap: break-word; width: 100%;">Phone Number: 765-722-0729 | Email: jaycob1310@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    `,
};
