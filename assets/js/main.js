// Smooth-scroll active section highlighting for sidebar
(function(){
  const links = document.querySelectorAll('.sidebar .nav-link');
  const sections = ['hero','about','experience','skills','projects','certifications','testimonials','contact'];
  
  function onScroll(){
    const y = window.scrollY + 120;
    let active = 'hero';
    
    for(const id of sections){
      const el = document.getElementById(id);
      if(!el) continue;
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if(y >= top && y < bottom){ 
        active = id; 
        break; 
      }
    }
    
    links.forEach(a=>{
      const sec = a.getAttribute('data-section');
      a.classList.toggle('active', sec === active);
    });
  }
  
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Close sidebar after click (mobile)
  links.forEach(a=>a.addEventListener('click', ()=>{
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileOverlay');
    const toggle = document.getElementById('mobileMenuToggle');
    
    if(sidebar && sidebar.classList.contains('open')){
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      toggle.classList.remove('active');
    }
  }));
})();

// Mobile sidebar toggle functionality
(function(){
  const toggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobileOverlay');
  
  if(!toggle || !sidebar || !overlay) return;
  
  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    toggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    toggle.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  toggle.addEventListener('click', () => {
    if(sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });
  
  overlay.addEventListener('click', closeSidebar);
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if(window.innerWidth > 991.98 && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });
})();

// Enhanced chatbot with YouTube integration and voice input
(function(){
  const toggle = document.getElementById('chatbotToggle');
  const closeBtn = document.getElementById('chatbotClose');
  const card = document.getElementById('chatbot');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');
  const voiceBtn = document.getElementById('voiceInput');
  const voiceStatus = document.getElementById('voiceStatus');
  const pane = document.getElementById('chatMessages');
  const youtubePlayer = document.getElementById('youtubePlayer');
  const youtubePlayerContainer = document.getElementById('youtubePlayerContainer');
  const closeYouTube = document.getElementById('closeYouTube');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const stopBtn = document.getElementById('stopBtn');
  
  if(!toggle || !closeBtn || !card) return;
  
  let recognition = null;
  let isListening = false;
  let youtubePlayerInstance = null;
  let isPlayerReady = false;
  
  // Initialize speech recognition
  if('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
      isListening = true;
      voiceBtn.classList.add('listening');
      voiceStatus.style.display = 'block';
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      input.value = transcript;
      handleSend();
    };
    
    recognition.onend = () => {
      isListening = false;
      voiceBtn.classList.remove('listening');
      voiceStatus.style.display = 'none';
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      isListening = false;
      voiceBtn.classList.remove('listening');
      voiceStatus.style.display = 'none';
      addMsg('Sorry, I couldn\'t understand. Please try again.', false);
    };
  }
  
  function open(){ 
    card.classList.remove('d-none'); 
    input && input.focus();
    
    // Trigger user interaction to enable autoplay for future use
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    document.dispatchEvent(clickEvent);
  }
  
  function close(){ 
    card.classList.add('d-none'); 
    if(youtubePlayer) youtubePlayer.classList.add('d-none');
  }
  
  // Initialize YouTube Player API
  function initializeYouTubePlayer() {
    if (typeof YT !== 'undefined' && YT.Player) {
      youtubePlayerInstance = new YT.Player('youtubePlayerContainer', {
        height: '200',
        width: '100%',
        playerVars: {
          'rel': 0,
          'showinfo': 0,
          'controls': 1,
          'modestbranding': 1,
          'fs': 0
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    } else {
      // Load YouTube API if not already loaded
      loadYouTubeAPI();
    }
  }

  function loadYouTubeAPI() {
    if (window.YT) {
      initializeYouTubePlayer();
      return;
    }
    
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    window.onYouTubeIframeAPIReady = function() {
      initializeYouTubePlayer();
    };
  }

  function onPlayerReady(event) {
    isPlayerReady = true;
    console.log('YouTube player is ready');
  }

  function onPlayerStateChange(event) {
    const playPauseIcon = playPauseBtn.querySelector('i');
    if (event.data === YT.PlayerState.PLAYING) {
      playPauseIcon.className = 'bi bi-pause-fill';
      playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i> Pause';
    } else if (event.data === YT.PlayerState.PAUSED) {
      playPauseIcon.className = 'bi bi-play-fill';
      playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i> Play';
    }
  }

  function openYouTube(videoId, title = 'Music') {
    if(youtubePlayer) {
      // Update the title in the YouTube player header
      const youtubeHeader = youtubePlayer.querySelector('.youtube-header h6');
      if(youtubeHeader) {
        youtubeHeader.innerHTML = `🎵 ${title}`;
      }
      
      youtubePlayer.classList.remove('d-none');
      
      // Use a more direct approach with multiple autoplay strategies
      youtubePlayerContainer.innerHTML = `
        <div class="youtube-embed-container">
          <iframe 
            id="youtubeIframe"
            width="100%" 
            height="200" 
            src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0&mute=0&loop=1&playlist=${videoId}&enablejsapi=1&origin=${window.location.origin}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
          </iframe>
        </div>
      `;
      
      // Aggressive autoplay approach
      const iframe = document.getElementById('youtubeIframe');
      
      // Method 1: Immediate autoplay attempt
      setTimeout(() => {
        if (iframe) {
          iframe.src = iframe.src.replace('autoplay=0', 'autoplay=1');
        }
      }, 100);
      
      // Method 2: Simulate user interaction with document click
      setTimeout(() => {
        // Simulate a user click on the document to enable autoplay
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        document.dispatchEvent(clickEvent);
        
        if (iframe) {
          iframe.src = iframe.src.replace('autoplay=0', 'autoplay=1');
        }
      }, 300);
      
      // Method 3: Force reload with autoplay
      setTimeout(() => {
        if (iframe) {
          const baseUrl = `https://www.youtube.com/embed/${videoId}`;
          const params = new URLSearchParams({
            autoplay: '1',
            rel: '0',
            modestbranding: '1',
            controls: '1',
            showinfo: '0',
            mute: '0',
            loop: '1',
            playlist: videoId
          });
          iframe.src = `${baseUrl}?${params.toString()}`;
        }
      }, 800);
      
      // Method 4: YouTube Player API as final fallback
      setTimeout(() => {
        loadYouTubeAPI();
      }, 1500);
    }
  }
  
  function closeYouTubePlayer() {
    if(youtubePlayer) {
      youtubePlayer.classList.add('d-none');
      if (youtubePlayerInstance && isPlayerReady) {
        youtubePlayerInstance.stopVideo();
      }
      // Clear the container content
      youtubePlayerContainer.innerHTML = '';
    }
  }
  
  toggle.addEventListener('click', ()=> card.classList.contains('d-none') ? open() : close());
  closeBtn.addEventListener('click', close);
  
  if(closeYouTube) {
    closeYouTube.addEventListener('click', closeYouTubePlayer);
  }

  if(playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      if (youtubePlayerInstance && isPlayerReady) {
        const state = youtubePlayerInstance.getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
          youtubePlayerInstance.pauseVideo();
        } else {
          youtubePlayerInstance.playVideo();
        }
      }
    });
  }

  if(stopBtn) {
    stopBtn.addEventListener('click', () => {
      if (youtubePlayerInstance && isPlayerReady) {
        youtubePlayerInstance.stopVideo();
      }
    });
  }
  
  if(voiceBtn && recognition) {
    voiceBtn.addEventListener('click', () => {
      if(isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    });
  }
  
  function addMsg(text, isUser){
    const div = document.createElement('div');
    div.className = 'mb-2 d-flex ' + (isUser ? 'justify-content-end' : 'justify-content-start');
    const bubble = document.createElement('div');
    bubble.className = 'py-2 px-3 rounded-3 ' + (isUser ? 'bg-primary text-light' : 'bg-secondary text-dark');
    bubble.style.maxWidth = '80%';
    bubble.innerText = text;
    div.appendChild(bubble);
    pane.appendChild(div);
    pane.scrollTop = pane.scrollHeight;
  }
  
  // YouTube API Configuration
  const YOUTUBE_API_KEY = 'AIzaSyCs8Gz18Rfe_RFrMJt739sYGy7KwH7AA4M';
  const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
  
  async function searchYouTube(query) {
    try {
      // If query is empty or just "play", search for trending music
      const searchQuery = query.trim() || 'trending music 2024';
      
      const response = await fetch(
        `${YOUTUBE_API_URL}?part=snippet&type=video&videoCategoryId=10&maxResults=1&q=${encodeURIComponent(searchQuery + ' music')}&key=${YOUTUBE_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('YouTube API request failed');
      }
      
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        return {
          videoId: data.items[0].id.videoId,
          title: data.items[0].snippet.title,
          thumbnail: data.items[0].snippet.thumbnails.medium.url
        };
      } else {
        // Fallback to popular music if no results
        return {
          videoId: 'kJQP7kiw5Fk',
          title: 'Despacito - Luis Fonsi',
          thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg'
        };
      }
    } catch (error) {
      console.error('YouTube API Error:', error);
      // Fallback to popular songs if API fails
      const popularSongs = {
        'despacito': 'kJQP7kiw5Fk',
        'shape of you': 'JGwWNGJdvx8',
        'blinding lights': '4NRXx6U8ABQ',
        'watermelon sugar': 'E07s5ZYygMg',
        'levitating': 'TUVcZfQe-Kw',
        'good 4 u': 'gNi_6U5Pm_o',
        'stay': 'kTJxU4b_Qak',
        'industry baby': 'bo_efYhYU2A',
        'bad habits': 'orJSJGHjBLI',
        'peaches': 'tQ0yjYUFKAE'
      };
      
      const lowerQuery = query.toLowerCase();
      for(const song in popularSongs) {
        if(lowerQuery.includes(song)) {
          return {
            videoId: popularSongs[song],
            title: song.charAt(0).toUpperCase() + song.slice(1),
            thumbnail: `https://img.youtube.com/vi/${popularSongs[song]}/mqdefault.jpg`
          };
        }
      }
      
      return {
        videoId: 'kJQP7kiw5Fk',
        title: 'Despacito - Luis Fonsi',
        thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg'
      };
    }
  }
  
  function respond(userText){
    const t = userText.toLowerCase();
    
    if(t.includes('play') && (t.includes('song') || t.includes('music') || t.includes('video'))){
      const songQuery = t.replace(/play|song|music|video/gi, '').trim();
      
      addMsg('🎵 Searching for music on YouTube...', false);
      
      searchYouTube(songQuery).then(result => {
        addMsg(`🎵 Now playing: ${result.title}`, false);
        openYouTube(result.videoId, result.title);
        setTimeout(() => {
          addMsg('Music is now playing! 🎵', false);
        }, 2000);
      }).catch(error => {
        console.error('Error playing music:', error);
        addMsg('Sorry, I couldn\'t find that song. Try asking for a different one!', false);
      });
      
      return;
    }
    
    if(t.includes('stop') && t.includes('music')){
      closeYouTubePlayer();
      addMsg('🎵 Music stopped.', false);
      return;
    }
    
    if(t.includes('experience') || t.includes('work')){
      addMsg("Ritik has 2+ years of experience, currently at SEO WEB Technology (New Delhi); previously at Globus Eight Inc (Gurgaon).", false);
      return;
    }
    
    if(t.includes('skills') || t.includes('technical')){
      addMsg("Skills: Java, C#, JavaScript, PHP, HTML/CSS; networking, firewall, VPN, system security; Git, MySQL, WordPress, Linux.", false);
      return;
    }
    
    if(t.includes('education') || t.includes('study')){
      addMsg("MCA with 79.9% from Manav Rachna International Institute of Research and Studies.", false);
      return;
    }
    
    if(t.includes('contact') || t.includes('reach')){
      addMsg("Email: ritik2522000@gmail.com • Phone: +91 7372800564 • New Delhi, India", false);
      return;
    }
    
    if(t.includes('hello') || t.includes('hi')){
      addMsg("Hello! Ask about experience, skills, education, contact, or say 'play music'. You can also use voice input by clicking the microphone icon!", false);
      return;
    }
    
    if(t.includes('voice') || t.includes('speak')){
      addMsg("Click the microphone icon to use voice input! Just say what you want to know or ask me to play music.", false);
      return;
    }
    
    addMsg("I'm here to help you learn about Ritik's professional background. Try asking about experience, skills, education, or say 'play music'!", false);
  }
  
  function handleSend(){
    const val = (input.value || '').trim();
    if(!val) return;
    addMsg(val, true);
    input.value = '';
    setTimeout(()=>respond(val), 200);
  }
  
  send.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter'){ handleSend(); } });
})();

// Scroll to top functionality
(function(){
  const scrollBtn = document.getElementById('scrollToTop');
  if(!scrollBtn) return;
  
  function toggleScrollBtn() {
    if(window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  window.addEventListener('scroll', toggleScrollBtn, {passive: true});
  toggleScrollBtn();
})();

// Performance optimization: Intersection Observer for animations
(function(){
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, observerOptions);
  
  // Observe all sections for animation
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
})();


