(function () {
  /* ─── Inject Styles ─── */
  const style = document.createElement('style');
  style.textContent = `
    #sm-bubble {
      position: fixed; bottom: 28px; right: 28px;
      width: 58px; height: 58px; border-radius: 50%;
      background: #0F6E56; color: #fff;
      font-size: 26px; display: flex; align-items: center; justify-content: center;
      cursor: pointer; z-index: 9999;
      box-shadow: 0 4px 20px rgba(15,110,86,0.35);
      transition: transform 0.2s, box-shadow 0.2s;
      border: none; outline: none;
      animation: sm-pulse 3s ease-in-out infinite;
    }
    #sm-bubble:hover { transform: scale(1.08); box-shadow: 0 6px 24px rgba(15,110,86,0.45); }
    @keyframes sm-pulse {
      0%, 100% { box-shadow: 0 4px 20px rgba(15,110,86,0.35); }
      50% { box-shadow: 0 4px 28px rgba(15,110,86,0.55); }
    }

    #sm-panel {
      position: fixed; bottom: 100px; right: 28px;
      width: 350px; border-radius: 18px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.18);
      z-index: 9998; display: none; flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      overflow: hidden; max-height: 520px;
      animation: sm-slideup 0.25s ease;
    }
    #sm-panel.open { display: flex; }
    @keyframes sm-slideup {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .sm-header {
      background: #0F6E56; padding: 14px 16px;
      display: flex; align-items: center; gap: 10px;
    }
    .sm-avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255,255,255,0.18);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
    }
    .sm-hinfo { flex: 1; }
    .sm-hname { color: #fff; font-size: 14px; font-weight: 600; margin: 0; }
    .sm-hsub  { color: rgba(255,255,255,0.7); font-size: 11px; margin: 0; }
    .sm-close {
      background: none; border: none; color: rgba(255,255,255,0.8);
      font-size: 20px; cursor: pointer; padding: 0 4px; line-height: 1;
    }
    .sm-close:hover { color: #fff; }
    .sm-online {
      width: 8px; height: 8px; border-radius: 50%;
      background: #9FE1CB; margin-right: 4px;
      display: inline-block;
    }

    .sm-body {
      background: #f7faf9; flex: 1;
      overflow-y: auto; padding: 14px;
      display: flex; flex-direction: column; gap: 10px;
      min-height: 300px; max-height: 340px;
      scroll-behavior: smooth;
    }

    .sm-msg { display: flex; gap: 7px; align-items: flex-end; }
    .sm-msg.user { flex-direction: row-reverse; }
    .sm-icon {
      width: 26px; height: 26px; border-radius: 50%;
      background: #E1F5EE; display: flex; align-items: center;
      justify-content: center; font-size: 13px; flex-shrink: 0;
    }
    .sm-bubble-msg {
      max-width: 76%; padding: 9px 13px;
      font-size: 13.5px; line-height: 1.55; border-radius: 16px;
    }
    .sm-msg.bot .sm-bubble-msg {
      background: #fff; border: 1px solid #e0ede9;
      color: #1a2e28; border-radius: 4px 16px 16px 16px;
    }
    .sm-msg.user .sm-bubble-msg {
      background: #0F6E56; color: #fff;
      border-radius: 16px 4px 16px 16px;
    }

    .sm-typing { display: flex; gap: 4px; align-items: center; padding: 8px 4px; }
    .sm-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #0F6E56; opacity: 0.5;
      animation: sm-bounce 1.2s infinite;
    }
    .sm-dot:nth-child(2) { animation-delay: 0.2s; }
    .sm-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes sm-bounce {
      0%,60%,100% { transform: translateY(0); opacity: 0.5; }
      30% { transform: translateY(-6px); opacity: 1; }
    }

    .sm-chips {
      display: flex; gap: 6px; flex-wrap: wrap; padding: 2px 0;
    }
    .sm-chip {
      background: #fff; border: 1px solid #c8ddd8;
      border-radius: 20px; padding: 5px 11px;
      font-size: 12px; color: #0F6E56; cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
      white-space: nowrap;
    }
    .sm-chip:hover { background: #E1F5EE; border-color: #0F6E56; }

    .sm-footer {
      background: #fff; border-top: 1px solid #e8f0ee;
      padding: 10px 12px; display: flex; gap: 8px; align-items: flex-end;
    }
    .sm-input {
      flex: 1; border: 1px solid #d0e4df; border-radius: 20px;
      padding: 8px 14px; font-size: 13.5px; outline: none;
      background: #f7faf9; color: #1a2e28; resize: none;
      max-height: 72px; min-height: 36px; line-height: 1.4;
      font-family: inherit;
      transition: border-color 0.15s;
    }
    .sm-input:focus { border-color: #0F6E56; background: #fff; }
    .sm-send {
      width: 36px; height: 36px; border-radius: 50%;
      background: #0F6E56; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: opacity 0.15s; color: #fff;
    }
    .sm-send:hover { opacity: 0.85; }
    .sm-send:disabled { opacity: 0.4; cursor: not-allowed; }
    .sm-send svg { width: 16px; height: 16px; }

    .sm-disclaimer {
      background: #fff; text-align: center;
      font-size: 10.5px; color: #8aada6; padding: 6px 10px 10px;
    }

    @media (max-width: 400px) {
      #sm-panel { width: calc(100vw - 24px); right: 12px; bottom: 90px; }
      #sm-bubble { right: 16px; bottom: 16px; }
    }
  `;
  document.head.appendChild(style);

  /* ─── Build HTML ─── */
  const panel = document.createElement('div');
  panel.id = 'sm-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'SereneMind AI Support Chat');
  panel.innerHTML = `
    <div class="sm-header">
      <div class="sm-avatar">☯</div>
      <div class="sm-hinfo">
        <p class="sm-hname"><span class="sm-online"></span>SereneMind Support</p>
        <p class="sm-hsub">Gentle AI companion • Always here</p>
      </div>
      <button class="sm-close" id="smClose" aria-label="Close chat">×</button>
    </div>
    <div class="sm-body" id="smBody">
      <div class="sm-msg bot">
        <div class="sm-icon">🌿</div>
        <div class="sm-bubble-msg">Hi, I'm glad you're here. This is a safe space. How are you feeling right now? 💚</div>
      </div>
      <div class="sm-chips" id="smChips">
        <span class="sm-chip">I'm feeling anxious 😰</span>
        <span class="sm-chip">I can't sleep 🌙</span>
        <span class="sm-chip">I feel overwhelmed 😔</span>
        <span class="sm-chip">Help me calm down 🌬️</span>
      </div>
    </div>
    <div class="sm-footer">
      <textarea class="sm-input" id="smInput" placeholder="Share what's on your mind..." rows="1"></textarea>
      <button class="sm-send" id="smSend" aria-label="Send message">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
    <div class="sm-disclaimer">Not a substitute for professional help. In crisis? Call or text <strong>988</strong>.</div>
  `;
  document.body.appendChild(panel);

  const bubble = document.createElement('button');
  bubble.id = 'sm-bubble';
  bubble.setAttribute('aria-label', 'Open SereneMind chat support');
  bubble.textContent = '☯';
  document.body.appendChild(bubble);

  /* ─── State ─── */
  const SYSTEM = `You are a compassionate, gentle mental wellness support companion for SereneMind — a website dedicated to helping people manage anxiety and find inner peace.

Your role:
- Offer warm, non-judgmental emotional support
- Suggest breathing exercises, grounding techniques (5-4-3-2-1), affirmations, or mindfulness tips when genuinely helpful
- Keep responses SHORT — 2 to 4 sentences max. Be warm, not wordy.
- Never diagnose, prescribe, or give medical advice
- If someone mentions self-harm, suicidal thoughts, or a crisis: respond with deep care and always mention calling or texting 988 (Suicide & Crisis Lifeline, available 24/7)
- Use gentle, human language. Occasional emojis are fine.
- You are a supportive companion, not a therapist.
- If asked about non-wellness topics, gently redirect back to emotional wellbeing.
- If the user writes in Hindi or Hinglish, respond in the same language with equal warmth.`;

  let history = [];
  let busy = false;

  /* ─── Toggle ─── */
  function open() { panel.classList.add('open'); bubble.textContent = '×'; }
  function close() { panel.classList.remove('open'); bubble.textContent = '☯'; }

  bubble.addEventListener('click', () => panel.classList.contains('open') ? close() : open());
  document.getElementById('smClose').addEventListener('click', close);

  /* ─── Chips ─── */
  document.getElementById('smChips').addEventListener('click', e => {
    if (e.target.classList.contains('sm-chip')) {
      const text = e.target.textContent.replace(/[\u{1F000}-\u{1FFFF}]/gu, '').trim();
      send(text);
    }
  });

  /* ─── Input ─── */
  const input = document.getElementById('smInput');
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 72) + 'px';
  });
  document.getElementById('smSend').addEventListener('click', () => send());

  /* ─── Core ─── */
  function scrollBottom() {
    const b = document.getElementById('smBody');
    b.scrollTop = b.scrollHeight;
  }

  function removeChips() {
    const c = document.getElementById('smChips');
    if (c) c.remove();
  }

  function addMsg(role, text) {
    const body = document.getElementById('smBody');
    const div = document.createElement('div');
    div.className = 'sm-msg ' + (role === 'user' ? 'user' : 'bot');
    const safe = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
    if (role === 'bot') {
      div.innerHTML = `<div class="sm-icon">🌿</div><div class="sm-bubble-msg">${safe}</div>`;
    } else {
      div.innerHTML = `<div class="sm-bubble-msg">${safe}</div>`;
    }
    body.appendChild(div);
    scrollBottom();
  }

  function showTyping() {
    const body = document.getElementById('smBody');
    const div = document.createElement('div');
    div.className = 'sm-msg bot'; div.id = 'smTyping';
    div.innerHTML = `<div class="sm-icon">🌿</div><div class="sm-bubble-msg sm-typing"><div class="sm-dot"></div><div class="sm-dot"></div><div class="sm-dot"></div></div>`;
    body.appendChild(div);
    scrollBottom();
  }

  function hideTyping() {
    const t = document.getElementById('smTyping');
    if (t) t.remove();
  }

  async function send(override) {
    if (busy) return;
    const text = override || input.value.trim();
    if (!text) return;

    removeChips();
    if (!override) { input.value = ''; input.style.height = '36px'; }
    addMsg('user', text);
    history.push({ role: 'user', content: text });

    busy = true;
    document.getElementById('smSend').disabled = true;
    showTyping();

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM,
          messages: history
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I'm here with you. Please try again in a moment. 💚";
      hideTyping();
      addMsg('bot', reply);
      history.push({ role: 'assistant', content: reply });
    } catch (e) {
      hideTyping();
      addMsg('bot', "Having a little trouble connecting. Please try again. 🙏");
    }

    busy = false;
    document.getElementById('smSend').disabled = false;
  }
})();
