<script>
  import { Router, Route } from "svelte-routing";
  import { onMount } from "svelte";

  // Import pages/routes
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import Explore from "./routes/Explore.svelte";
  import DataDetails from "./routes/DataDetails.svelte";
  import Methodology from "./routes/Methodology.svelte";

  // Import components
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";

  // Import store initialization
  import {
    isLoading,
    dataLoadError,
    initializeAppData,
    initTheme,
  } from "./stores/appStore";

  // Determine base URL for GitHub Pages compatibility
  // Will use the repository name as the base path if needed
  export let url = "";
  const basePath = window.location.hostname.includes("github.io")
    ? "/HappiScope"
    : "";

  onMount(async () => {
    // Initialize theme
    initTheme();

    // Initialize app data
    try {
      await initializeAppData();
    } catch (error) {
      console.error("Failed to initialize app data:", error);
    }
  });
</script>

<Router {url} basepath={basePath}>
  <div class="app-container">
    <Navbar />

    <main class="content">
      {#if $isLoading}
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p>Loading HappiScope visualization...</p>
        </div>
      {:else if $dataLoadError}
        <div class="error-container">
          <h2>Error Loading Data</h2>
          <p>{$dataLoadError}</p>
          <button on:click={() => window.location.reload()}>Try Again</button>
        </div>
      {:else}
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/explore" component={Explore} />
        <Route path="/data" component={DataDetails} />
        <Route path="/methodology" component={Methodology} />
      {/if}
    </main>

    <Footer />
  </div>
</Router>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: "Inter", "Helvetica Neue", sans-serif;
    background-color: #f8f9fa;
    color: #343a40;
    overflow-x: hidden;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content {
    flex: 1;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70vh;
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-top-color: #3498db;
    border-radius: 50%;
    animation: spin 1s ease-in-out infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    .content {
      padding: 0.75rem;
    }
  }

  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70vh;
    text-align: center;
  }

  .error-container button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  .error-container button:hover {
    background-color: #2980b9;
  }
</style>
