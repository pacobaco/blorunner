let currentMatchId = null;

async function getUser() {
  const res = await fetch('/auth/user', { credentials: 'include' });
  if (!res.ok) {
    window.location.href = '/';
    return null;
  }
  return await res.json();
}

async function init() {
  const user = await getUser();
  if (user) {
    document.getElementById('welcome').textContent =
      `Welcome, ${user.name} | Credits: ${user.credits}`;
  }
}

async function createMatch() {
  const res = await fetch('/api/game/match/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      mode: 'urban',
      layout: 'unknown',
      searchLevel: 'standard'
    })
  });
  const match = await res.json();
  currentMatchId = match.matchId;
  renderMatch(match);
}

async function joinSide(side) {
  if (!currentMatchId) return alert('Create or select a match first');
  const res = await fetch(`/api/game/match/${currentMatchId}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ side })
  });
  const match = await res.json();
  if (match.error) return alert(match.error);
  renderMatch(match);
}

async function startMatch() {
  if (!currentMatchId) return;
  const res = await fetch(`/api/game/match/${currentMatchId}/start`, {
    method: 'POST',
    credentials: 'include'
  });
  const match = await res.json();
  if (match.error) return alert(match.error);
  alert(`Match ${match.matchId} started!`);
  renderMatch(match);
}

function renderMatch(match) {
  document.getElementById('matchInfo').innerHTML = `
    <strong>ID:</strong> ${match.matchId}<br>
    <strong>Status:</strong> ${match.status}<br>
    <strong>Mode:</strong> ${match.mode} | Layout: ${match.layout} | Search: ${match.searchLevel}<br>
    <strong>Handicap:</strong> ${match.handicap?.type || 'none'} +${match.handicap?.value || 0}%
  `;

  document.getElementById('teams').style.display = 'flex';
  document.getElementById('startBtn').style.display =
    match.status === 'waiting' ? 'inline-block' : 'none';

  // Simple list rendering (can be improved)
  const atk = match.attackers?.map(u => u.name || u).join(', ') || 'None';
  const def = match.defenders?.map(u => u.name || u).join(', ') || 'None';
  document.getElementById('attackersList').textContent = atk;
  document.getElementById('defendersList').textContent = def;
}

init();
