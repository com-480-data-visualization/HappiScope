<script>
  import { Link } from "svelte-routing";
</script>

<div class="about-container">
  <section class="about-section">
    <h1>About HappiScope</h1>
    <p class="lead">
      HappiScope is an interactive data visualization project developed for the COM-480 Data Visualization 
      course at EPFL that explores global happiness metrics and their contributing factors.
    </p>
    
    <h2>Project Vision</h2>
    <p>
      In a world often focused on economic metrics alone, our visualization tools help users 
      understand the multidimensional nature of well-being and what truly contributes to societal happiness.
      Through interactive visualizations, we aim to make complex happiness data accessible and engaging
      for researchers, policymakers, educators, and the general public.
    </p>
  </section>
  
  <section class="about-section">
    <h2>Our Team</h2>
    <div class="team-grid">
      <div class="team-member">
        <div class="member-avatar">CJ</div>
        <h3>Chang Jin</h3>
        <p class="member-role">Data Processing & Visualization</p>
        <p>
          Responsible for happiness data processing and creating interactive visualizations using D3.js.
        </p>
      </div>
      
      <div class="team-member">
        <div class="member-avatar">RL</div>
        <h3>Rizhong Lin</h3>
        <p class="member-role">Frontend Development & UX Design</p>
        <p>
          Focused on building the website using Svelte and creating an intuitive user experience.
        </p>
      </div>
      
      <div class="team-member">
        <div class="member-avatar">AW</div>
        <h3>Anlan Wang</h3>
        <p class="member-role">Data Analysis & Research</p>
        <p>
          Led the research on happiness metrics and analysis of key trends and insights.
        </p>
      </div>
    </div>
  </section>
  
  <section class="about-section">
    <h2>Project Goals</h2>
    <p>
      HappiScope aims to address several key research questions through interactive visualization:
    </p>
    <ul class="goals-list">
      <li>
        <span class="goal-number">01</span>
        <div class="goal-content">
          <h3>Global Happiness Trends</h3>
          <p>Explore how global happiness has changed over the past decade (2015-2024), and identify regional patterns.</p>
        </div>
      </li>
      
      <li>
        <span class="goal-number">02</span>
        <div class="goal-content">
          <h3>Factor Analysis</h3>
          <p>Identify which factors correlate most strongly with happiness across different regions and income levels.</p>
        </div>
      </li>
      
      <li>
        <span class="goal-number">03</span>
        <div class="goal-content">
          <h3>Economic vs. Social Metrics</h3>
          <p>Compare economic metrics like GDP to social support metrics in predicting happiness.</p>
        </div>
      </li>
      
      <li>
        <span class="goal-number">04</span>
        <div class="goal-content">
          <h3>Impact Analysis</h3>
          <p>Analyze how socioeconomic shocks like the COVID-19 pandemic affected happiness trends globally.</p>
        </div>
      </li>
      
      <li>
        <span class="goal-number">05</span>
        <div class="goal-content">
          <h3>Comparative Analysis</h3>
          <p>Identify the most significant differences in happiness determinants between high- and low-income countries.</p>
        </div>
      </li>
    </ul>
  </section>
  
  <section class="about-section">
    <h2>Target Audience</h2>
    <div class="audience-grid">
      <div class="audience-card">
        <div class="audience-icon">👩‍💼</div>
        <h3>Policymakers</h3>
        <p>Who require evidence-based visualizations to understand well-being determinants beyond economic indicators.</p>
      </div>
      
      <div class="audience-card">
        <div class="audience-icon">🧑‍🔬</div>
        <h3>Researchers</h3>
        <p>In fields like economics, psychology, and sociology who can explore complex relationships between variables.</p>
      </div>
      
      <div class="audience-card">
        <div class="audience-icon">👨‍🏫</div>
        <h3>Educators</h3>
        <p>Teaching concepts related to development, well-being, and global affairs who need visual teaching tools.</p>
      </div>
      
      <div class="audience-card">
        <div class="audience-icon">👥</div>
        <h3>General Public</h3>
        <p>Interested in understanding global happiness patterns and where their countries stand comparatively.</p>
      </div>
    </div>
  </section>
  
  <section class="about-section">
    <h2>Technologies Used</h2>
    <div class="tech-stack">
      <div class="tech">
        <h3>Svelte</h3>
        <p>For reactive UI components and state management</p>
      </div>
      
      <div class="tech">
        <h3>D3.js</h3>
        <p>For powerful, customizable data visualizations</p>
      </div>
      
      <div class="tech">
        <h3>Python</h3>
        <p>For data preprocessing and analysis</p>
      </div>
      
      <div class="tech">
        <h3>GitHub Pages</h3>
        <p>For website hosting and distribution</p>
      </div>
    </div>
    
    <div class="cta-box">
      <h3>Explore the Data</h3>
      <p>Ready to dive into the visualizations? Visit our interactive data explorer to discover global happiness patterns.</p>
      <Link to="/explore" class="explore-button">Start Exploring</Link>
    </div>
  </section>
</div>

<style>
  .about-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .about-section {
    margin-bottom: 4rem;
  }
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #1e293b;
  }
  
  h2 {
    font-size: 1.8rem;
    margin: 2rem 0 1.5rem;
    color: #1e293b;
    position: relative;
    padding-bottom: 0.5rem;
  }
  
  h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 4px;
    background-color: #3b82f6;
  }
  
  .lead {
    font-size: 1.2rem;
    color: #475569;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  p {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .team-member {
    background-color: white;
    border-radius: 0.5rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .team-member:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .member-avatar {
    width: 70px;
    height: 70px;
    background-color: #3b82f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
  
  .member-role {
    color: #3b82f6;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .goals-list {
    list-style: none;
    padding: 0;
    margin-top: 2rem;
  }
  
  .goals-list li {
    display: flex;
    margin-bottom: 2rem;
  }
  
  .goal-number {
    font-size: 2rem;
    font-weight: 700;
    color: #cbd5e1;
    margin-right: 2rem;
    width: 50px;
    text-align: center;
  }
  
  .goal-content h3 {
    color: #334155;
    margin-bottom: 0.5rem;
  }
  
  .audience-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  .audience-card {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  .audience-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .tech-stack {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  .tech {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  .tech h3 {
    color: #1e293b;
    margin-bottom: 0.5rem;
  }
  
  .cta-box {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    padding: 2.5rem;
    border-radius: 0.5rem;
    text-align: center;
    margin-top: 3rem;
  }
  
  .cta-box h3 {
    color: white;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  
  .cta-box p {
    color: rgba(255, 255, 255, 0.9);
    max-width: 600px;
    margin: 0 auto 1.5rem;
  }
  
  .explore-button {
    display: inline-block;
    background-color: white;
    color: #2563eb;
    padding: 0.75rem 1.5rem;
    border-radius: 0.25rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s;
  }
  
  .explore-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    
    .goal-number {
      font-size: 1.5rem;
      width: 40px;
    }
    
    .goals-list li {
      flex-direction: column;
    }
    
    .goal-number {
      margin-bottom: 0.5rem;
      text-align: left;
    }
  }
</style>