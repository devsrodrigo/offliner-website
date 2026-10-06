/* Offliner home page logic. Ported from the Claude Design canvas.
   Vue 3 (self-hosted in home/vue.global.prod.js) renders the template in index.html.
   Delimiters are [[ ]] so the file is safe inside a Hugo layout. */
(function () {
class DCLogic {
  constructor(props) { this.props = props || {}; this.state = {}; }
  setState(p) { Object.assign(this.state, typeof p === 'function' ? p(this.state, this.props) : p); schedule(); }
  forceUpdate() { schedule(); }
}
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      heroTab: 'home', insights: false, ruleAdded: false, appSeg: 'detox',
      focusMode: 'pomodoro', focusLen: 25, focusLeft: 1500, focusRunning: false,
      step: 0, paused: false, howVisible: false, howSeen: false,
      picked: { Instagram: true, TikTok: true, YouTube: true, X: false, Reddit: true, Facebook: false, Twitch: false },
      detox: 14, limit: 30, lockSheet: false,
      blockView: 'offliner', closeTries: 0, shake: 'shakeB',
      plan: 'annual', faq: 0
    };
  }
  componentDidMount() {
    // Steps autoplay only while "How does it work?" is on screen. It starts at step 1 the first time it scrolls into view.
    this.startSteps = () => {
      clearInterval(this.stepTimer);
      this.stepTimer = setInterval(() => {
        const auto = this.props.autoplay ?? true;
        if (auto && !this.state.paused && this.state.howVisible) this.setState({ step: (this.state.step + 1) % 5, lockSheet: false });
      }, 6000);
    };
    this.watchHow = () => {
      const el = document.getElementById('how');
      if (!el || typeof IntersectionObserver === 'undefined') { this.setState({ howVisible: true }); this.startSteps(); return; }
      this.io = new IntersectionObserver((entries) => {
        const vis = entries[0].isIntersecting;
        if (vis === this.state.howVisible) return;
        if (vis) {
          const first = !this.state.howSeen;
          this.setState(first ? { howVisible: true, howSeen: true, step: 0 } : { howVisible: true });
          this.startSteps();
        } else {
          this.setState({ howVisible: false });
          clearInterval(this.stepTimer);
        }
      }, { threshold: 0.45 });
      this.io.observe(el);
    };
    this.howTry = setTimeout(this.watchHow, 50);
    this.focusTimer = setInterval(() => {
      if (this.state.focusRunning) {
        const left = this.state.focusLeft - 1;
        if (left <= 0) this.setState({ focusLeft: this.state.focusLen * 60, focusRunning: false });
        else this.setState({ focusLeft: left });
      }
    }, 1000);
  }
  componentWillUnmount() { clearInterval(this.stepTimer); clearInterval(this.focusTimer); clearTimeout(this.howTry); if (this.io) this.io.disconnect(); }
  renderVals() {
    const accent = this.props.accent ?? '#FF5A1F';
    const s = this.state;
    const autoOn = (this.props.autoplay ?? true) && !s.paused;
    const auto = autoOn && !!s.howVisible;
    const pause = { paused: true };

    // ---------- hero app ----------
    const view = s.insights ? 'insights' : s.heroTab;
    const W = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const week = W.map((l, i) => ({
      l,
      bg: i === 0 ? '#FF5A1F' : (i === 1 ? '#FF5A1F' : 'transparent'),
      bd: i < 2 ? '#FF5A1F' : '#4A4A55',
      sh: i === 1 ? '0 0 0 3px #16161C, 0 0 0 5px #FF5A1F' : 'none'
    }));
    const TABS = [['home', 'Home'], ['apps', 'Apps'], ['focus', 'Focus'], ['crew', 'Crew']];
    const tabs = TABS.map(([id, t]) => {
      const on = s.heroTab === id && !s.insights;
      return { t, cls: on ? 'tb on' : 'tb', cur: on ? 'page' : 'false', isHome: id === 'home', isApps: id === 'apps', isFocus: id === 'focus', isCrew: id === 'crew',
        pick: () => this.setState({ heroTab: id, insights: false }) };
    });
    const hb = [1, 2, 4, 3, 2, 2, 5, 4, 3, 2, 3, 4, 5, 6, 8, 9, 6, 2];
    const hourBars = hb.map(v => ({ h: Math.round(v / 9 * 100) + '%', c: v >= 8 ? '#FF5A1F' : '#3A3A44' }));
    const appSegs = [['detox', 'Detox'], ['limited', 'Limited']].map(([id, t]) => ({ t, on: s.appSeg === id, bg: s.appSeg === id ? '#2E2E36' : 'transparent', pick: () => this.setState({ appSeg: id }) }));
    const TILE = { Instagram: '#8A3B5E', TikTok: '#2A2A30', YouTube: '#8E2A22', X: '#3A3A42', Reddit: '#9A4A1E', Facebook: '#2D4A86', Twitch: '#5B3A92' };
    const appRows = s.appSeg === 'detox'
      ? [['Instagram', 'Detox · day 6 of 14'], ['TikTok', 'Detox · day 6 of 14'], ['Reddit', 'Detox · day 6 of 14'], ['Twitch', 'Detox · day 6 of 14']]
      : [['YouTube', '30 min a day'], ['X', '20s countdown'], ['Facebook', 'Friend gives access']];
    const appRowsV = appRows.map(([n, st]) => ({ n, s: st, i: n[0], tile: TILE[n], ic: s.appSeg === 'detox' ? '#FF5A1F' : '#9C9CA8' }));

    const total = s.focusLen * 60;
    const mm = Math.floor(s.focusLeft / 60), ss = s.focusLeft % 60;
    const focusClock = String(mm).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
    const focusDeg = Math.round((s.focusLeft / total) * 360) + 'deg';
    const focusModes = [['pomodoro', 'Pomodoro'], ['timer', 'Timer']].map(([id, t]) => ({ t, cls: 'chipo press' + (s.focusMode === id ? ' on' : ''), pick: () => this.setState({ focusMode: id }) }));
    const focusLens = [25, 50, 90].map(m => ({ t: m + ' min', cls: 'chipo press' + (s.focusLen === m ? ' on' : ''), pick: () => this.setState({ focusLen: m, focusLeft: m * 60, focusRunning: false }) }));
    const focusSub = s.focusRunning ? (s.focusMode === 'pomodoro' ? 'Focus · break at 0:00' : 'Focus') : 'Ready';

    // ---------- steps ----------
    const STEPS = [
      { n: '01', t: 'Pick the apps', d: 'Select the apps you want to block.' },
      { n: '02', t: 'Set up the detox', d: 'Select how long you want to detox from these apps. They will be completely blocked in this period.' },
      { n: '03', t: 'Set the daily limit', d: 'Select the daily limit allowed for the apps once you finish the detox.' },
      { n: '04', t: 'Stay in control', d: 'Keep your usage under your set limit to keep your streak. Lock Mode makes this easy.' },
      { n: '05', t: 'Become an Offliner', d: 'Turn hours of scrolling into time for the things you want to accomplish, whether that is getting fit, building a business, learning a skill, or simply having more time for yourself.' }
    ];
    const steps = STEPS.map((x, i) => {
      const active = i === s.step;
      return { ...x, active, fg: active ? '#16130F' : '#6E6558', showProg: active && auto, showStatic: active && !auto,
        pick: () => this.setState({ step: i, paused: true, lockSheet: false }) };
    });
    const pickApps = Object.keys(s.picked).map(n => {
      const on = s.picked[n];
      return { n, on, i: n[0], tile: TILE[n], bg: on ? '#FF5A1F' : 'transparent', bd: on ? '#FF5A1F' : '#4A4A55',
        toggle: () => { const p = { ...this.state.picked }; p[n] = !p[n]; this.setState({ picked: p, paused: true }); } };
    });
    const pickedCount = Object.values(s.picked).filter(Boolean).length;
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + s.detox);
    const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const detoxEnd = MON[end.getMonth()] + ' ' + end.getDate();
    const detoxOpts = [7, 14, 21, 30].map(d => ({ t: d + 'd', cls: 'chipo press' + (s.detox === d ? ' on' : ''), pick: () => this.setState({ detox: d, paused: true }) }));
    const limitNote = s.limit <= 30 ? 'Under your limit, the streak keeps going.' : 'With Lock Mode on, any change to this lands tomorrow.';
    const timeBack = [['Reading', 72, '#FF5A1F', '9h'], ['Training', 58, '#FF7A40', '7h'], ['Sleep', 40, '#FFB020', '5h'], ['Journal', 18, '#9C9CA8', '2h']]
      .map(([k, w, c, v]) => ({ k, w: w + '%', c, v }));

    // ---------- block screen ----------
    const lines = ['Locked until 12:00. No way in before then.', 'Still locked until 12:00.', 'There is no other button.', 'Locked until 12:00. Try a book.'];
    const blockTabs = [['offliner', 'Offliner'], ['st', 'Screen Time']].map(([id, t]) => ({ t, on: s.blockView === id, bg: s.blockView === id ? '#F3EEE4' : 'transparent', fg: s.blockView === id ? '#16130F' : '#F3EEE4', pick: () => this.setState({ blockView: id }) }));
    const blockCaption = s.blockView === 'st'
      ? 'Screen Time puts an "Ignore Limit" button on every block screen. It takes about a second and a half to tap.'
      : 'Offliner has no instant unlock anywhere in the app. Tap Close as many times as you like.';

    // ---------- pricing ----------
    const PL = [
      { id: 'weekly', name: 'Weekly', price: '$4.99', per: '/ week', weekly: '$4.99 a week', save: '' },
      { id: 'monthly', name: 'Monthly', price: '$9.99', per: '/ month', weekly: 'About $2.31 a week', save: 'Save 54%' },
      { id: 'annual', name: 'Annual', price: '$29.99', per: '/ year', weekly: 'About $0.58 a week', save: 'Save 88%' }
    ];
    const plans = PL.map(p => {
      const on = s.plan === p.id;
      return { ...p, on, hasSave: !!p.save, bg: on ? '#0B0A09' : '#FBF8F2', fg: on ? '#F3EEE4' : '#16130F', border: on ? '#0B0A09' : '#DCD3C3',
        dot: on ? accent : 'transparent', rule: on ? '#2A2620' : '#DCD3C3', saveC: on ? accent : '#16130F', pick: () => this.setState({ plan: p.id }) };
    });
    const planName = PL.find(p => p.id === s.plan).name;

    // ---------- FAQ (copy from offliner.app) ----------
    const FAQ = [
      { q: 'What is the Offliner app?', paras: ['Offliner is a screen time and app blocking app for iPhone and iPad. You choose which apps to detox from and which to limit, Offliner enforces it, and every day you stay under your limits counts towards a streak.'] },
      { q: 'How is it different from Apple Screen Time?', paras: [
        'Screen Time puts an "Ignore Limit" button on every block screen. It takes about a second and a half to tap, and once you have tapped it once, you will tap it every time. Offliner has no instant unlock anywhere in the app, and Lock Mode means you cannot quietly loosen a rule in the moment you crave. Turn it off and the change only lands tomorrow, when you are calm again.',
        'Then it does the part Screen Time does not attempt at all. Blocking an app leaves a gap, and a gap with nothing in it sends you to the next app on the home screen. So the block screen hands you four things that are already inside Offliner: a library of books to read, a journal to work out what set the craving off, your habits to log, and Echo, which is there at 3am when the craving is. You replace the scroll rather than just losing it.',
        'Screen Time gives you a chart at the end of the week. This gives you something to lose.'] },
      { q: 'What is Lock Mode?', paras: ['It is the thing that stops you negotiating with yourself. Lock Mode is on by default. While it is on you cannot edit or delete a rule inside its active window, and you cannot pull an app out of a detox early. If you turn it off, it only takes effect the next day, so the decision is never made in the middle of a craving.'] },
      { q: 'How do levels and XP work?', paras: ['You earn one point for every minute you are not in a distracting app. A day is 1,440 minutes, so a fully offline day is worth 1,440 points before your streak multiplier. Nothing else pays, including opening Offliner itself. Higher levels take more, and every five levels unlocks something new inside the app.'] },
      { q: 'Do I need an account?', paras: ['Offliner is available on the App Store with a subscription for the full feature set. No sign up and no account. Everything is worked out on your phone and stays there, and Apple hides app names from developers, so nobody here can see which apps you picked.'] }
    ];
    const faqs = FAQ.map((f, i) => {
      const open = s.faq === i;
      return { ...f, open, rot: open ? '45deg' : '0deg', iconBg: open ? '#16130F' : 'transparent', iconFg: open ? '#F3EEE4' : '#16130F', toggle: () => this.setState({ faq: open ? -1 : i }) };
    });

    const finalDays = Array.from({ length: 14 }, (_, i) => ({ n: i + 1, bg: i === 0 ? '#FF5A1F' : 'transparent', bd: i === 0 ? '#FF5A1F' : '#3A3530', fg: i === 0 ? '#FFFFFF' : '#6E6558' }));
    const marqueeBase = ['Instagram', 'TikTok', 'YouTube', 'X', 'Reddit', 'Facebook', 'Twitch'];

    return {
      accent,
      hHome: view === 'home', hInsights: view === 'insights', hApps: view === 'apps', hFocus: view === 'focus', hCrew: view === 'crew',
      week, tabs, hourBars, appSegs, appRows: appRowsV,
      openInsights: () => this.setState({ insights: true }), goHome: () => this.setState({ insights: false, heroTab: 'home' }),
      ruleOff: !s.ruleAdded, ruleOn: s.ruleAdded, addRule: () => this.setState({ ruleAdded: true }),
      focusClock, focusDeg, focusModes, focusLens, focusSub, focusBtn: s.focusRunning ? 'Pause' : (s.focusLeft < total ? 'Resume' : 'Start session'),
      toggleFocus: () => this.setState({ focusRunning: !this.state.focusRunning }),
      marquee: marqueeBase.concat(marqueeBase, marqueeBase, marqueeBase),
      steps, autoLabel: autoOn ? 'Pause autoplay' : 'Resume autoplay', toggleAuto: () => this.setState({ paused: !this.state.paused }),
      st0: s.step === 0, st1: s.step === 1, st2: s.step === 2, st3: s.step === 3, st4: s.step === 4,
      nextStep: () => this.setState({ step: Math.min(4, this.state.step + 1), paused: true }),
      restartSteps: () => this.setState({ step: 0, paused: true }),
      pickApps, pickedCount, detox: s.detox, detoxEnd, detoxOpts,
      limit: s.limit, limitPct: Math.round(s.limit / 120 * 100) + '%', limitNote,
      limitDown: () => this.setState({ limit: Math.max(5, this.state.limit - 5), paused: true }),
      limitUp: () => this.setState({ limit: Math.min(120, this.state.limit + 5), paused: true }),
      lockSheet: s.lockSheet, lockSub: 'On. Changes land tomorrow.',
      tryLockOff: () => this.setState({ lockSheet: true, paused: true }), closeSheet: () => this.setState({ lockSheet: false }),
      timeBack,
      showOff: s.blockView === 'offliner', showST: s.blockView === 'st', blockTabs, blockCaption,
      shakeClass: s.shake, lockedLine: lines[Math.min(s.closeTries, lines.length - 1)],
      tryClose: () => this.setState({ closeTries: this.state.closeTries + 1, shake: this.state.shake === 'shakeA' ? 'shakeB' : 'shakeA' }),
      plans, planName, faqs, finalDays
    };
  }
}

const props = { accent: '#FF5A1F', autoplay: true };
const comp = new Component(props);
const store = Vue.reactive(comp.renderVals());
let queued = false;
function schedule() {
  if (queued) return; queued = true;
  queueMicrotask(function () { queued = false; Object.assign(store, comp.renderVals()); });
}
const app = Vue.createApp({ setup: function () { return store; } });
app.config.compilerOptions.delimiters = ['[[', ']]'];
app.mount('#app');
if (comp.componentDidMount) Vue.nextTick(function () { comp.componentDidMount(); });
})();
