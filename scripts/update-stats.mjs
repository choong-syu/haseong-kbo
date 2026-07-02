import { readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const outputPath = join(rootDir, "data", "team-stats.json");
const scriptOutputPath = join(rootDir, "data", "team-stats.js");
const playerOutputPath = join(rootDir, "data", "player-stats.json");
const playerScriptOutputPath = join(rootDir, "data", "player-stats.js");
const rankingOutputPath = join(rootDir, "data", "player-rankings.json");
const rankingScriptOutputPath = join(rootDir, "data", "player-rankings.js");
const positionOverridesPath = join(rootDir, "data", "position-overrides.json");
const season = new Date().getFullYear();

const aliases = new Map([
  ["LG", "lg"],
  ["SAMSUNG", "samsung"],
  ["삼성", "samsung"],
  ["KT", "kt"],
  ["kt", "kt"],
  ["KIA", "kia"],
  ["기아", "kia"],
  ["DOOSAN", "doosan"],
  ["두산", "doosan"],
  ["HANWHA", "hanwha"],
  ["한화", "hanwha"],
  ["NC", "nc"],
  ["LOTTE", "lotte"],
  ["롯데", "lotte"],
  ["SSG", "ssg"],
  ["KIWOOM", "kiwoom"],
  ["키움", "kiwoom"]
]);

const teamCodes = [
  ["LG", "lg"],
  ["SS", "samsung"],
  ["KT", "kt"],
  ["HT", "kia"],
  ["OB", "doosan"],
  ["HH", "hanwha"],
  ["NC", "nc"],
  ["LT", "lotte"],
  ["SK", "ssg"],
  ["WO", "kiwoom"]
];

const teamShortNames = new Map([
  ["lg", "LG"],
  ["samsung", "삼성"],
  ["kt", "KT"],
  ["kia", "KIA"],
  ["doosan", "두산"],
  ["hanwha", "한화"],
  ["nc", "NC"],
  ["lotte", "롯데"],
  ["ssg", "SSG"],
  ["kiwoom", "키움"]
]);

const englishTeamNames = new Map([
  ["LG", "LG"],
  ["SAMSUNG", "삼성"],
  ["KT", "KT"],
  ["KIA", "KIA"],
  ["DOOSAN", "두산"],
  ["HANWHA", "한화"],
  ["NC", "NC"],
  ["LOTTE", "롯데"],
  ["SSG", "SSG"],
  ["KIWOOM", "키움"]
]);

const englishRankingNameOverrides = new Map([
  ["YOU Young Chan", "유영찬"],
  ["KIM Seong Jin", "김성진"],
  ["LEE Eui Lee", "이의리"],
  ["HAN Tae Yang", "한태양"],
  ["DAVIDSON Matthew", "데이비슨"],
  ["BAE Chan Seung", "배찬승"],
  ["OLLER Adam", "올러"],
  ["BOUSHLEY Caleb", "부쉬리"],
  ["CAMERON Daz", "카메론"],
  ["PARK Jeong Min", "박정민"],
  ["ADERLIN Rodriguez", "로드리게스"],
  ["CUSHING John", "쿠싱"],
  ["HAN Seung Hyuk", "한승혁"],
  ["BAE Jae Whan", "배재환"],
  ["RYU Jin Wook", "류진욱"],
  ["KIM Jae Ung", "김재웅"],
  ["JANG Du Seong", "장두성"],
  ["ALCANTARA Raul", "알칸타라"],
  ["JANG Sung Woo", "장성우"],
  ["OH Myeong Jin", "오명진"],
  ["KIM Hun Gon", "김헌곤"]
]);

const transferHistories = new Map([
  [
    "68050",
    `<a href="https://namu.wiki/w/kt%20wiz" target="_blank" rel="noreferrer">kt wiz</a> (2018~2025)<br><a href="https://namu.wiki/w/%ED%95%9C%ED%99%94%20%EC%9D%B4%EA%B8%80%EC%8A%A4" target="_blank" rel="noreferrer">한화 이글스</a> (2026~)`
  ]
]);

function loadPositionOverrides() {
  try {
    return new Map(Object.entries(JSON.parse(readFileSync(positionOverridesPath, "utf8"))));
  } catch {
    return new Map();
  }
}

const positionOverrides = loadPositionOverrides();

const teamHistoryNames = new Map([
  ["LG", "LG 트윈스"],
  ["삼성", "삼성 라이온즈"],
  ["KT", "kt wiz"],
  ["KIA", "KIA 타이거즈"],
  ["두산", "두산 베어스"],
  ["한화", "한화 이글스"],
  ["NC", "NC 다이노스"],
  ["롯데", "롯데 자이언츠"],
  ["SSG", "SSG 랜더스"],
  ["키움", "키움 히어로즈"]
]);

const teamIdHistoryNames = new Map([
  ["lg", "LG 트윈스"],
  ["samsung", "삼성 라이온즈"],
  ["kt", "kt wiz"],
  ["kia", "KIA 타이거즈"],
  ["doosan", "두산 베어스"],
  ["hanwha", "한화 이글스"],
  ["nc", "NC 다이노스"],
  ["lotte", "롯데 자이언츠"],
  ["ssg", "SSG 랜더스"],
  ["kiwoom", "키움 히어로즈"]
]);

function idFor(name) {
  return aliases.get(String(name).trim()) ?? null;
}

function text(value) {
  return String(value ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function formFields(html) {
  const params = new URLSearchParams();
  for (const match of html.matchAll(/<input[^>]+>/gi)) {
    const input = match[0];
    const name = input.match(/name="([^"]+)"/i)?.[1];
    if (!name) continue;
    const value = input.match(/value="([^"]*)"/i)?.[1] ?? "";
    params.set(name.replaceAll("&amp;", "&"), value);
  }
  return params;
}

async function fetchTeamRecord(section, sortData, sortOrder) {
  const body = new URLSearchParams({
    sr_id: "0",
    season_id: String(season),
    sort_data: sortData,
    sort_order: sortOrder,
    section
  });

  const response = await fetch("https://m.koreabaseball.com/ws/Kbo.asmx/GetTeamRecord", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "user-agent": "Mozilla/5.0 KBO team stats updater"
    },
    body
  });

  if (!response.ok) {
    throw new Error(`KBO ${section} record request failed: ${response.status}`);
  }

  const data = await response.json();
  if (data.code !== "100") {
    throw new Error(`KBO ${section} record response failed: ${data.msg ?? "unknown error"}`);
  }

  const table = JSON.parse(data.tableKbo);
  return {
    asOf: table.title,
    rows: data.listKbo.map((item, index) => ({
      teamName: item.T_NM,
      game: Number(item.GAME),
      values: table.rows[index].row.map((cell) => cell.Text)
    }))
  };
}

async function fetchStandings() {
  const today = new Date().toISOString().slice(0, 10);
  const response = await fetch(`https://eng.koreabaseball.com/Standings/TeamStandings.aspx?searchDate=${today}`, {
    headers: { "user-agent": "Mozilla/5.0 KBO team stats updater" }
  });

  if (!response.ok) {
    throw new Error(`KBO standings request failed: ${response.status}`);
  }

  const html = await response.text();
  const tableMatch = html.match(/<table summary="team standings">[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/i);
  if (!tableMatch) {
    throw new Error("Could not find KBO standings table.");
  }

  const rowMatches = [...tableMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  return rowMatches.map((rowMatch) => {
    const cells = [...rowMatch[1].matchAll(/<td[^>]*title="([^"]+)"[^>]*>([\s\S]*?)<\/td>/gi)]
      .map((cell) => [cell[1], cell[2].replace(/<[^>]+>/g, "").trim()]);

    const row = Object.fromEntries(cells);
    return {
      id: idFor(row.TEAM),
      rank: Number(row.RK),
      games: Number(row.GAMES),
      wins: Number(row.W),
      losses: Number(row.L),
      draws: Number(row.D),
      winPct: row.PCT
    };
  }).filter((row) => row.id);
}

async function fetchRegisterPage(teamCode) {
  const first = await fetch("https://www.koreabaseball.com/Player/Register.aspx", {
    headers: { "user-agent": "Mozilla/5.0 KBO player updater" }
  });
  const firstHtml = await first.text();
  const params = formFields(firstHtml);
  params.set("__EVENTTARGET", "ctl00$ctl00$ctl00$cphContents$cphContents$cphContents$btnCalendarSelect");
  params.set("__EVENTARGUMENT", "");
  params.set("ctl00$ctl00$ctl00$cphContents$cphContents$cphContents$hfSearchTeam", teamCode);
  params.set("ctl00$ctl00$ctl00$cphContents$cphContents$cphContents$hfSearchDate", `${season}0702`);

  const response = await fetch("https://www.koreabaseball.com/Player/Register.aspx", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "user-agent": "Mozilla/5.0 KBO player updater"
    },
    body: params
  });

  if (!response.ok) throw new Error(`KBO register request failed: ${teamCode} ${response.status}`);
  return response.text();
}

function parseRegisteredPlayers(html, teamId) {
  const players = [];
  const tables = [...html.matchAll(/<table class="tNData"[\s\S]*?<\/table>/gi)].map((match) => match[0]);

  for (const table of tables) {
    if (!table.includes("선수등록명단")) continue;
    const headers = [...table.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((match) => text(match[1]));
    const position = headers[1];
    if (!["투수", "포수", "내야수", "외야수"].includes(position)) continue;

    for (const rowMatch of table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
      const row = rowMatch[1];
      const link = row.match(/playerId=(\d+)">([\s\S]*?)<\/a>/i);
      if (!link) continue;
      const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => text(match[1]));
      const override = positionOverrides.get(link[1]);
      players.push({
        id: link[1],
        name: text(link[2]),
        teamId,
        number: cells[0] ?? "",
        position: override?.position ?? position,
        positionGroup: override?.positionGroup ?? position,
        type: position === "투수" ? "pitcher" : "hitter",
        pitchBat: cells[2] ?? "",
        transfer: transferHistories.get(link[1]) ?? ""
      });
    }
  }

  return players;
}

async function fetchRosterPlayers() {
  const groups = await Promise.all(teamCodes.map(async ([code, teamId]) => {
    const html = await fetchRegisterPage(code);
    return parseRegisteredPlayers(html, teamId);
  }));

  return groups.flat();
}

function parsePlayerStatRows(html) {
  const rows = [];
  for (const rowMatch of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const row = rowMatch[1];
    const link = row.match(/playerId=(\d+)">([\s\S]*?)<\/a>/i);
    if (!link) continue;
    const data = {};
    for (const cell of row.matchAll(/<td[^>]*data-id="([^"]+)"[^>]*>([\s\S]*?)<\/td>/gi)) {
      data[cell[1]] = text(cell[2]);
    }
    const plainCells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => text(match[1]));
    rows.push({
      id: link[1],
      name: text(link[2]),
      teamName: plainCells[2],
      data
    });
  }
  return rows;
}

const hitterRankingMetrics = [
  ["games", "경기", "GAME_CN"],
  ["plateAppearances", "타석", "PA_CN"],
  ["atBats", "타수", "AB_CN"],
  ["hits", "안타", "HIT_CN"],
  ["doubles", "2타", "H2_CN"],
  ["triples", "3타", "H3_CN"],
  ["homeRuns", "홈런", "HR_CN"],
  ["rbi", "타점", "RBI_CN"],
  ["runs", "득점", "RUN_CN"],
  ["steals", "도루", "SB_CN"],
  ["walksHitByPitch", "사사구", "BB_CN"],
  ["strikeouts", "삼진", "KK_CN"],
  ["battingAverage", "타율", "HRA_RT"],
  ["onBasePercentage", "출루율", "OBP_RT"],
  ["sluggingPercentage", "장타율", "SLG_RT"],
  ["ops", "OPS", "OPS_RT"]
];

const pitcherRankingMetrics = [
  ["era", "평균자책점", "ERA_RT", "ASC"],
  ["games", "경기", "GAME_CN", "DESC"],
  ["wins", "승", "W_CN", "DESC"],
  ["losses", "패", "L_CN", "DESC"],
  ["saves", "세이브", "SV_CN", "DESC"],
  ["holds", "홀드", "HOLD_CN", "DESC"],
  ["innings", "이닝", "INN2_CN", "DESC"],
  ["strikeouts", "탈삼진", "KK_CN", "DESC"],
  ["whip", "WHIP", "WHIP_RT", "ASC"],
  ["qs", "QS", "QS_CN", "DESC"]
];

function parseEnglishLeaderboardRows(html) {
  const table = html.match(/<table[^>]*>[\s\S]*?<\/table>/i)?.[0] ?? "";
  return [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((rowMatch) => rowMatch[1])
    .filter((row) => /<td/i.test(row))
    .map((row) => {
      const values = {};
      for (const cell of row.matchAll(/<td[^>]*title="([^"]+)"[^>]*>([\s\S]*?)<\/td>/gi)) {
        values[cell[1]] = text(cell[2]);
      }
      const link = row.match(/pcode=(\d+)"[^>]*>([\s\S]*?)<\/a>/i);
      return {
        id: link?.[1] ?? "",
        rank: values.RK,
        name: link ? text(link[2]) : values.PLAYER,
        team: values.TEAM,
        values
      };
    })
    .filter((row) => row.id);
}

async function fetchSortedEnglishLeaderboard(url, sort, sortOrder = "DESC") {
  const first = await fetchHtml(url);
  const params = formFields(first);
  const sortName = [...params.keys()].find((key) => key.endsWith("$sort"));
  const sortOrderName = [...params.keys()].find((key) => key.endsWith("$sortOrder"));
  if (sortName) params.set(sortName, sort);
  if (sortOrderName) params.set(sortOrderName, sortOrder);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "user-agent": "Mozilla/5.0 KBO player ranking updater"
    },
    body: params
  });

  if (!response.ok) throw new Error(`KBO leaderboard request failed: ${response.status}`);
  return parseEnglishLeaderboardRows(await response.text());
}

function rankedRows(rows, metricKey) {
  let previousValue = null;
  let previousRank = 0;
  return rows.map((row, index) => {
    const value = row[metricKey] ?? "";
    const rank = index > 0 && value === previousValue ? previousRank : index + 1;
    previousValue = value;
    previousRank = rank;
    return { ...row, rank };
  });
}

function mergeByRankingOrder(primaryRows, secondaryRows, type, metricKey) {
  const secondaryById = new Map(secondaryRows.map((row) => [row.id, row]));
  const rows = primaryRows.slice(0, 20).map((row) => {
    const detail = secondaryById.get(row.id);
    const values = { ...row.values, ...(detail?.values ?? {}) };
    const walks = Number(values.BB || 0);
    const hbp = Number(values.HBP || 0);

    if (type === "hitter") {
      return {
        id: row.id,
        name: row.name,
        team: row.team,
        games: values.G,
        plateAppearances: values.PA,
        atBats: values.AB,
        hits: values.H,
        doubles: values["2B"],
        triples: values["3B"],
        homeRuns: values.HR,
        rbi: values.RBI,
        runs: values.R,
        steals: values.SB,
        walksHitByPitch: Number.isFinite(walks + hbp) ? String(walks + hbp) : "",
        strikeouts: values.SO,
        battingAverage: values.AVG,
        onBasePercentage: values.OBP,
        sluggingPercentage: values.SLG,
        ops: values.OPS
      };
    }

    return {
      id: row.id,
      name: row.name,
      team: row.team,
      era: values.ERA,
      games: values.G,
      wins: values.W,
      losses: values.L,
      saves: values.SV,
      holds: values.HLD,
      innings: values.IP,
      strikeouts: values.SO,
      whip: values.WHIP,
      qs: values.QS
    };
  });

  return rankedRows(rows, metricKey);
}

async function fetchPlayerRankings() {
  const hitterBasicUrl = "https://eng.koreabaseball.com/Stats/BattingLeaders.aspx";
  const hitterDetailUrl = "https://eng.koreabaseball.com/Stats/BattingLeaders02.aspx";
  const pitcherBasicUrl = "https://eng.koreabaseball.com/Stats/PitchingLeaders.aspx";
  const pitcherDetailUrl = "https://eng.koreabaseball.com/Stats/PitchingLeaders02.aspx";

  const hitter = {};
  for (const [key, label, sort] of hitterRankingMetrics) {
    const [basicRows, detailRows] = await Promise.all([
      fetchSortedEnglishLeaderboard(hitterBasicUrl, sort, "DESC"),
      fetchSortedEnglishLeaderboard(hitterDetailUrl, sort, "DESC")
    ]);
    hitter[key] = { key, label, sort, rows: mergeByRankingOrder(basicRows, detailRows, "hitter", key) };
  }

  const pitcher = {};
  for (const [key, label, sort, order] of pitcherRankingMetrics) {
    const [basicRows, detailRows] = await Promise.all([
      fetchSortedEnglishLeaderboard(pitcherBasicUrl, sort, order),
      fetchSortedEnglishLeaderboard(pitcherDetailUrl, sort, order)
    ]);
    pitcher[key] = { key, label, sort, order, rows: mergeByRankingOrder(basicRows, detailRows, "pitcher", key) };
  }

  return {
    hitterMetrics: hitterRankingMetrics.map(([key, label]) => ({ key, label })),
    pitcherMetrics: pitcherRankingMetrics.map(([key, label]) => ({ key, label })),
    hitter,
    pitcher
  };
}

function localizeRankingNames(rankings, rosterPlayers) {
  const rosterById = new Map(rosterPlayers.map((player) => [player.id, player]));
  for (const group of [rankings.hitter, rankings.pitcher]) {
    for (const ranking of Object.values(group)) {
      for (const row of ranking.rows) {
        const player = rosterById.get(row.id);
        row.name = player?.name ?? englishRankingNameOverrides.get(row.name) ?? row.name;
        row.team = teamShortNames.get(player?.teamId) ?? englishTeamNames.get(row.team) ?? row.team;
      }
    }
  }
  return rankings;
}

function parseFirstDataRow(table) {
  const headers = [...table.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((match) => text(match[1]));
  const body = table.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i)?.[1] ?? table;
  const row = body.match(/<tr[^>]*>([\s\S]*?)<\/tr>/i)?.[1];
  if (!row || row.includes("colspan")) return null;
  const cells = [...row.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((match) => text(match[1]));
  return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""]));
}

function parseTableRows(table) {
  const headers = [...table.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((match) => text(match[1]));
  const body = table.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i)?.[1] ?? table;
  return [...body.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((rowMatch) => [...rowMatch[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((match) => text(match[1])))
    .filter((cells) => cells.length)
    .map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""])));
}

async function fetchHtml(url) {
  const response = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 KBO player updater" } });
  if (!response.ok) throw new Error(`KBO player stats request failed: ${response.status}`);
  return response.text();
}

async function fetchPitcherDetailStats(playerId) {
  const html = await fetchHtml(`https://www.koreabaseball.com/Record/Player/PitcherDetail/Basic.aspx?playerId=${playerId}`);
  const tables = [...html.matchAll(/<table[^>]*>[\s\S]*?<\/table>/gi)].map((match) => match[0]);
  if (tables.length < 2) return null;

  const basic = parseFirstDataRow(tables[0]);
  const detail = parseFirstDataRow(tables[1]);
  if (!basic || !detail || (!basic.W && !basic.L)) return null;

  return {
    wins: basic.W,
    losses: basic.L,
    holds: basic.HLD,
    saves: basic.SV,
    innings: basic.IP,
    era: basic.ERA,
    strikeouts: detail.SO,
    whip: detail.WHIP,
    qs: detail.QS
  };
}

async function fetchHitterDetailStats(playerId) {
  const html = await fetchHtml(`https://www.koreabaseball.com/Record/Player/HitterDetail/Basic.aspx?playerId=${playerId}`);
  const tables = [...html.matchAll(/<table[^>]*>[\s\S]*?<\/table>/gi)].map((match) => match[0]);
  if (tables.length < 2) return null;

  const basic = parseFirstDataRow(tables[0]);
  const detail = parseFirstDataRow(tables[1]);
  if (!basic || !detail || !basic.AVG) return null;

  const walks = Number(detail.BB || 0);
  const hitByPitch = Number(detail.HBP || 0);

  return {
    battingAverage: basic.AVG,
    atBats: basic.AB,
    homeRuns: basic.HR,
    onBasePercentage: detail.OBP,
    walksHitByPitch: Number.isFinite(walks + hitByPitch) ? String(walks + hitByPitch) : "",
    ops: detail.OPS,
    hits: basic.H,
    rbi: basic.RBI,
    sluggingPercentage: detail.SLG,
    strikeouts: detail.SO
  };
}

function teamHistoryName(teamName) {
  return teamHistoryNames.get(teamName) ?? teamName;
}

function formatHistoryRange(start, end) {
  if (end >= season) return `${start}~`;
  return start === end ? String(start) : `${start}~${end}`;
}

function compactTeamHistory(rows) {
  const seasons = rows
    .map((row) => ({ year: Number(row["연도"]), team: teamHistoryName(row["팀명"]) }))
    .filter((row) => Number.isFinite(row.year) && row.team && row.team !== "통산")
    .sort((a, b) => a.year - b.year);

  const groups = [];
  for (const row of seasons) {
    const last = groups.at(-1);
    if (last && last.team === row.team && last.end + 1 >= row.year) {
      last.end = Math.max(last.end, row.year);
    } else {
      groups.push({ team: row.team, start: row.year, end: row.year });
    }
  }

  return groups.map((group) => `${group.team} (${formatHistoryRange(group.start, group.end)})`).join("<br>");
}

async function fetchPlayerHistory(player) {
  const detailType = player.type === "pitcher" ? "PitcherDetail" : "HitterDetail";
  const html = await fetchHtml(`https://www.koreabaseball.com/Record/Player/${detailType}/Total.aspx?playerId=${player.id}`);
  const table = html.match(/<table[^>]*>[\s\S]*?<\/table>/i)?.[0];
  if (!table) return "";
  return compactTeamHistory(parseTableRows(table));
}

async function addPlayerHistories(players) {
  const chunkSize = 8;

  for (let index = 0; index < players.length; index += chunkSize) {
    const chunk = players.slice(index, index + chunkSize);
    const results = await Promise.all(chunk.map(async (player) => {
      if (transferHistories.has(player.id)) return [player.id, transferHistories.get(player.id)];
      try {
        return [player.id, await fetchPlayerHistory(player)];
      } catch (error) {
        console.warn(`Player history fetch failed: ${player.id} ${player.name}`, error.message);
        return [player.id, ""];
      }
    }));

    for (const [playerId, history] of results) {
      const player = players.find((item) => item.id === playerId);
      if (!player) continue;
      player.transfer = history || `${teamIdHistoryNames.get(player.teamId) ?? player.teamId} (${season}~)`;
    }
  }
}

async function addMissingPitcherStats(players, pitcherMap) {
  const missingPitchers = players.filter((player) => player.type === "pitcher" && !pitcherMap.has(player.id));
  const chunkSize = 8;

  for (let index = 0; index < missingPitchers.length; index += chunkSize) {
    const chunk = missingPitchers.slice(index, index + chunkSize);
    const results = await Promise.all(chunk.map(async (player) => {
      try {
        return [player.id, await fetchPitcherDetailStats(player.id)];
      } catch (error) {
        console.warn(`Pitcher detail fetch failed: ${player.id} ${player.name}`, error.message);
        return [player.id, null];
      }
    }));

    for (const [playerId, stats] of results) {
      if (stats) pitcherMap.set(playerId, stats);
    }
  }
}

async function addMissingHitterStats(players, hitterMap) {
  const missingHitters = players.filter((player) => player.type === "hitter" && !hitterMap.has(player.id));
  const chunkSize = 8;

  for (let index = 0; index < missingHitters.length; index += chunkSize) {
    const chunk = missingHitters.slice(index, index + chunkSize);
    const results = await Promise.all(chunk.map(async (player) => {
      try {
        return [player.id, await fetchHitterDetailStats(player.id)];
      } catch (error) {
        console.warn(`Hitter detail fetch failed: ${player.id} ${player.name}`, error.message);
        return [player.id, null];
      }
    }));

    for (const [playerId, stats] of results) {
      if (stats) hitterMap.set(playerId, stats);
    }
  }
}

async function fetchPlayerStats() {
  const [hitterBasic, hitterDetail, pitcherBasic] = await Promise.all([
    fetchHtml("https://www.koreabaseball.com/Record/Player/HitterBasic/Basic1.aspx?sort=HRA_RT"),
    fetchHtml("https://www.koreabaseball.com/Record/Player/HitterBasic/Basic2.aspx?sort=OBP_RT"),
    fetchHtml("https://www.koreabaseball.com/Record/Player/PitcherBasic/Basic1.aspx?sort=ERA_RT")
  ]);

  const hitterMap = new Map();
  for (const row of parsePlayerStatRows(hitterBasic)) {
    hitterMap.set(row.id, {
      battingAverage: row.data.HRA_RT,
      atBats: row.data.AB_CN,
      homeRuns: row.data.HR_CN,
      hits: row.data.HIT_CN,
      rbi: row.data.RBI_CN
    });
  }

  for (const row of parsePlayerStatRows(hitterDetail)) {
    const existing = hitterMap.get(row.id) ?? {};
    const walks = Number(row.data.BB_CN || 0);
    const hitByPitch = Number(row.data.HP_CN || 0);
    hitterMap.set(row.id, {
      ...existing,
      onBasePercentage: row.data.OBP_RT,
      walksHitByPitch: Number.isFinite(walks + hitByPitch) ? String(walks + hitByPitch) : "",
      ops: row.data.OPS_RT,
      sluggingPercentage: row.data.SLG_RT,
      strikeouts: row.data.KK_CN
    });
  }

  const pitcherMap = new Map();
  for (const row of parsePlayerStatRows(pitcherBasic)) {
    pitcherMap.set(row.id, {
      wins: row.data.W_CN,
      losses: row.data.L_CN,
      holds: row.data.HOLD_CN,
      saves: row.data.SV_CN,
      innings: row.data.INN2_CN,
      era: row.data.ERA_RT,
      strikeouts: row.data.KK_CN,
      whip: row.data.WHIP_RT,
      qs: ""
    });
  }

  return { hitterMap, pitcherMap };
}

function mergeRecords(standings, hitter, pitcher) {
  const byId = new Map(standings.map((row) => [row.id, { ...row }]));

  for (const row of hitter.rows) {
    const id = idFor(row.teamName);
    if (!id || !byId.has(id)) continue;
    Object.assign(byId.get(id), {
      battingAverage: row.values[0],
      homeRuns: Number(row.values[1]),
      runs: Number(row.values[3]),
      hits: Number(row.values[4])
    });
  }

  for (const row of pitcher.rows) {
    const id = idFor(row.teamName);
    if (!id || !byId.has(id)) continue;
    Object.assign(byId.get(id), {
      era: row.values[0],
      runsAllowed: Number(row.values[8]),
      strikeouts: Number(row.values[12])
    });
  }

  return [...byId.values()].sort((a, b) => a.rank - b.rank);
}

const [standings, hitter, pitcher] = await Promise.all([
  fetchStandings(),
  fetchTeamRecord("hitter", "HRA_RT", "DESC"),
  fetchTeamRecord("pitcher", "ERA_RT", "ASC")
]);

const [registeredPlayers, playerStats] = await Promise.all([
  fetchRosterPlayers(),
  fetchPlayerStats()
]);

const playerRankings = localizeRankingNames(await fetchPlayerRankings(), registeredPlayers);

await addMissingPitcherStats(registeredPlayers, playerStats.pitcherMap);
await addMissingHitterStats(registeredPlayers, playerStats.hitterMap);
await addPlayerHistories(registeredPlayers);

const payload = {
  season,
  asOf: hitter.asOf,
  fetchedAt: new Date().toISOString(),
  source: {
    standings: "https://eng.koreabaseball.com/Standings/TeamStandings.aspx",
    hitter: "https://m.koreabaseball.com/Kbo/Record/TeamRecord_hitter.aspx",
    pitcher: "https://m.koreabaseball.com/Kbo/Record/TeamRecord_pitcher.aspx"
  },
  teams: mergeRecords(standings, hitter, pitcher)
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
await writeFile(scriptOutputPath, `window.KBO_TEAM_STATS = ${JSON.stringify(payload, null, 2)};\n`, "utf8");

const playerPayload = {
  season,
  asOf: payload.asOf,
  fetchedAt: new Date().toISOString(),
  source: {
    roster: "https://www.koreabaseball.com/Player/Register.aspx",
    hitterBasic: "https://www.koreabaseball.com/Record/Player/HitterBasic/Basic1.aspx",
    hitterDetail: "https://www.koreabaseball.com/Record/Player/HitterBasic/Basic2.aspx",
    pitcherBasic: "https://www.koreabaseball.com/Record/Player/PitcherBasic/Basic1.aspx"
  },
  players: registeredPlayers
    .map((player) => ({
      ...player,
      ...(player.type === "pitcher" ? playerStats.pitcherMap.get(player.id) : playerStats.hitterMap.get(player.id))
    }))
    .sort((a, b) => a.teamId.localeCompare(b.teamId) || a.name.localeCompare(b.name, "ko"))
};

await writeFile(playerOutputPath, `${JSON.stringify(playerPayload, null, 2)}\n`, "utf8");
await writeFile(playerScriptOutputPath, `window.KBO_PLAYER_STATS = ${JSON.stringify(playerPayload, null, 2)};\n`, "utf8");

const rankingPayload = {
  season,
  asOf: payload.asOf,
  fetchedAt: new Date().toISOString(),
  source: {
    hitterBasic: "https://eng.koreabaseball.com/Stats/BattingLeaders.aspx",
    hitterDetail: "https://eng.koreabaseball.com/Stats/BattingLeaders02.aspx",
    pitcherBasic: "https://eng.koreabaseball.com/Stats/PitchingLeaders.aspx",
    pitcherDetail: "https://eng.koreabaseball.com/Stats/PitchingLeaders02.aspx"
  },
  ...playerRankings
};

await writeFile(rankingOutputPath, `${JSON.stringify(rankingPayload, null, 2)}\n`, "utf8");
await writeFile(rankingScriptOutputPath, `window.KBO_PLAYER_RANKINGS = ${JSON.stringify(rankingPayload, null, 2)};\n`, "utf8");

console.log(`Updated ${outputPath}`);
console.log(`Updated ${scriptOutputPath}`);
console.log(`Updated ${playerOutputPath}`);
console.log(`Updated ${playerScriptOutputPath}`);
console.log(`Updated ${rankingOutputPath}`);
console.log(`Updated ${rankingScriptOutputPath}`);
console.log(`${payload.asOf}, ${payload.teams.length} teams`);
console.log(`${playerPayload.players.length} players`);
