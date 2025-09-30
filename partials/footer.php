  </main>
  
  <!-- Enhanced Footer -->
  <footer class="footer-enhanced">
    <div class="container">
      <div class="footer-content">
        <div class="row g-4">
          <!-- About Section -->
          <div class="col-lg-3 col-md-6">
            <div class="footer-section">
              <h5 class="footer-title">
                <!-- <span class="gradient-text">Ritik Raj Singh</span> -->
              </h5>
              <!-- <p class="footer-description">
                IT/Network Support Engineer specializing in cybersecurity, network infrastructure, and system optimization. Passionate about creating secure and efficient IT solutions.
              </p> -->
              <!-- <div class="footer-social">
                <a href="https://github.com/RitikRajSingh2522000" target="_blank" class="social-link-footer" aria-label="GitHub">
                  <i class="bi bi-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/ritik-raj-singh/" target="_blank" class="social-link-footer" aria-label="LinkedIn">
                  <i class="bi bi-linkedin"></i>
                </a>
                <a href="mailto:ritik2522000@gmail.com" class="social-link-footer" aria-label="Email">
                  <i class="bi bi-envelope"></i>
                </a>
                <a href="tel:+917372800564" class="social-link-footer" aria-label="Phone">
                  <i class="bi bi-telephone"></i>
                </a>
              </div> -->
            </div>
          </div>
          
          <!-- Quick Links -->
          <div class="col-lg-4 col-md-6">
            <div class="footer-section">
              <h5 class="footer-title">
                <span class="gradient-text">Ritik Raj Singh</span>
              </h5>
              <p class="footer-description">
                IT/Network Support Engineer specializing in cybersecurity, network infrastructure, and system optimization. Passionate about creating secure and efficient IT solutions.
              </p>
              <div class="footer-social">
                <a href="https://github.com/RitikRajSingh2522000" target="_blank" class="social-link-footer" aria-label="GitHub">
                  <i class="bi bi-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/ritik-raj-singh/" target="_blank" class="social-link-footer" aria-label="LinkedIn">
                  <i class="bi bi-linkedin"></i>
                </a>
                <a href="mailto:ritik2522000@gmail.com" class="social-link-footer" aria-label="Email">
                  <i class="bi bi-envelope"></i>
                </a>
                <a href="tel:+917372800564" class="social-link-footer" aria-label="Phone">
                  <i class="bi bi-telephone"></i>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Services -->
          <div class="col-lg-2 col-md-6">
            <div class="footer-section">
              <h6 class="footer-subtitle">Quik Links</h6>
              <ul class="footer-links">
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#certifications">Certifications</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <!-- Contact Info -->
          <div class="col-lg-3 col-md-6">
            <div class="footer-section">
              <h6 class="footer-subtitle">Contact Info</h6>
              <div class="contact-info">
                <div class="contact-item">
                  <i class="bi bi-geo-alt text-cyber-primary"></i>
                  <span>New Delhi, India</span>
                </div>
                <div class="contact-item">
                  <i class="bi bi-envelope text-cyber-secondary"></i>
                  <a href="mailto:ritik2522000@gmail.com">ritik2522000@gmail.com</a>
                </div>
                <div class="contact-item">
                  <i class="bi bi-telephone text-cyber-accent"></i>
                  <a href="tel:+917372800564">+91 7372800564</a>
                </div>
                <div class="contact-item">
                  <i class="bi bi-briefcase text-cyber-primary"></i>
                  <span>Available for Opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="footer-copyright">
              <!-- <span>© 2025 <strong class="text-cyber-primary">Ritik Raj Singh</strong>. All rights reserved.</span> -->
            </div>
          </div>
          <div class="col-md-6">
            <div class="footer-credits text-md-end">
              <span>© 2025 <strong class="text-cyber-primary">Ritik Raj Singh</strong>. All rights reserved.</span>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer Background Effects -->
    <div class="footer-bg-effects">
      <div class="footer-grid"></div>
      <div class="footer-nodes">
        <div class="footer-node node-1"></div>
        <div class="footer-node node-2"></div>
        <div class="footer-node node-3"></div>
      </div>
    </div>
  </footer>

  <!-- Chatbot -->
  <button id="chatbotToggle" class="btn btn-primary rounded-circle shadow chatbot-toggle" aria-label="Toggle chatbot">
    <i class="bi bi-chat-dots"></i>
  </button>
  <div id="chatbot" class="card bg-dark border-secondary text-light chatbot-card d-none">
    <div class="card-header d-flex justify-content-between align-items-center">
      <div class="fw-semibold">Ritik's AI Assistant</div>
      <button class="btn btn-sm btn-outline-light" id="chatbotClose"><i class="bi bi-x"></i></button>
    </div>
    <div id="chatMessages" class="card-body py-3 px-3 overflow-auto" style="max-height: 260px">
      <div class="alert alert-secondary py-2 px-3 mb-2 small">Hi! I'm Ritik's AI assistant. Ask about experience, skills, or say "play music".</div>
    </div>
    <div class="card-footer">
      <div class="input-group input-group-sm mb-2">
        <input id="chatInput" type="text" class="form-control" placeholder="Type a message or ask for music...">
        <button id="voiceInput" class="btn btn-outline-secondary" title="Voice Input"><i class="bi bi-mic"></i></button>
        <button id="chatSend" class="btn btn-primary"><i class="bi bi-send"></i></button>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted">Try: "play music" or "play [song name]"</small>
        <div class="voice-status" id="voiceStatus" style="display: none;">
          <span class="text-cyber-primary"><i class="bi bi-mic-fill"></i> Listening...</span>
        </div>
      </div>
    </div>
  </div>

  <!-- YouTube Player Container -->
  <div id="youtubePlayer" class="youtube-player d-none">
    <div class="youtube-header">
      <h6 class="mb-0">🎵 Now Playing</h6>
      <button id="closeYouTube" class="btn btn-sm btn-outline-light"><i class="bi bi-x"></i></button>
    </div>
    <div class="youtube-content">
      <div id="youtubePlayerContainer"></div>
      <div class="youtube-controls mt-3">
        <button id="playPauseBtn" class="btn btn-outline-primary btn-sm me-2">
          <i class="bi bi-play-fill"></i> Play
        </button>
        <button id="stopBtn" class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-stop-fill"></i> Stop
        </button>
      </div>
    </div>
  </div>

  <!-- Scroll to Top Button -->
  <button id="scrollToTop" class="scroll-to-top" aria-label="Scroll to top">
    <i class="bi bi-arrow-up"></i>
  </button>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>


