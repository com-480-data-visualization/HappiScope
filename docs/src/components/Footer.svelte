<script>
  const currentYear = new Date().getFullYear();
</script>

<footer>
  <div class="footer-container">
    <div class="footer-section">
      <h3>HappiScope</h3>
      <p>Interactive visualization of global happiness metrics</p>
      <p class="small">COM-480 Data Visualization - EPFL</p>
    </div>
    
    <div class="footer-section">
      <h3>Data Sources</h3>
      <ul>
        <li><a href="https://worldhappiness.report/" target="_blank" rel="noopener">World Happiness Report</a></li>
        <li><a href="https://hdr.undp.org/data-center/human-development-index" target="_blank" rel="noopener">Human Development Index (HDI)</a></li>
        <li><a href="https://population.un.org/wpp/" target="_blank" rel="noopener">World Population Prospects</a></li>
      </ul>
    </div>
    
    <div class="footer-section">
      <h3>Team</h3>
      <ul>
        <li>Chang Jin</li>
        <li>Rizhong Lin</li>
        <li>Anlan Wang</li>
      </ul>
    </div>
    
    <div class="footer-section">
      <h3>Resources</h3>
      <ul>
        <li><a href="https://github.com/yourusername/HappiScope" target="_blank" rel="noopener">GitHub Repository</a></li>
        <li><a href="https://svelte.dev" target="_blank" rel="noopener">Svelte</a></li>
        <li><a href="https://d3js.org" target="_blank" rel="noopener">D3.js</a></li>
      </ul>
    </div>
  </div>
  
  <div class="copyright">
    <p>© {currentYear} HappiScope Project | <a href="/about">About</a> | <a href="/methodology">Methodology</a></p>
  </div>
</footer>

<style>
  footer {
    background-color: #1e293b;
    color: #e2e8f0;
    padding: 2rem 0 1rem;
    margin-top: 2rem;
  }
  
  .footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .footer-section {
    flex: 1;
    min-width: 200px;
    margin-bottom: 1.5rem;
    padding-right: 2rem;
  }
  
  h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: #3b82f6;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: #e2e8f0;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  a:hover {
    color: #3b82f6;
  }
  
  .small {
    font-size: 0.8rem;
    color: #94a3b8;
  }
  
  .copyright {
    text-align: center;
    padding-top: 1.5rem;
    margin-top: 1.5rem;
    border-top: 1px solid #334155;
    font-size: 0.85rem;
  }
  
  @media (max-width: 768px) {
    .footer-container {
      flex-direction: column;
    }
    
    .footer-section {
      padding-right: 0;
    }
  }
</style>