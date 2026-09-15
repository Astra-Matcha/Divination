// 1. 엘더 후사르크 룬 문자 데이터 (fuxarkgwhnijypzstbemlqdo 순서)
const runeData = {
  f: { name: "페후 (Fehu)", upright: "풍요, 재물, 새로운 시작", reversed: "손실, 탐욕, 낭비" },
  u: { name: "우루즈 (Uruz)", upright: "강인함, 건강, 원초적 에너지", reversed: "약함, 질병, 기회의 상실" },
  x: { name: "투리사즈 (Thurisaz)", upright: "보호, 관문, 결단력", reversed: null },
  a: { name: "안수즈 (Ansuz)", upright: "지혜, 통찰력, 좋은 소식", reversed: "오해, 거짓, 소통의 부재" },
  r: { name: "라이도 (Raidho)", upright: "여정, 변화, 올바른 방향", reversed: "혼란, 정체, 잘못된 길" },
  k: { name: "케나즈 (Kenaz)", upright: "명확함, 창의성, 열정", reversed: "희미함, 열정의 식음, 오만" },
  g: { name: "게보 (Gebo)", upright: "선물, 동반자 관계, 조화", reversed: null },
  w: { name: "운조 (Wunjo)", upright: "기쁨, 조화, 성공", reversed: "슬픔, 불화, 불운" },
  h: { name: "하갈라즈 (Hagalaz)", upright: "갑작스러운 변화, 시련, 자존심", reversed: null },
  n: { name: "나우디즈 (Nauthiz)", upright: "인내, 극복, 인내심", reversed: null },
  i: { name: "이사 (Isa)", upright: "정지, 침묵, 내면의 성찰", reversed: null },
  j: { name: "제라 (Jera)", upright: "결실, 수확, 자연스러운 흐름", reversed: null },
  y: { name: "아이와즈 (Eihwaz)", upright: "인내, 전환점, 수호", reversed: null },
  p: { name: "페르트로 (Perthro)", upright: "비밀, 운명, 행운", reversed: "숨겨진 실망, 불확실성" },
  z: { name: "알기즈 (Algiz)", upright: "수호, 직관, 본능", reversed: "무방비, 유혹, 경계 필요" },
  s: { name: "소윌로 (Sowilo)", upright: "승리, 명예, 강한 생명력", reversed: null },
  t: { name: "티와즈 (Tiwaz)", upright: "정의, 희생, 리더십", reversed: "불공정, 의욕 저하, 패배" },
  b: { name: "베르카나 (Berkana)", upright: "탄생, 성장, 치유", reversed: "정체, 가족 내의 문제" },
  e: { name: "에화즈 (Ehwaz)", upright: "진보, 파트너십, 신뢰", reversed: "불신, 장애물, 서두름" },
  m: { name: "마나즈 (Mannaz)", upright: "자아, 협력, 인간관계", reversed: "고립, 편견, 타인과의 갈등" },
  l: { name: "라구즈 (Laguz)", upright: "직관, 흐름, 감성", reversed: "혼란, 감정 과화, 잘못된 직관" },
  q: { name: "잉구즈 (Ingwaz)", upright: "완성, 내부적 성장, 휴식", reversed: null },
  d: { name: "다가지 (Dagaz)", upright: "새로운 날, 명확함, 희망", reversed: null },
  o: { name: "오달라 (Othala)", upright: "유산, 집, 전통", reversed: "손실, 소외, 고집" }
};

// 2. 랜덤 룬 뽑기 함수 (지정된 문자 및 대소문자 예외 적용)
function getRandomRuneInfo() {
  const chars = "fuxarkgwhnijypzstbemlqdo";
  const randomChar = chars[Math.floor(Math.random() * chars.length)];
  
  // 대문자가 안 나오는 예외 문자 목록
  const lowercaseOnly = ["x", "g", "h", "n", "i", "j", "y", "s", "q", "d"];

  let isReversed = false;
  let finalChar = randomChar;

  // 예외 문자가 아닌 경우에만 50% 확률로 대문자(역방향) 설정
  if (!lowercaseOnly.includes(randomChar)) {
    if (Math.random() < 0.5) {
      finalChar = randomChar.toUpperCase();
      isReversed = true;
    }
  }

  return {
    char: finalChar,        // RUNE.TTF 폰트로 출력할 문법 문자 (소문자 또는 대문자)
    baseChar: randomChar,   // runeData 조회를 위한 기본 소문자 키
    isReversed: isReversed  // 역방향 여부
  };
}

// 3. 이벤트 연동
document.addEventListener("DOMContentLoaded", () => {
  const drawBtn = document.getElementById("drawBtn");
  const runeCard = document.getElementById("runeCard");
  const runeDisplay = document.getElementById("runeDisplay");
  const runeName = document.getElementById("runeName");
  const runeMeaning = document.getElementById("runeMeaning");

  drawBtn.addEventListener("click", () => {
    const result = getRandomRuneInfo();
    const rune = runeData[result.baseChar];

    // RUNE.TTF 폰트에 넘길 소문자/대문자 알파벳 설정
    runeDisplay.textContent = result.char;

    // 역방향인 경우 visual 회전 효과 적용
    if (result.isReversed) {
      runeCard.classList.add("reversed");
      runeName.textContent = `${rune.name} - 역방향`;
      runeName.classList.add("reversed-text");
      runeMeaning.textContent = rune.reversed;
    } else {
      runeCard.classList.remove("reversed");
      runeName.textContent = `${rune.name} - 정방향`;
      runeName.classList.remove("reversed-text");
      runeMeaning.textContent = rune.upright;
    }
  });
});
