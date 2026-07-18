/* ==========================================================================
   SiteMarket — оптимизированные падающие частицы (фон)
   ========================================================================== */

(function() {
  // На телефонах и при "уменьшить анимацию" в ОС — не грузим CPU/батарею зря
  var isMobile = window.innerWidth < 768;
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // анимация полностью отключена по настройке ОС

  // Проверка производительности — если FPS падает ниже 30, уменьшаем количество частиц
  var fps = 60;
  var frameCount = 0;
  var lastFpsCheck = Date.now();

  var canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  document.body.prepend(canvas);

  var ctx = canvas.getContext('2d');
  var particles = [];
  var numParticles = isMobile ? 30 : 80; // на телефоне частиц заметно меньше
  var maxParticles = isMobile ? 45 : 120; // и потолок ниже

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 2 + 1, // меньше размер
      speedY: Math.random() * 0.8 + 0.3, // медленнее
      opacity: Math.random() * 0.4 + 0.3
    };
  }

  function initParticles(count) {
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }
  initParticles(numParticles);

  var rafId = null;

  function animate(timestamp) {
    // Проверка FPS каждую секунду
    frameCount++;
    if (timestamp - lastFpsCheck > 1000) {
      fps = frameCount;
      frameCount = 0;
      lastFpsCheck = timestamp;
      // Если FPS ниже 30, уменьшаем частицы
      if (fps < 30 && numParticles > 15) {
        numParticles = Math.max(15, numParticles - 5);
        initParticles(numParticles);
      } else if (fps > 45 && numParticles < maxParticles) {
        numParticles = Math.min(maxParticles, numParticles + 2);
        initParticles(numParticles);
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем частицы без лишних теней для скорости
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.y += p.speedY;
      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
        p.size = Math.random() * 2 + 1;
        p.speedY = Math.random() * 0.8 + 0.3;
        p.opacity = Math.random() * 0.4 + 0.3;
      }
      // Простая отрисовка без свечения для производительности
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 106, 26, ' + p.opacity + ')';
      ctx.fill();
      // Яркое ядро (меньше и без тени)
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
    }

    rafId = requestAnimationFrame(animate);
  }

  // Ставим анимацию на паузу, когда вкладка свёрнута — экономит батарею на телефоне
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      lastFpsCheck = Date.now();
      frameCount = 0;
      rafId = requestAnimationFrame(animate);
    }
  });

  // Запускаем анимацию
  rafId = requestAnimationFrame(animate);
})();