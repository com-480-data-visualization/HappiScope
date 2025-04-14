<script>
  import { Link } from "svelte-routing";

  let isMenuOpen = false;
  const toggleMenu = () => (isMenuOpen = !isMenuOpen);
  const closeMenu = () => (isMenuOpen = false);
</script>

<nav>
  <div class="nav-container">
    <div class="logo">
      <Link to="/" on:click={closeMenu}>
        <span class="logo-text">HappiScope</span>
        <span class="logo-icon">🌐</span>
      </Link>
    </div>

    <div
      class="menu-toggle"
      on:click={toggleMenu}
      on:keydown={(e) => e.key === "Enter" && toggleMenu()}
      tabindex="0"
      role="button"
      aria-label="Toggle navigation menu"
      aria-expanded={isMenuOpen}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="nav-links {isMenuOpen ? 'active' : ''}">
      <Link to="/" on:click={closeMenu}>Home</Link>
      <Link to="/explore" on:click={closeMenu}>Explore Data</Link>
      <Link to="/data" on:click={closeMenu}>Data Sources</Link>
      <Link to="/methodology" on:click={closeMenu}>Methodology</Link>
      <Link to="/about" on:click={closeMenu}>About</Link>
    </div>
  </div>
</nav>

<style>
  nav {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
  }

  .logo a {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: #3b82f6;
    text-decoration: none;
  }

  .logo-text {
    margin-right: 0.5rem;
  }

  .logo-icon {
    font-size: 1.25rem;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  .nav-links a {
    color: #4b5563;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
    font-size: 0.95rem;
  }

  .nav-links a:hover {
    color: #3b82f6;
  }

  .menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    cursor: pointer;
  }

  .menu-toggle span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: #4b5563;
    border-radius: 3px;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    .menu-toggle {
      display: flex;
    }

    .nav-links {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: #ffffff;
      flex-direction: column;
      padding: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: none;
    }

    .nav-links.active {
      display: flex;
    }

    .nav-links a {
      padding: 0.75rem 0;
    }
  }
</style>
