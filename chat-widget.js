(function () {
  /* ── Inject Styles ── */
  const style = document.createElement('style');
  style.textContent = `
    #sm-fab {
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      width: 56px; height: 56px; border-radius: 50%;
      background: #1a5c48; border: none; cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.22);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #sm-fab:hover { transform: scale(1.08); box-shadow: 0 6px 24px rgba(0,0,0,0.28); }
    #sm-fab .sm-badge {
      position: absolute; top: -2px; right: -2px;
      background: #e74c3c; color: #fff;
      width: 18px; height: 18px; border-radius: 50%;
      font-size: 10px; font-weight: 700;
      display: none; align-items: center; justify-content: center;
      border: 2px solid #fff;
    }
    #sm-panel {
      position: fixed; bottom: 92px; right: 24px; z-index: 9998;
      width: 370px; max-width: calc(100vw - 32px);
      border-radius: 20px; overflow: hidden;
      box-shadow: 0 12px 40px rgba(0,0,0,0.18);
      display: none; flex-direction: column;
      background: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      animation: smSlideUp 0.25s ease;
    }
    #sm-panel.open { display: flex; }
    @keyframes smSlideUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .sm-hdr {
      background: #1a5c48; padding: 13px 15px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .sm-hdr-left { display: flex; align-items: center; gap: 9px; }
    .sm-hdr-av {
      width: 34px; height: 34px; border-radius: 50%;
      background: rgba(255,255,255,0.18);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .sm-hdr h2 { color: #fff; font-size: 13.5px; font-weight: 600; margin: 0; }
    .sm-hdr p  { color: rgba(255,255,255,0.7); font-size: 10.5px; margin: 0; }
    .sm-hdr-actions { display: flex; gap: 6px; }
    .sm-hdr-btn {
      background: rgba(255,255,255,0.15); border: none; border-radius: 7px;
      color: #fff; font-size: 11px; padding: 4px 9px; cursor: pointer;
      transition: background 0.15s;
    }
    .sm-hdr-btn:hover { background: rgba(255,255,255,0.28); }
    .sm-msgs {
      flex: 1; min-height: 300px; max-height: 360px; overflow-y: auto;
      padding: 14px; display: flex; flex-direction: column; gap: 11px;
      background: #fff; scroll-behavior: smooth;
    }
    .sm-msgs::-webkit-scrollbar { width: 3px; }
    .sm-msgs::-webkit-scrollbar-thumb { background: #c8e6d8; border-radius: 3px; }
    .sm-row { display: flex; align-items: flex-end; gap: 7px; }
    .sm-row.u { flex-direction: row-reverse; }
    .sm-av {
      width: 26px; height: 26px; border-radius: 50%;
      background: #e1f5ee; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .sm-bbl {
      max-width: 80%; padding: 9px 13px;
      font-size: 13px; line-height: 1.5; border-radius: 16px;
    }
    .sm-bbl.b { background: #f4f4f4; color: #1a1a1a; border-radius: 4px 16px 16px 16px; }
    .sm-bbl.u { background: #1a5c48; color: #fff; border-radius: 16px 4px 16px 16px; }
    .sm-bbl.t { display: flex; gap: 4px; align-items: center; padding: 11px 14px; }
    .sm-d { width: 6px; height: 6px; border-radius: 50%; background: #aaa; animation: smB 1.2s infinite; }
    .sm-d:nth-child(2){animation-delay:.2s} .sm-d:nth-child(3){animation-delay:.4s}
    @keyframes smB { 0%,60%,100%{opacity:.3;transform:translateY(0)} 30%{opacity:1;transform:translateY(-4px)} }
    .sm-ftr { background: #f9fdf9; border-top: 1px solid #e8f4ed; padding: 10px 12px 12px; }
    .sm-chips { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 9px; min-height: 0; }
    .sm-chip {
      background: #fff; border: 1px solid #b3d9c5; border-radius: 12px;
      padding: 4px 10px; font-size: 11.5px; color: #0f6e56;
      cursor: pointer; transition: all 0.15s; font-family: inherit;
    }
    .sm-chip:hover { background: #e1f5ee; border-color: #5dcaa5; }
    .sm-inp-row { display: flex; gap: 7px; align-items: center; }
    .sm-inp {
      flex: 1; border: 1px solid #c8e6d8; border-radius: 20px;
      padding: 8px 14px; font-size: 12.5px;
      background: #fff; color: #1a1a1a; outline: none; font-family: inherit;
    }
    .sm-inp:focus { border-color: #1a5c48; }
    .sm-inp::placeholder { color: #bbb; }
    .sm-snd {
      width: 34px; height: 34px; border-radius: 50%;
      background: #1a5c48; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: opacity 0.15s;
    }
    .sm-snd:hover { opacity: 0.85; }
    .sm-snd:disabled { opacity: 0.38; cursor: not-allowed; }
    .sm-disc { font-size: 10px; color: #aaa; text-align: center; margin-top: 7px; }
    .sm-crisis {
      background: #fff8e1; border: 1px solid #ffe082; border-radius: 8px;
      padding: 7px 10px; font-size: 11px; color: #795519;
      margin-top: 7px; display: none;
    }
    .sm-crisis a { color: #795519; font-weight: 600; }
    @media (max-width: 420px) {
      #sm-panel { right: 8px; bottom: 80px; width: calc(100vw - 16px); }
      #sm-fab   { right: 16px; bottom: 16px; }
    }
  `;
  document.head.appendChild(style);

  /* ── FAB Button ── */
  const fab = document.createElement('button');
  fab.id = 'sm-fab';
  fab.setAttribute('aria-label', 'Open SereneMind support chat');
  fab.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <span class="sm-badge" id="sm-badge">1</span>`;
  document.body.appendChild(fab);

  /* ── Panel ── */
  const panel = document.createElement('div');
  panel.id = 'sm-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'SereneMind chat');
  panel.innerHTML = `
    <div class="sm-hdr">
      <div class="sm-hdr-left">
        <div class="sm-hdr-av">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        </div>
        <div>
          <h2>SereneMind Support</h2>
          <p>Gentle AI companion · Always here</p>
        </div>
      </div>
      <div class="sm-hdr-actions">
        <button class="sm-hdr-btn" id="sm-clear">Clear</button>
        <button class="sm-hdr-btn" id="sm-close">✕</button>
      </div>
    </div>
    <div class="sm-msgs" id="sm-msgs" role="log" aria-live="polite"></div>
    <div class="sm-ftr">
      <div class="sm-chips" id="sm-chips"></div>
      <div class="sm-inp-row">
        <input class="sm-inp" id="sm-inp" type="text"
               placeholder="Share what's on your mind…" autocomplete="off" />
        <button class="sm-snd" id="sm-snd" aria-label="Send">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
          </svg>
        </button>
      </div>
      <p class="sm-disc">Not a substitute for professional help. In crisis? Call/text <strong>988</strong>.</p>
      <div class="sm-crisis" id="sm-crisis">
        Please reach out now: <a href="tel:988">Call/text 988</a> |
        <a href="tel:9152987821">iCall India</a>: 9152987821
      </div>
    </div>`;
  document.body.appendChild(panel);

  /* ── Config ── */
  const SYSTEM = `You are SereneMind, a gentle and warm AI mental wellness companion. Listen with empathy, help users explore their feelings, and provide calming support.
Rules:
- NOT a therapist. Never diagnose or prescribe.
- Keep responses warm and concise (2-3 sentences). End with one gentle open-ended question.
- If user mentions suicide, self-harm, or crisis: mention 988 Suicide & Crisis Lifeline and iCall India (9152987821).
- Reply in the same language the user uses (Hindi, Hinglish, or English).
- Plain text only. No markdown.`;

  const WELCOME = "Hi, I'm glad you're here. This is a safe space. How are you feeling right now? 💚";
  const CHIPS_A = ["I'm feeling anxious", "Can't sleep well", "Feeling lonely", "Stressed at work"];
  const CHIPS_B = ["Tell me more…", "How do I calm down?", "I feel better now", "What should I do?"];
  const CRISIS_KW = ["suicide","kill myself","end my life","self harm","self-harm","hurt myself",
    "want to die","khatam kar","marna chahta","marna chahti","jaan de du"];

  let history = [], busy = false;

  const msgsEl  = document.getElementById('sm-msgs');
  const inpEl   = document.getElementById('sm-inp');
  const sndBtn  = document.getElementById('sm-snd');
  const chipsEl = document.getElementById('sm-chips');
  const crisisEl= document.getElementById('sm-crisis');
  const badge   = document.getElementById('sm-badge');

  /* ── Helpers ── */
  function addMsg(text, role, typing = false) {
    const row = document.createElement('div');
    row.className = 'sm-row' + (role === 'user' ? ' u' : '');
    if (role === 'assistant') {
      const av = document.createElement('div');
      av.className = 'sm-av';
      av.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0f6e56" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`;
      row.appendChild(av);
    }
    const bbl = document.createElement('div');
    if (typing) {
      bbl.className = 'sm-bbl b t';
      bbl.innerHTML = '<div class="sm-d"></div><div class="sm-d"></div><div class="sm-d"></div>';
    } else {
      bbl.className = 'sm-bbl ' + (role === 'user' ? 'u' : 'b');
      bbl.textContent = text;
    }
    row.appendChild(bbl);
    msgsEl.appendChild(row);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return row;
  }

  function setChips(arr) {
    chipsEl.innerHTML = '';
    arr.forEach(label => {
      const btn = document.createElement('button');
      btn.className = 'sm-chip';
      btn.textContent = label;
      btn.onclick = () => send(label);
      chipsEl.appendChild(btn);
    });
  }

  function isCrisis(t) {
    const s = t.toLowerCase();
    return CRISIS_KW.some(k => s.includes(k));
  }

  /* ── Send ── */
  async function send(text) {
    text = text.trim();
    if (!text || busy) return;
    busy = true; sndBtn.disabled = true;
    inpEl.value = ''; chipsEl.innerHTML = '';
    addMsg(text, 'user');
    history.push({ role: 'user', content: text });
    if (isCrisis(text)) crisisEl.style.display = 'block';
    const typingRow = addMsg('', 'assistant', true);
    try {
      const res = await fetch('https://serenemind-proxy.ravipaul0992.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: SYSTEM,
          messages: history
        })
      });
      const data = await res.json();
      const reply = data?.content?.[0]?.text || "I'm here with you. Could you tell me more?";
      typingRow.remove();
      addMsg(reply, 'assistant');
      history.push({ role: 'assistant', content: reply });
      if (isCrisis(reply)) crisisEl.style.display = 'block';
      setChips(CHIPS_B);
    } catch (e) {
      typingRow.remove();
      addMsg("Having a little trouble connecting. Please try again. 🙏", 'assistant');
    }
    busy = false; sndBtn.disabled = false; inpEl.focus();
  }

  function clearChat() {
    history = []; msgsEl.innerHTML = '';
    crisisEl.style.display = 'none'; init();
  }

  function init() {
    addMsg(WELCOME, 'assistant');
    setChips(CHIPS_A);
  }

  /* ── Toggle panel ── */
  function openPanel() {
    panel.classList.add('open');
    fab.setAttribute('aria-label', 'Close chat');
    fab.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    badge.style.display = 'none';
    inpEl.focus();
  }
  function closePanel() {
    panel.classList.remove('open');
    fab.setAttribute('aria-label', 'Open SereneMind chat');
    fab.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span class="sm-badge" id="sm-badge" style="display:none">1</span>`;
  }

  fab.addEventListener('click', () =>
    panel.classList.contains('open') ? closePanel() : openPanel());
  document.getElementById('sm-close').addEventListener('click', closePanel);
  document.getElementById('sm-clear').addEventListener('click', clearChat);
  sndBtn.addEventListener('click', () => send(inpEl.value));
  inpEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(inpEl.value); }
  });

  /* Show badge after 3 seconds to attract attention */
  setTimeout(() => {
    if (!panel.classList.contains('open')) {
      const b = document.getElementById('sm-badge');
      if (b) b.style.display = 'flex';
    }
  }, 3000);

  init();
})();
