// ============================================================
//  CONSTANTS
// ============================================================
const STORAGE_KEY = 'stories_v1';
const STORY_DURATION = 3000;   // 3 seconds per story
const MAX_DIM = 1080;          // max image dimension (px)
const EXPIRE_MS = 24 * 60 * 60 * 1000;  // 24 hours in ms

// ============================================================
//  DOM ELEMENTS
// ============================================================
const tray          = document.getElementById('tray');
const addBubble     = document.getElementById('add-bubble');
const fileInput     = document.getElementById('file-input');
const feedEmpty     = document.getElementById('feed-empty');
const storyCount    = document.getElementById('story-count');
const viewer        = document.getElementById('viewer');
const viewerImg     = document.getElementById('viewer-img');
const viewerTime    = document.getElementById('viewer-time');
const viewerClose   = document.getElementById('viewer-close');
const viewerDelete  = document.getElementById('viewer-delete');
const progressTrack = document.getElementById('progress-track');
const tapPrev       = document.getElementById('tap-prev');
const tapNext       = document.getElementById('tap-next');
const toast         = document.getElementById('toast');

// ============================================================
//  STATE
// ============================================================
let currentIdx    = 0;
let progressTimer = null;
let progressStart = null;
let progressElapsed = 0;
let isPaused      = false;
const seenSet     = new Set();   // tracks which story ids have been viewed

// ============================================================
//  LOCALSTORAGE HELPERS
// ============================================================

function loadStories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStories(stories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
}

// Remove stories older than 24 hours
function pruneExpired() {
  const now = Date.now();
  const stories = loadStories().filter(s => (now - s.ts) < EXPIRE_MS);
  saveStories(stories);
  return stories;
}

function addStory(base64) {
  const stories = loadStories();
  stories.push({
    id: Date.now(),
    ts: Date.now(),
    img: base64
  });
  saveStories(stories);
}

function deleteStory(id) {
  const stories = loadStories().filter(s => s.id !== id);
  saveStories(stories);
}

// ============================================================
//  IMAGE RESIZE  (max 1080px, saved as JPEG)
// ============================================================
function resizeImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = function(e) {
      const img = new Image();

      img.onload = function() {
        let w = img.width;
        let h = img.height;

        // Scale down if too large
        if (w > MAX_DIM || h > MAX_DIM) {
          if (w > h) {
            h = Math.round(h * MAX_DIM / w);
            w = MAX_DIM;
          } else {
            w = Math.round(w * MAX_DIM / h);
            h = MAX_DIM;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width  = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);

        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
}

// ============================================================
//  TOAST
// ============================================================
let toastTimer;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ============================================================
//  TIME HELPER
// ============================================================
function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60)   return diff + 's ago';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  return Math.floor(diff / 3600) + 'h ago';
}

// ============================================================
//  RENDER TRAY
// ============================================================
function renderTray() {
  // Remove old story bubbles (keep the + add button)
  tray.querySelectorAll('.story-bubble:not(#add-bubble)').forEach(el => el.remove());

  const stories = pruneExpired();

  // Add a bubble for each story
  stories.forEach(function(story, idx) {
    const seen = seenSet.has(story.id);

    const bubble = document.createElement('div');
    bubble.className = 'story-bubble';
    bubble.dataset.idx = idx;

    bubble.innerHTML = `
      <div class="bubble-ring ${seen ? 'seen' : ''}">
        <div class="bubble-inner">
          <img src="${story.img}" alt="story" loading="lazy" />
        </div>
      </div>
      <span class="bubble-label">${timeAgo(story.ts)}</span>
    `;

    bubble.addEventListener('click', function() {
      openViewer(idx);
    });

    tray.appendChild(bubble);
  });

  // Update header count
  const n = stories.length;
  storyCount.textContent = n === 0 ? '0 stories' : n + ' stor' + (n === 1 ? 'y' : 'ies');

  // Show/hide empty state
  feedEmpty.style.display = n === 0 ? 'block' : 'none';
}

// ============================================================
//  ADD STORY  (+ button click)
// ============================================================
addBubble.addEventListener('click', function() {
  fileInput.click();
});

fileInput.addEventListener('change', async function(e) {
  const file = e.target.files[0];
  if (!file) return;
  e.target.value = '';  // reset so same file can be picked again

  if (!file.type.startsWith('image/')) {
    showToast('Please select an image file');
    return;
  }

  showToast('Adding story…');

  try {
    const base64 = await resizeImage(file);
    addStory(base64);
    renderTray();
    showToast('Story added! Disappears in 24h ✓');
  } catch (err) {
    showToast('Failed to add story');
    console.error(err);
  }
});

// ============================================================
//  VIEWER — OPEN / CLOSE
// ============================================================
function openViewer(idx) {
  const stories = pruneExpired();
  if (!stories.length) return;

  currentIdx = Math.min(idx, stories.length - 1);
  buildProgressBars(stories.length);
  viewer.classList.add('open');
  showStory(currentIdx);
}

function closeViewer() {
  viewer.classList.remove('open');
  stopProgress();
  renderTray();   // refresh (marks seen, updates tray)
}

viewerClose.addEventListener('click', closeViewer);

// ============================================================
//  PROGRESS BARS
// ============================================================
function buildProgressBars(count) {
  progressTrack.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const seg = document.createElement('div');
    seg.className = 'progress-seg';
    seg.innerHTML = '<div class="progress-fill"></div>';
    progressTrack.appendChild(seg);
  }
}

function startProgress(idx) {
  const fill = progressTrack.querySelectorAll('.progress-fill')[idx];
  if (!fill) return;

  progressElapsed = 0;
  progressStart   = performance.now();
  isPaused        = false;

  function tick(now) {
    if (isPaused) return;

    progressElapsed = now - progressStart;
    const pct = Math.min((progressElapsed / STORY_DURATION) * 100, 100);
    fill.style.width = pct + '%';

    if (progressElapsed >= STORY_DURATION) {
      fill.style.width = '100%';
      goNext();
      return;
    }

    progressTimer = requestAnimationFrame(tick);
  }

  progressTimer = requestAnimationFrame(tick);
}

function stopProgress() {
  if (progressTimer) {
    cancelAnimationFrame(progressTimer);
    progressTimer = null;
  }
}

function pauseProgress() {
  if (isPaused) return;
  isPaused = true;
  stopProgress();
}

function resumeProgress() {
  if (!isPaused) return;
  isPaused = false;
  progressStart = performance.now() - progressElapsed;

  const idx  = currentIdx;
  const fill = progressTrack.querySelectorAll('.progress-fill')[idx];
  if (!fill) return;

  function tick(now) {
    if (isPaused) return;
    progressElapsed = now - progressStart;
    const pct = Math.min((progressElapsed / STORY_DURATION) * 100, 100);
    fill.style.width = pct + '%';
    if (progressElapsed >= STORY_DURATION) { fill.style.width = '100%'; goNext(); return; }
    progressTimer = requestAnimationFrame(tick);
  }

  progressTimer = requestAnimationFrame(tick);
}

// ============================================================
//  SHOW STORY
// ============================================================
function showStory(idx) {
  const stories = pruneExpired();
  if (idx < 0 || idx >= stories.length) { closeViewer(); return; }

  currentIdx = idx;
  const story = stories[idx];

  // Mark as seen
  seenSet.add(story.id);

  // Update image + time
  viewerImg.src       = story.img;
  viewerTime.textContent = timeAgo(story.ts);
  viewerDelete.dataset.id = story.id;

  // Update progress bar states
  const fills = progressTrack.querySelectorAll('.progress-fill');
  fills.forEach(function(fill, i) {
    if (i < idx) {
      // Already watched — fill completely
      fill.classList.add('done');
      fill.style.width = '100%';
    } else {
      // Not yet watched — reset
      fill.classList.remove('done');
      fill.style.width = '0%';
    }
  });

  stopProgress();
  startProgress(idx);
}

// ============================================================
//  NAVIGATE
// ============================================================
function goNext() {
  const stories = pruneExpired();
  if (currentIdx < stories.length - 1) {
    showStory(currentIdx + 1);
  } else {
    closeViewer();   // last story done
  }
}

function goPrev() {
  if (currentIdx > 0) {
    showStory(currentIdx - 1);
  }
}

tapNext.addEventListener('click', goNext);
tapPrev.addEventListener('click', goPrev);

// ============================================================
//  DELETE STORY
// ============================================================
viewerDelete.addEventListener('click', function() {
  const id = parseInt(viewerDelete.dataset.id);
  deleteStory(id);
  showToast('Story deleted');

  const stories = pruneExpired();
  if (!stories.length) { closeViewer(); return; }

  buildProgressBars(stories.length);
  showStory(Math.min(currentIdx, stories.length - 1));
});

// ============================================================
//  HOLD TO PAUSE
// ============================================================
viewer.addEventListener('pointerdown', pauseProgress);
viewer.addEventListener('pointerup',   resumeProgress);
viewer.addEventListener('pointerleave', resumeProgress);

// ============================================================
//  SWIPE SUPPORT (mobile)
// ============================================================
let touchStartX = 0;
let touchStartY = 0;

viewer.addEventListener('touchstart', function(e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  pauseProgress();
}, { passive: true });

viewer.addEventListener('touchend', function(e) {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;

  // Only count as swipe if horizontal movement > vertical
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    if (dx < 0) goNext();
    else        goPrev();
  } else {
    resumeProgress();
  }
}, { passive: true });

// ============================================================
//  KEYBOARD NAVIGATION
// ============================================================
document.addEventListener('keydown', function(e) {
  if (!viewer.classList.contains('open')) return;
  if (e.key === 'ArrowRight') goNext();
  if (e.key === 'ArrowLeft')  goPrev();
  if (e.key === 'Escape')     closeViewer();
});

// ============================================================
//  INIT
// ============================================================
renderTray();

// Refresh tray every minute (removes expired stories automatically)
setInterval(renderTray, 60 * 1000);