const teams = [
  { id: "lg", code: "LG", name: "LG 트윈스", english: "LG Twins", short: "LG", region: "서울", stadium: "잠실야구장", manager: "염경엽", color: "#b41632", logo: "https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/eng/resources/images/ebl/regular/fixed/ebl_ft_LG.png", website: "https://www.lgtwins.com/", identity: "서울 잠실을 두산과 함께 쓰는 인기 구단이며, 최근 우승권 전력을 유지하고 있습니다." },
  { id: "samsung", code: "SS", name: "삼성 라이온즈", english: "Samsung Lions", short: "삼성", region: "대구", stadium: "대구 삼성 라이온즈 파크", manager: "박진만", color: "#0754a2", logo: "https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/eng/resources/images/ebl/regular/fixed/ebl_ft_SS.png", website: "https://www.samsunglions.com/", identity: "KBO 원년 구단 중 하나로, 대구를 대표하는 전통의 인기 팀입니다." },
  { id: "kt", code: "KT", name: "kt wiz", english: "kt wiz", short: "KT", region: "수원", stadium: "수원 KT위즈파크", manager: "이강철", color: "#111111", logo: "https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/eng/resources/images/ebl/regular/fixed/ebl_ft_KT.png", website: "https://www.ktwiz.co.kr/", identity: "비교적 젊은 구단이지만 빠르게 강팀 반열에 오른 수원 연고 팀입니다." },
  { id: "kia", code: "HT", name: "KIA 타이거즈", english: "KIA Tigers", short: "KIA", region: "광주", stadium: "광주-기아 챔피언스 필드", manager: "이범호", color: "#c91f2e", logo: "https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/eng/resources/images/ebl/regular/fixed/ebl_ft_HT.png", website: "https://tigers.co.kr/", identity: "해태 타이거즈 시절부터 이어진 최다 우승 계보를 가진 명문 구단입니다." },
  { id: "doosan", code: "OB", name: "두산 베어스", english: "Doosan Bears", short: "두산", region: "서울", stadium: "잠실야구장", manager: "김원형", color: "#10163a", logo: "https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/eng/resources/images/ebl/regular/fixed/ebl_ft_OB.png", website: "https://www.doosanbears.com/", identity: "꾸준한 포스트시즌 경쟁력과 탄탄한 선수 육성으로 잘 알려진 팀입니다." },
  { id: "hanwha", code: "HH", name: "한화 이글스", english: "Hanwha Eagles", short: "한화", region: "대전", stadium: "대전 한화생명 볼파크", manager: "김경문", color: "#f37321", logo: "https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/eng/resources/images/ebl/regular/fixed/ebl_ft_HH.png", website: "https://www.hanwhaeagles.co.kr/", identity: "충청권을 대표하며 팬들의 응원 열기가 강한 구단입니다." },
  { id: "nc", code: "NC", name: "NC 다이노스", english: "NC Dinos", short: "NC", region: "창원", stadium: "창원NC파크", manager: "이호준", color: "#315288", logo: "https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/eng/resources/images/ebl/regular/fixed/ebl_ft_NC.png", website: "https://www.ncdinos.com/", identity: "창원을 연고로 하는 젊은 구단으로 현대적인 운영 이미지가 강합니다." },
  { id: "lotte", code: "LT", name: "롯데 자이언츠", english: "Lotte Giants", short: "롯데", region: "부산", stadium: "사직야구장", manager: "김태형", color: "#002955", logo: "https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/eng/resources/images/ebl/regular/fixed/ebl_ft_LT.png", website: "https://www.giantsclub.com/", identity: "부산 사직의 뜨거운 응원 문화로 KBO를 대표하는 흥행 구단입니다." },
  { id: "ssg", code: "SK", name: "SSG 랜더스", english: "SSG Landers", short: "SSG", region: "인천", stadium: "인천 SSG 랜더스필드", manager: "이숭용", color: "#ce0e2d", logo: "https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/eng/resources/images/ebl/regular/fixed/ebl_ft_SK.png", website: "https://www.ssglanders.com/", identity: "인천 야구의 정체성을 잇는 공격적인 브랜딩의 구단입니다." },
  { id: "kiwoom", code: "WO", name: "키움 히어로즈", english: "Kiwoom Heroes", short: "키움", region: "서울", stadium: "고척스카이돔", manager: "설종진", color: "#820024", logo: "https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/eng/resources/images/ebl/regular/fixed/ebl_ft_WO.png", website: "https://www.heroesbaseball.co.kr/", identity: "KBO 유일 돔구장을 홈으로 쓰며 선수 발굴 사례가 많은 서울 연고 팀입니다." }
];

const metricLabels = [["rank", "순위"], ["record", "승무패"], ["winPct", "승률"], ["battingAverage", "타율"], ["era", "평균자책점"], ["hits", "안타"], ["homeRuns", "홈런"], ["strikeouts", "탈삼진"], ["runs", "득점"], ["runsAllowed", "실점"]];
const hitterLabels = [["position", "포지션"], ["transfer", "소속팀 이력"], ["battingAverage", "타율"], ["atBats", "타수"], ["homeRuns", "홈런"], ["onBasePercentage", "출루율"], ["walksHitByPitch", "사사구"], ["ops", "OPS"], ["hits", "안타"], ["rbi", "타점"], ["sluggingPercentage", "장타율"], ["strikeouts", "삼진"]];
const pitcherLabels = [["position", "포지션"], ["transfer", "소속팀 이력"], ["pitcherRecord", "승-패-홀-세"], ["innings", "이닝"], ["era", "평균자책점"], ["strikeouts", "탈삼진"], ["whip", "WHIP"], ["qs", "QS"]];
const hitterRankingColumns = [["rank", "순위"], ["name", "선수"], ["team", "팀"], ["games", "경기"], ["plateAppearances", "타석"], ["atBats", "타수"], ["hits", "안타"], ["doubles", "2타"], ["triples", "3타"], ["homeRuns", "홈런"], ["rbi", "타점"], ["runs", "득점"], ["steals", "도루"], ["walksHitByPitch", "사사구"], ["strikeouts", "삼진"], ["battingAverage", "타율"], ["onBasePercentage", "출루율"], ["sluggingPercentage", "장타율"], ["ops", "OPS"]];
const pitcherRankingColumns = [["rank", "순위"], ["name", "선수"], ["team", "팀"], ["era", "평균자책점"], ["games", "경기"], ["wins", "승"], ["losses", "패"], ["saves", "세이브"], ["holds", "홀드"], ["innings", "이닝"], ["strikeouts", "탈삼진"], ["whip", "WHIP"], ["qs", "QS"]];

let stats = [];
let players = [];
let rankings = null;
let selectedTeamId = "lg";
let selectedPlayerTeamId = "lg";
let selectedPlayerId = null;
let selectedRankingType = "hitter";
let selectedRankingMetric = "battingAverage";
let playerSeason = new Date().getFullYear();
const AUTO_REFRESH_MS = 5 * 60 * 1000;

const tableBody = document.querySelector("#statsTableBody");
const teamDetail = document.querySelector("#teamDetail");
const searchInput = document.querySelector("#teamSearch");
const sortSelect = document.querySelector("#sortSelect");
const refreshButton = document.querySelector("#refreshButton");
const updatedAt = document.querySelector("#updatedAt");
const leaderTeam = document.querySelector("#leaderTeam");
const bestAvg = document.querySelector("#bestAvg");
const bestEra = document.querySelector("#bestEra");
const playerTeamList = document.querySelector("#playerTeamList");
const playerList = document.querySelector("#playerList");
const playerDetail = document.querySelector("#playerDetail");
const playerSearch = document.querySelector("#playerSearch");
const playerTypeFilter = document.querySelector("#playerTypeFilter");
const selectedTeamTitle = document.querySelector("#selectedTeamTitle");
const rankingMetricButtons = document.querySelector("#rankingMetricButtons");
const rankingTitle = document.querySelector("#rankingTitle");
const rankingUpdatedAt = document.querySelector("#rankingUpdatedAt");
const rankingTableHead = document.querySelector("#rankingTableHead");
const rankingTableBody = document.querySelector("#rankingTableBody");

function teamById(id) {
  return teams.find((team) => team.id === id);
}

function teamByCode(code) {
  return teams.find((team) => team.code === code);
}

function decorateStats(rawStats) {
  return rawStats.map((item) => ({ ...item, team: teamById(item.id) })).filter((item) => item.team);
}

async function loadJsonWithFallback(path, fallback) {
  let payload = fallback;
  try {
    const response = await fetch(`${path}?cache=${Date.now()}`);
    if (response.ok) payload = await response.json();
  } catch (error) {
    console.info(`JSON fetch failed for ${path}. Using bundled data.`, error);
  }
  return payload;
}

async function loadStats() {
  const teamPayload = await loadJsonWithFallback("data/team-stats.json", window.KBO_TEAM_STATS);
  const playerPayload = await loadJsonWithFallback("data/player-stats.json", window.KBO_PLAYER_STATS);
  const rankingPayload = await loadJsonWithFallback("data/player-rankings.json", window.KBO_PLAYER_RANKINGS);
  if (!teamPayload) throw new Error("팀 기록 데이터 파일을 읽지 못했습니다.");
  if (!playerPayload) throw new Error("선수 기록 데이터 파일을 읽지 못했습니다.");

  stats = decorateStats(teamPayload.teams);
  rankings = rankingPayload;
  playerSeason = playerPayload.season ?? playerSeason;
  players = playerPayload.players.map((player) => ({ ...player, team: teamById(player.teamId) })).filter((player) => player.team);
  selectedTeamId = stats.some((team) => team.id === selectedTeamId) ? selectedTeamId : stats[0]?.id ?? selectedTeamId;
  const currentTeamPlayers = getTeamPlayers(selectedPlayerTeamId);
  selectedPlayerId = currentTeamPlayers.some((player) => player.id === selectedPlayerId) ? selectedPlayerId : currentTeamPlayers[0]?.id ?? null;
  updatedAt.textContent = teamPayload.asOf;
  render();
  renderPlayers();
  renderRankings();
}

function format(value, fallback = "-") {
  return value === undefined || value === null || value === "" ? fallback : value;
}

function teamLogo(team, size = "table") {
  return `<span class="team-logo team-logo-${size}" aria-hidden="true"><img src="${team.logo}" alt="" loading="lazy" onerror="this.closest('.team-logo').classList.add('is-fallback')" /><span>${team.short}</span></span>`;
}

function playerPhoto(player, size = "list") {
  const src = `https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/person/kbo/${playerSeason}/${player.id}.png`;
  return `<span class="player-photo player-photo-${size}" aria-hidden="true"><img src="${src}" alt="" loading="lazy" onerror="this.src='https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/person/small/no-Image.png'" /></span>`;
}

function getFilteredStats() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = stats.filter((item) => {
    const team = item.team;
    const haystack = [team.name, team.english, team.short, team.region, team.stadium, team.manager].join(" ").toLowerCase();
    return !query || haystack.includes(query);
  });
  const sortKey = sortSelect.value;
  return [...filtered].sort((a, b) => {
    if (sortKey === "era") return Number(a.era) - Number(b.era);
    if (sortKey === "rank") return Number(a.rank) - Number(b.rank);
    return Number(b[sortKey]) - Number(a[sortKey]);
  });
}

function renderSummary() {
  const first = [...stats].sort((a, b) => Number(a.rank) - Number(b.rank))[0];
  const avgLeader = [...stats].sort((a, b) => Number(b.battingAverage) - Number(a.battingAverage))[0];
  const eraLeader = [...stats].sort((a, b) => Number(a.era) - Number(b.era))[0];
  leaderTeam.textContent = first ? first.team.name : "-";
  bestAvg.textContent = avgLeader ? `${avgLeader.team.short} ${avgLeader.battingAverage}` : "-";
  bestEra.textContent = eraLeader ? `${eraLeader.team.short} ${eraLeader.era}` : "-";
}

function renderTable() {
  const rows = getFilteredStats();
  if (!rows.length) {
    tableBody.innerHTML = `<tr><td colspan="13"><div class="empty-state">조건에 맞는 팀을 찾지 못했습니다.</div></td></tr>`;
    teamDetail.innerHTML = "";
    return;
  }
  if (!rows.some((row) => row.id === selectedTeamId)) selectedTeamId = rows[0].id;
  tableBody.innerHTML = rows.map((item) => {
    const team = item.team;
    return `<tr class="team-row ${item.id === selectedTeamId ? "is-active" : ""}" data-team-id="${item.id}" style="--team-color: ${team.color}">
      <td class="rank-cell">${format(item.rank)}</td><td><div class="team-cell">${teamLogo(team)}<span>${team.name}</span></div></td>
      <td>${format(item.wins)}</td><td>${format(item.draws)}</td><td>${format(item.losses)}</td><td>${format(item.winPct)}</td>
      <td>${format(item.battingAverage)}</td><td>${format(item.era)}</td><td>${format(item.hits)}</td><td>${format(item.homeRuns)}</td>
      <td>${format(item.strikeouts)}</td><td>${format(item.runs)}</td><td>${format(item.runsAllowed)}</td></tr>`;
  }).join("");
  renderDetail();
}

function renderDetail() {
  const item = stats.find((row) => row.id === selectedTeamId);
  if (!item) return;
  const team = item.team;
  teamDetail.style.setProperty("--team-color", team.color);
  teamDetail.innerHTML = `<div class="detail-hero">${teamLogo(team, "detail")}<h2>${team.name}</h2><p>${team.region} · ${team.stadium}</p></div>
    <div class="detail-body"><div class="record-grid">${metricLabels.map(([key, label]) => {
      const value = key === "record" ? `${item.wins}승 ${item.draws}무 ${item.losses}패` : item[key];
      return `<div class="record"><span>${label}</span><strong>${format(value)}</strong></div>`;
    }).join("")}</div><section><h3>팀 메모</h3><p>${team.identity}</p></section><section><h3>기본 정보</h3><ul><li>감독: ${team.manager}</li><li>홈구장: ${team.stadium}</li></ul></section><a class="source-link" href="${team.website}" target="_blank" rel="noreferrer">구단 홈페이지 열기</a></div>`;
}

function getTeamPlayers(teamId) {
  const query = playerSearch.value.trim().toLowerCase();
  const type = playerTypeFilter.value;
  return players
    .filter((player) => player.teamId === teamId)
    .filter((player) => type === "all" || player.type === type)
    .filter((player) => !query || player.name.toLowerCase().includes(query))
    .sort((a, b) => a.name.localeCompare(b.name, "ko"));
}

function renderPlayerTeams() {
  playerTeamList.innerHTML = teams.map((team) => {
    const count = players.filter((player) => player.teamId === team.id).length;
    return `<button class="team-select-button ${team.id === selectedPlayerTeamId ? "is-active" : ""}" type="button" data-player-team-id="${team.id}" style="--team-color: ${team.color}">
      ${teamLogo(team)}<span>${team.name}</span><strong>${count}</strong></button>`;
  }).join("");
}

function renderPlayerList() {
  const team = teamById(selectedPlayerTeamId);
  const list = getTeamPlayers(selectedPlayerTeamId);
  selectedTeamTitle.textContent = `${team.name} 선수`;
  if (!list.some((player) => player.id === selectedPlayerId)) selectedPlayerId = list[0]?.id ?? null;

  if (!list.length) {
    playerList.innerHTML = `<div class="empty-state">조건에 맞는 선수가 없습니다.</div>`;
    renderPlayerDetail();
    return;
  }

  const positionOrder = ["투수", "포수", "내야수", "외야수", "지명타자"];
  playerList.innerHTML = positionOrder
    .map((position) => {
      const group = list.filter((player) => (player.positionGroup ?? player.position) === position);
      if (!group.length) return "";
      return `<section class="player-position-group">
        <h4>${position} <span>${group.length}</span></h4>
        <div class="player-position-list">
          ${group.map((player) => `<button class="player-button ${player.id === selectedPlayerId ? "is-active" : ""}" type="button" data-player-id="${player.id}">
            ${playerPhoto(player)}
            <span>${player.name}</span>
            <small>No.${format(player.number)} · ${player.type === "pitcher" ? "투수" : "타자"}</small>
          </button>`).join("")}
        </div>
      </section>`;
    })
    .join("");
  renderPlayerDetail();
}

function renderPlayerDetail() {
  const player = players.find((item) => item.id === selectedPlayerId);
  if (!player) {
    playerDetail.innerHTML = `<div class="empty-state">선수를 선택하세요.</div>`;
    return;
  }
  const team = player.team;
  const labels = player.type === "pitcher" ? pitcherLabels : hitterLabels;
  playerDetail.style.setProperty("--team-color", team.color);
  playerDetail.innerHTML = `<div class="detail-hero player-hero">${playerPhoto(player, "detail")}<div><h2>${player.name}</h2><p>${team.name} · ${player.position}</p></div></div>
    <div class="detail-body"><div class="record-grid">${labels.map(([key, label]) => {
      const value = key === "pitcherRecord"
        ? (player.wins || player.losses || player.holds || player.saves ? `${format(player.wins)}-${format(player.losses)}-${format(player.holds)}-${format(player.saves)}` : "-")
        : key === "transfer" ? (player.transfer ?? "-") : player[key];
      return `<div class="record"><span>${label}</span><strong>${format(value)}</strong></div>`;
    }).join("")}</div><section><h3>선수 기본 정보</h3><ul><li>등번호: ${format(player.number)}</li><li>투타유형: ${format(player.pitchBat)}</li><li>KBO 선수 ID: ${player.id}</li></ul></section></div>`;
}

function renderPlayers() {
  renderPlayerTeams();
  renderPlayerList();
}

function getRankingMetrics() {
  return selectedRankingType === "pitcher" ? rankings?.pitcherMetrics ?? [] : rankings?.hitterMetrics ?? [];
}

function getRankingColumns() {
  return selectedRankingType === "pitcher" ? pitcherRankingColumns : hitterRankingColumns;
}

function getSelectedRanking() {
  return selectedRankingType === "pitcher"
    ? rankings?.pitcher?.[selectedRankingMetric]
    : rankings?.hitter?.[selectedRankingMetric];
}

function renderRankingMetricButtons() {
  const metrics = getRankingMetrics();
  if (!metrics.some((metric) => metric.key === selectedRankingMetric)) {
    selectedRankingMetric = metrics[0]?.key ?? selectedRankingMetric;
  }

  rankingMetricButtons.innerHTML = metrics.map((metric) => (
    `<button class="ranking-metric-button ${metric.key === selectedRankingMetric ? "is-active" : ""}" type="button" data-ranking-metric="${metric.key}">
      ${metric.label}
    </button>`
  )).join("");
}

function renderRankingTable() {
  const ranking = getSelectedRanking();
  const columns = getRankingColumns();
  const typeLabel = selectedRankingType === "pitcher" ? "투수" : "타자";
  const metricLabel = ranking?.label ?? "-";
  rankingTitle.textContent = `${typeLabel} ${metricLabel} TOP 20`;
  rankingUpdatedAt.textContent = rankings?.asOf ?? "-";
  rankingTableHead.innerHTML = `<tr>${columns.map(([, label]) => `<th>${label}</th>`).join("")}</tr>`;

  if (!ranking?.rows?.length) {
    rankingTableBody.innerHTML = `<tr><td colspan="${columns.length}"><div class="empty-state">순위 데이터가 없습니다.</div></td></tr>`;
    return;
  }

  rankingTableBody.innerHTML = ranking.rows.map((row) => (
    `<tr>
      ${columns.map(([key]) => {
        const value = key === "name"
          ? `<strong>${format(row.name)}</strong>`
          : format(row[key]);
        return `<td>${value}</td>`;
      }).join("")}
    </tr>`
  )).join("");
}

function renderRankings() {
  if (!rankingMetricButtons || !rankingTableBody) return;

  if (!rankings) {
    rankingMetricButtons.innerHTML = "";
    rankingTitle.textContent = "KBO 선수 순위";
    rankingUpdatedAt.textContent = "-";
    rankingTableHead.innerHTML = "";
    rankingTableBody.innerHTML = `<tr><td><div class="empty-state">순위 데이터 파일을 읽지 못했습니다.</div></td></tr>`;
    return;
  }

  document.querySelectorAll(".ranking-type-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.rankingType === selectedRankingType);
  });
  renderRankingMetricButtons();
  renderRankingTable();
}

function render() {
  renderSummary();
  renderTable();
}

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-button").forEach((item) => item.classList.toggle("is-active", item === button));
    document.querySelectorAll(".view-panel").forEach((panel) => panel.classList.toggle("is-active", panel.id === `${button.dataset.view}View`));
  });
});

tableBody.addEventListener("click", (event) => {
  const row = event.target.closest("tr[data-team-id]");
  if (!row) return;
  selectedTeamId = row.dataset.teamId;
  renderTable();
});

playerTeamList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-player-team-id]");
  if (!button) return;
  selectedPlayerTeamId = button.dataset.playerTeamId;
  selectedPlayerId = getTeamPlayers(selectedPlayerTeamId)[0]?.id ?? null;
  renderPlayers();
});

playerList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-player-id]");
  if (!button) return;
  selectedPlayerId = button.dataset.playerId;
  renderPlayerList();
});

searchInput.addEventListener("input", renderTable);
sortSelect.addEventListener("change", renderTable);
refreshButton.addEventListener("click", loadStats);
playerSearch.addEventListener("input", renderPlayerList);
playerTypeFilter.addEventListener("change", renderPlayerList);

document.querySelectorAll(".ranking-type-button").forEach((button) => {
  button.addEventListener("click", () => {
    selectedRankingType = button.dataset.rankingType;
    selectedRankingMetric = selectedRankingType === "pitcher" ? "era" : "battingAverage";
    renderRankings();
  });
});

rankingMetricButtons?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-ranking-metric]");
  if (!button) return;
  selectedRankingMetric = button.dataset.rankingMetric;
  renderRankings();
});

loadStats().catch((error) => {
  updatedAt.textContent = "업데이트 실패";
  tableBody.innerHTML = `<tr><td colspan="13"><div class="empty-state">${error.message}</div></td></tr>`;
});

setInterval(() => {
  loadStats().catch((error) => {
    updatedAt.textContent = "업데이트 실패";
    console.info("Auto refresh failed.", error);
  });
}, AUTO_REFRESH_MS);
