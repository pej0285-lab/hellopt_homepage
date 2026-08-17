import { useState } from 'react'
import './App.css'

const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`

const navItems = [
  ['프로필', '#profile', 'home'],
  ['교육과정', '#courses', 'home'],
  ['핸즈온랩', '#labs', 'labs'],
]

const heroChips = ['Microsoft 365', 'Copilot', 'Copilot Studio', 'AI Agent', 'Excel Data', 'Presentation']

const stats = [
  ['MCT', 'Microsoft Certified Trainer 2026'],
  ['20+', '주요 기업/기관 강의'],
  ['29', '실무 도서 저서/공저'],
  ['5', '핵심 강의 분야'],
]

const partners = ['삼성물산', '삼성전기', '오뚜기', '스타벅스', '삼성전자', '금융감독원', '현대모비스', '관세청', '건강보험공단', '광동제약', '한화생명', '삼성생명']

const fields = [
  ['생성형 AI 활용', 'ChatGPT, Copilot 등 AI를 활용한 생산성 향상 과정'],
  ['Microsoft 365 Copilot', '업무 앱 안에서 Copilot을 실무에 바로 적용하는 과정'],
  ['Copilot Studio', '업무 자동화 Agent 설계와 제작 실습 과정'],
  ['엑셀 데이터 분석', '실무자를 위한 데이터 정리, 분석, 시각화 과정'],
  ['PT 디자인 및 제안서 작성', '설득력 있는 발표 자료와 제안서 완성 과정'],
]

const history = [
  ['2026', '삼성물산 건설부문', '생성형 AI 활용 업무 스킬 향상 과정'],
  ['2026', '삼성전기', '신입 DX 엑셀 데이터 분석 과정 (3월, 8월)'],
  ['2026', '오뚜기', 'DT 엑셀 데이터 분석 과정'],
  ['2026', '스타벅스', 'PPT 활용 실무 교육'],
  ['2026', '삼성전자', '생성형 AI를 활용한 파워포인트 과정'],
  ['2026', '금융감독원', '신입사원 보고서 작성 과정'],
  ['2026', '현대모비스', 'Copilot 활용 과정'],
  ['2025', '삼성전기', '신입 DX 엑셀 데이터 분석 과정 (3월, 8월)'],
  ['2025', '삼성물산 건설부문', '생성형 AI 활용 업무 스킬 향상 과정'],
  ['2025', '오뚜기', 'DT 엑셀 데이터 분석 과정'],
  ['2025', '오뚜기', '생성형 AI를 활용한 데이터 리터러시 과정'],
  ['2025', '관세청', '엑셀 데이터 분석 및 생성형 AI 활용 과정'],
  ['2025', 'FNF', 'AI 활용 기초 과정'],
  ['2025', '서울시립대학교', '국제도시과학대학원 국제협력사업 오피스활용 과정'],
  ['2025', '건강보험공단', '데이터 분석 처리 능력 향상 및 AI 활용 과정'],
  ['2024', '건강보험공단', '데이터 분석 처리 능력 향상 및 AI 활용 과정'],
  ['2024', '광동제약', '엑셀을 활용한 데이터 분석 과정'],
  ['2024', '한화생명', 'PPT 데이터 시각화 과정'],
  ['2024', '삼성생명', '엑셀 데이터 분석 및 시각화 과정'],
  ['2024', '삼성생명', '엑셀 데이터 분석 Intensive 과정'],
  ['2024', '현대코퍼레이션', '신입사원 엑셀 활용 과정'],
  ['2024', '경기도일자리재단', '오피스 활용 과정'],
  ['2024', '아이마켓코리아', '신입사원 오피스 활용 과정'],
  ['2024', '사회복지사', '디지털 리더 과정'],
  ['2024', '조광페인트', 'ChatGPT 활용을 통한 업무 효율화 과정'],
  ['2024', '가톨릭중앙의료원', 'PPT를 활용한 인포그래픽 과정'],
]

const groupedHistory = history.reduce((groups, [year, company, title]) => {
  const group = groups.find((item) => item.year === year)

  if (group) {
    group.items.push([company, title])
    return groups
  }

  return [...groups, { year, items: [[company, title]] }]
}, [])

const certifications = [
  ['MCT', 'Microsoft Certified Trainer 2026', 'brand/mct-badge.png', 'https://learn.microsoft.com/ko-kr/users/32322147/transcript/dwo15h26y6y1m3y'],
  ['AB-730', 'AI 비즈니스 전문가', 'brand/ab-731.png', 'https://learn.microsoft.com/ko-kr/credentials/certifications/ai-business-professional/?WT.mc_id=certposter_poster-wwl&practice-assessment-type=certification'],
  ['AB-731', '인공지능 혁신 리더', 'brand/ab-730.png', 'https://learn.microsoft.com/ko-kr/credentials/certifications/ai-transformation-leader/?WT.mc_id=certposter_poster-wwl&practice-assessment-type=certification'],
  ['AI-102', 'Azure AI 엔지니어 준회원', 'brand/ai-102.png', 'https://learn.microsoft.com/ko-kr/credentials/certifications/azure-ai-apps-and-agents-developer-associate/?practice-assessment-type=certification'],
  ['AB-100', '에이전트 AI 비즈니스 솔루션 설계자', 'brand/ab-100.png', 'https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect/#certification-exams'],
  ['GH-300', 'GitHub Copilot', 'brand/gh-300.png', 'https://learn.microsoft.com/ko-kr/credentials/certifications/github-copilot/?WT.mc_id=certposter_poster_wwl&practice-assessment-type=certification'],
]

const books = [
  ['직장인을 위한 실무 엑셀&파워포인트&워드&한글', '공저 · 길벗 외 29권'],
  ['엑셀&파워포인트&워드&한글 무작정따라하기', '공저 · 길벗'],
  ['왕초보를 위한 첫 파워포인트 무작정 따라하기', '길벗'],
  ['버려지는 디자인, 통과하는 디자인', '공저 · 길벗'],
  ['파워포인트 2007 필수디자인 100', '길벗'],
]

const bookThumbnails = [
  'book_BN004592.jpg', 'book_BN004163.jpg', 'book_BN003707.jpg', 'book_BN003511.jpg', 'book_BN003384.jpg', 'book_BN003358.jpg', 'book_BN003357.jpg', 'book_BN003356.jpg', 'book_BN003140.jpg', 'book_BN002953.jpg', 'book_BN002427.jpg', 'book_BN002426.jpg', 'book_BN002422.jpg', 'book_BN002391.jpg', 'book_BN001460.jpg', 'book_BN001408.jpg', 'book_BN001407.jpg', 'book_BN001406.jpg', 'book_BN001192.jpg', 'book_BN001141.jpg', 'book_BN000942.jpg', 'book_BN000882.jpg', 'book_BN000760.jpg', 'book_BN000727.jpg', 'book_BN000192.jpg', 'book_BN000108.jpg', 'book_BC014768.jpg', 'book_BC010269.jpg', 'book_8975607224.jpg',
]

const courses = [
  ['생성형 AI 업무 활용', 'ChatGPT와 Copilot을 보고서, 문서, 데이터 해석, 발표 준비에 연결합니다.', ['프롬프트 설계', '업무 자동화', '문서 생산성']],
  ['Microsoft 365 Copilot', 'Teams, Outlook, Word, Excel, PowerPoint에서 Copilot을 바로 활용합니다.', ['회의/메일 요약', '문서 초안', 'Office 연계']],
  ['Copilot Studio Agent 제작', '업무 프로세스를 기반으로 Agent를 설계하고 배포하는 실습 과정입니다.', ['Agent 설계', '지식 연결', '배포 이해']],
  ['엑셀 데이터 분석', '실무 데이터를 정리하고 분석하는 엑셀 핵심 역량을 다룹니다.', ['데이터 정리', '분석 함수', '시각화']],
  ['PT 디자인 및 제안서 작성', '메시지 구조, 슬라이드 디자인, 데이터 시각화로 설득력을 높입니다.', ['슬라이드 구조', '인포그래픽', '제안서']],
]

const labMaterials = [
  {
    status: 'Course 01',
    title: 'Microsoft 365 Copilot',
    text: 'Word·Excel·PowerPoint·Outlook·Teams 안의 Copilot부터 ChatGPT·NotebookLM·Cowork까지, 엔드유저가 실제로 쓰는 기능 전부를 하루에 익히는 실습 과정입니다.',
    link: '#m365-copilot',
    tags: ['Copilot Chat', 'Office Apps', 'Hands-on Lab'],
  },
  { status: 'Coming Soon', title: '과정 02', text: '세부 실습자료와 안내는 추후 이 공간에 채워질 예정입니다.' },
  { status: 'Coming Soon', title: '과정 03', text: '세부 실습자료와 안내는 추후 이 공간에 채워질 예정입니다.' },
  { status: 'Coming Soon', title: '과정 04', text: '세부 실습자료와 안내는 추후 이 공간에 채워질 예정입니다.' },
  { status: 'Coming Soon', title: '과정 05', text: '세부 실습자료와 안내는 추후 이 공간에 채워질 예정입니다.' },
  { status: 'Coming Soon', title: '과정 06', text: '세부 실습자료와 안내는 추후 이 공간에 채워질 예정입니다.' },
]

const m365Modules = [
  ['M0. What’s New', '2026 최신 변화', '새 앱 리디자인 · Work IQ · Cowork · Notebooks · GPT-5.6'],
  ['M1. 시작하기', 'Copilot 이해·진입점', '새 앱 투어 · Copilot vs Copilot Chat · 프롬프트 기본기 · Work IQ 그라운딩'],
  ['M2. Copilot Chat', '채팅으로 일하기', '업무 데이터 질문 · 참조 넣기 · Pages·Library · 이미지 · 예약 프롬프트 · 메모리'],
  ['M3. Search·Notebooks', '찾기·정리', 'Copilot Search · Notebooks · 산출물 생성(문서·PPT·마인드맵)'],
  ['M4. 앱 속 Copilot', '생산성 앱 활용', 'Word · Excel · PowerPoint · Outlook · Teams · OneNote·Loop·Forms'],
  ['M5. 에이전트', '특화 Copilot', 'Agent Store · Researcher·Analyst · Agent Builder'],
  ['M6. Cowork', '작업 위임·자동화', '개요·위임 · 스킬·플러그인 · 예약·사용'],
  ['M7. 실습 Lab', '직접 만들기', 'Lab 0 채팅·프롬프트 · Lab 1 문서 자동화 · Lab 2 하루 업무 · Lab 3 에이전트 · Lab 4 Cowork'],
]

const m365Schedule = [
  ['09:00~09:50', 'M1', '시작하기 — 새 앱 투어 · 프롬프트 기본기 · Work IQ', 'Demo'],
  ['10:00~10:50', 'M2', 'Copilot Chat ① — 업무 데이터 질문 · 참조 넣기', 'Lab'],
  ['11:00~11:50', 'M2·M3', 'Chat ② Pages·이미지·예약·메모리 + Search·Notebooks', 'Lab'],
  ['11:50~13:00', '—', '점심시간', 'Break'],
  ['13:00~13:50', 'M4', '앱 속 Copilot ① — Word · Excel · PowerPoint', 'Lab'],
  ['14:00~14:50', 'M4', '앱 속 Copilot ② — Outlook · Teams · 기타 앱', 'Lab'],
  ['15:00~15:50', 'M7', 'Lab 1 — 문서 자동화(Chat → Word → PPT)', 'Lab'],
  ['16:00~16:50', 'M5·M6', '에이전트(Store·Researcher·Analyst·Builder) · Cowork(위임·스킬·예약)', 'Demo'],
  ['17:00~17:50', 'M7', 'Lab 2 — Outlook·Teams 하루 업무', 'Lab'],
  ['17:50~18:00', '—', '마무리', 'Wrap-up'],
]

const m365Updates = [
  '새 Copilot 앱 리디자인: 통합 진입점, 작업 인식 프롬프트, 고정 세션을 중심으로 실습합니다.',
  'Work IQ 인텔리전스 레이어: 업무 데이터 그라운딩이 응답 품질을 어떻게 바꾸는지 확인합니다.',
  'Copilot Cowork와 Notebooks 개편: 위임형 작업, 정리, 산출물 생성 흐름을 다룹니다.',
  'Excel Edit with Copilot과 GPT-5.6 모델 등 2026년 상반기 변화를 반영합니다.',
]

const courseModuleGroups = [
  { code: 'M0', title: 'What’s New', slug: 'm00' },
  { code: 'M1', title: '시작하기', slug: 'm01', children: [
    ['M1-1', '새 Copilot 앱 투어', 'm01-1'], ['M1-2', 'Copilot vs Copilot Chat', 'm01-2'], ['M1-3', '프롬프트 기본기', 'm01-3'], ['M1-4', 'Work IQ 그라운딩', 'm01-4'],
  ] },
  { code: 'M2', title: 'Copilot Chat', slug: 'm02', children: [
    ['M2-1', '업무 데이터에 묻기', 'm02-1'], ['M2-2', '참조 넣기', 'm02-2'], ['M2-3', 'Pages·Library', 'm02-3'], ['M2-4', '이미지 생성', 'm02-4'], ['M2-5', '예약 프롬프트', 'm02-5'], ['M2-6', '메모리·개인 설정', 'm02-6'],
  ] },
  { code: 'M3', title: 'Search·Notebooks', slug: 'm03', children: [
    ['M3-1', 'Copilot Search', 'm03-1'], ['M3-2', 'Copilot Notebooks', 'm03-2'], ['M3-3', 'Notebooks 산출물', 'm03-3'],
  ] },
  { code: 'M4', title: '앱 속 Copilot', slug: 'm04', children: [
    ['M4-1', 'Word', 'm04-1'], ['M4-2', 'Excel', 'm04-2'], ['M4-3', 'PowerPoint', 'm04-3'], ['M4-4', 'Outlook', 'm04-4'], ['M4-5', 'Teams', 'm04-5'], ['M4-6', '기타 앱', 'm04-6'],
  ] },
  { code: 'M5', title: '에이전트', slug: 'm05', children: [
    ['M5-1', '에이전트·Agent Store', 'm05-1'], ['M5-2', 'Researcher·Analyst', 'm05-2'], ['M5-3', 'Agent Builder', 'm05-3'],
  ] },
  { code: 'M6', title: 'Cowork', slug: 'm06', children: [
    ['M6-1', 'Cowork 개요·작업 위임', 'm06-1'], ['M6-2', '스킬·플러그인', 'm06-2'], ['M6-3', '예약·사용 이해', 'm06-3'],
  ] },
  { code: 'M7', title: '실습 Lab', slug: 'm07', children: [
    ['M7-1', 'Lab 0 · 프롬프트 워밍업', 'm07-1'], ['M7-2', 'Lab 1 · 문서 자동화', 'm07-2'], ['M7-3', 'Lab 2 · 하루 업무', 'm07-3'], ['M7-4', 'Lab 3 · 나만의 에이전트', 'm07-4'], ['M7-5', 'Lab 4 · Cowork', 'm07-5'],
  ] },
]

const modulePage = (slug, code, title, summary, sections, takeaways, previous, next, sources = []) => ({ slug, code, title, summary, sections, takeaways, previous, next, sources })
const bullets = (title, items) => ({ title, type: 'bullets', items })
const table = (title, headers, rows) => ({ title, type: 'table', headers, rows })
const steps = (title, items) => ({ title, type: 'steps', items })

const coursePages = {
  m00: modulePage('m00', 'M0', 'What’s New — Microsoft 365 Copilot 2026', '2026년의 Copilot은 채팅 도우미에서 앱 안에서 맥락을 이해하고 작업을 실행하는 동료로 바뀌었습니다.', [
    bullets('새 Copilot 앱 리디자인', ['통합 진입점에서 Word·Excel·PowerPoint·Outlook과 Copilot을 함께 엽니다.', '좌측 탐색에 에이전트·대화·기록·Library가 모입니다.', '작업 인식 프롬프트 라인과 고정 세션으로 진행 중인 작업을 이어갑니다.']),
    bullets('Work IQ · 개인화 인텔리전스 레이어', ['이메일·회의·채팅·파일 등 내 업무 맥락을 권한 범위 안에서 연결합니다.', 'Excel 편집과 같은 다단계 작업에서 관련 맥락을 자동으로 보강합니다.']),
    bullets('Copilot Cowork · 작업을 끝까지 실행', ['계획 → 실행 → 산출까지 진행해 초안이 아닌 완성물을 반환합니다.', '스킬·플러그인·예약 실행으로 반복 업무를 확장합니다.']),
    bullets('Copilot Notebooks 개편', ['참조·Pages·채팅을 나란히 보고 Outlook 이메일까지 참조로 추가합니다.', '노트북 맥락에서 Word·Excel·PowerPoint·마인드맵을 Quick create로 생성합니다.']),
    bullets('앱 속 실행 강화 · 새 모델', ['Excel Edit with Copilot, Outlook 전체 추론, Teams 협업 표면 확장, GPT-5.6을 확인합니다.']),
  ], ['통합 앱 + Work IQ + Cowork가 2026 Copilot의 핵심 변화입니다.', '어디서·무엇에 근거해·어떻게 요청할지를 갖추면 됩니다.', '찾기 → 정리 → 산출이 하나의 흐름으로 연결됩니다.'], null, 'm01', ['Microsoft 365 Copilot 새 디자인 발표', 'Copilot Cowork Microsoft 365 Blog', 'Microsoft 365 Copilot 릴리스 정보']),
  m01: modulePage('m01', 'M1', '시작하기 — Microsoft 365 Copilot 이해·진입점', 'Copilot을 어디서 열고, 내 라이선스로 무엇을 쓸 수 있는지, 어떻게 프롬프트를 쓰고 무엇에 근거하게 할지 4가지 기본기를 잡습니다.', [
    table('하위 세션', ['세션', '주제', '핵심'], [['1', '새 Copilot 앱 투어', '통합 진입점 · 좌측 탐색 · 웹·앱·Teams·Outlook·Edge·모바일'], ['2', 'Copilot vs Copilot Chat', '라이선스 범위 · 웹 vs 업무 그라운딩'], ['3', '프롬프트 기본기', '목표·맥락·출처·기대 4요소'], ['4', 'Work IQ 그라운딩', '업무/웹 전환 · 인용 확인']]),
    bullets('시작 전 체크', ['내 계정과 라이선스를 확인합니다.', '지금 하는 일에 가장 가까운 Copilot 진입점을 선택합니다.', '결과의 근거와 인용을 확인하는 습관을 만듭니다.']),
  ], ['Copilot은 여러 진입점에서 열립니다.', 'Chat은 웹, Microsoft 365 Copilot은 웹과 업무 데이터까지 다룹니다.', '프롬프트 4요소와 Work IQ 그라운딩이 모든 실습의 토대입니다.'], 'm00', 'm02', ['Microsoft 365 Copilot 개요', '어떤 Copilot이 맞나']),
  m02: modulePage('m02', 'M2', 'Copilot Chat — 채팅으로 일하기', 'Copilot Chat은 질문 상자가 아니라 업무 데이터에 근거해 요약·초안·분석·생성을 해내는 작업 공간입니다.', [
    table('하위 세션', ['세션', '주제', '핵심'], [['1', '업무 데이터에 묻기', '이메일·회의·문서 요약·검색'], ['2', '참조 넣기', '파일 업로드 · / ContextIQ · SharePoint · PDF'], ['3', 'Pages·Library', '결과를 문서로 다듬고 생성물 보관'], ['4', '이미지 생성', '프롬프트로 이미지 만들기'], ['5', '예약 프롬프트', '반복 작업 자동 실행'], ['6', '메모리·개인 설정', '지침·메모리·채팅 기록']]),
    bullets('업무에 적용하는 흐름', ['근거를 넣고 질문합니다.', 'Pages·이미지로 결과를 만들고 Library에 보관합니다.', '예약과 메모리로 반복 업무를 개인화합니다.']),
  ], ['Chat은 근거를 주는 만큼 좋아집니다.', '결과는 Pages·이미지로 남기고 Library에서 재사용합니다.', '예약 프롬프트와 메모리로 반복 업무를 자동화합니다.'], 'm01', 'm03', ['Copilot Chat 개요', 'Copilot 개인화·메모리']),
  m03: modulePage('m03', 'M3', 'Search·Notebooks — 찾기·정리', 'Copilot Search로 흩어진 자료를 찾고, Notebooks로 참조를 모아 문서·표·덱·마인드맵으로 산출합니다.', [
    table('하위 세션', ['세션', '주제', '핵심'], [['1', 'Copilot Search', '자연어 검색 · Copilot 답변 · 채팅 연계'], ['2', 'Copilot Notebooks', '참조 수집 · 나란히 보기 · 이메일 참조'], ['3', 'Notebooks 산출물', 'Quick create · Word·Excel·PPT·마인드맵']]),
    bullets('찾기 → 정리 → 산출', ['Search에서 의미 기반으로 자료를 찾습니다.', 'Notebooks에 파일·링크·이메일을 모아 근거 범위를 만듭니다.', 'Quick create로 공유 가능한 결과물을 생성합니다.']),
  ], ['Search는 자연어로 찾고 Chat으로 심화합니다.', 'Notebooks는 참조를 모은 근거 있는 작업 공간입니다.', 'Quick create로 조사 자료를 결과물로 바꿉니다.'], 'm02', 'm04', ['Copilot Search 개요', 'Microsoft 365 Copilot 릴리스 정보']),
  m04: modulePage('m04', 'M4', '앱 속 Copilot — 생산성 앱 활용', 'Copilot의 진가는 앱 안에서 나옵니다. Word로 쓰고, Excel로 분석하고, PowerPoint로 발표하고, Outlook·Teams로 소통합니다.', [
    bullets('M4는 6개 하위 세션으로 구성됩니다.', ['앱 안에서 문맥을 가장 잘 잡는 Copilot 사용법을 익힙니다.', 'Word·Excel·PowerPoint·Outlook·Teams·기타 앱을 실무 시나리오로 연결합니다.']),
    table('하위 세션', ['세션', '앱', '핵심'], [['1', 'Word', '초안·재작성·요약·문서 채팅'], ['2', 'Excel', 'Edit with Copilot · 수식·차트·분석'], ['3', 'PowerPoint', '프레젠테이션 생성·편집·요약'], ['4', 'Outlook', '스레드·받은 편지함 요약·초안·코칭'], ['5', 'Teams', '채팅·채널·모임·통화'], ['6', '기타 앱', 'OneNote·Loop·Whiteboard·Forms·Edge']]),
  ], ['Copilot은 앱 안에서 문맥을 가장 잘 잡습니다.', 'Word·Excel·PPT·Outlook·Teams가 생산성의 핵심 축입니다.', '어디서나 결과는 초안이므로 검토 후 사용합니다.'], 'm03', 'm05', ['Microsoft 365 Copilot 앱별 기능', 'Microsoft 365 Copilot 도움말']),
  m05: modulePage('m05', 'M5', '에이전트 — 특화 Copilot 활용·제작', '에이전트는 특정 업무에 범위를 좁힌 Copilot입니다. Store에서 골라 쓰고 Researcher·Analyst로 심층 작업을 맡기며 Agent Builder로 만듭니다.', [
    table('하위 세션', ['세션', '주제', '핵심'], [['1', '에이전트 이해·Agent Store', '특화 업무 · Store · @멘션'], ['2', 'Researcher·Analyst', '심층 조사 · 데이터 분석'], ['3', 'Agent Builder', '나만의 에이전트 만들기·공유']]),
    bullets('에이전트 활용 흐름', ['Store에서 사전 구축·조직·파트너 에이전트를 찾습니다.', 'Researcher와 Analyst로 복잡한 조사와 분석을 위임합니다.', 'Agent Builder에서 지침·지식·시작 프롬프트를 구성합니다.']),
  ], ['에이전트는 한 가지 업무에 특화된 Copilot입니다.', 'Researcher·Analyst로 조사와 분석을 위임합니다.', 'Agent Builder로 직접 제작하고 공유합니다.'], 'm04', 'm06', ['Microsoft 365 Copilot 확장성 개요', '선언형 에이전트 개요']),
  m06: modulePage('m06', 'M6', 'Copilot Cowork — 작업 위임·자동화', 'Cowork는 질문에 답하는 것을 넘어 작업을 처음부터 끝까지 실행해 완성물을 돌려주는 에이전틱 시스템입니다.', [
    table('하위 세션', ['세션', '주제', '핵심'], [['1', 'Cowork 개요·작업 위임', '계획·실행·산출 · 완성물 반환'], ['2', '스킬·플러그인', '작업 방식 재사용·공유 · App Store'], ['3', '예약·사용 이해', '반복 작업 예약 · 라이선스·사용량']]),
    bullets('잘 맡기는 원칙', ['목표·근거·산출 형식을 명확히 정의합니다.', '반복 작업은 스킬과 예약으로 표준화합니다.', '완성물도 사람이 최종 검토합니다.']),
  ], ['Cowork는 실행형 동료입니다.', '스킬과 플러그인으로 작업 방식을 확장합니다.', '예약·사용량·검토 원칙을 함께 이해해야 합니다.'], 'm05', 'm07', ['Use Copilot Cowork', 'Copilot Cowork Microsoft 365 Blog']),
  m07: modulePage('m07', 'M7', '실습 Lab — 직접 써 보기', 'M1~M6에서 익힌 기능을 실무 시나리오로 직접 실행합니다. 기본기부터 에이전트·Cowork까지 순서대로 따라 합니다.', [
    table('실습 하위 세션', ['Lab', '주제', '핵심'], [['0', 'Copilot Chat·프롬프트 워밍업', '그라운딩·참조·프롬프트 4요소'], ['1', '문서 자동화 — Chat → Word → PPT', '초안·Pages·덱 생성'], ['2', '하루 업무 — Outlook·Teams', '메일·회의 요약·액션 정리'], ['3', '나만의 에이전트', 'Agent Builder 제작·공유'], ['4', 'Cowork', '작업 위임·스킬·예약']]),
    bullets('실습 순서', ['Lab 0에서 근거·형식·검증 기본기를 익힙니다.', 'Lab 1·2에서 문서와 하루 업무를 자동화합니다.', 'Lab 3·4에서 에이전트와 Cowork를 선택적으로 확장합니다.']),
  ], ['워밍업 → 문서·업무 → 에이전트·Cowork 순으로 진행합니다.', '공통 원리는 근거를 주고, 형식을 정하고, 결과를 검토하는 것입니다.', 'Lab 3·4는 라이선스와 권한이 필요한 선택 심화 과정입니다.'], 'm06', null, ['Microsoft 365 Copilot 도움말', 'Copilot 프롬프트 갤러리']),
}

const subPages = {
  'm01-1': ['M1-1', '새 Copilot 앱 투어 — 진입점 총정리', 'Copilot은 하나의 앱이 아니라 여러 곳에서 열리는 하나의 경험입니다.', [table('어디서 여나', ['진입점', '위치', '맥락'], [['웹', 'm365copilot.com', '브라우저에서 바로'], ['Microsoft 365 Copilot 앱', 'Windows·Mac·iOS·Android', 'Library·기록'], ['Outlook', '전체 창·사이드 패널', '메일·일정'], ['Teams', '채팅·채널·통화·모임', '협업'], ['Edge 사이드바', 'Edge for Business', '열린 웹페이지 요약'], ['Office 앱', 'Word·Excel·PowerPoint·OneNote', '문서 안에서 바로']]), bullets('새 앱 화면 구조', ['좌측 탐색: 에이전트·대화·기록·Library', '프롬프트 라인: 작업과 목표를 서술하는 공간', '고정 세션: 진행 중인 작업을 이어가기']), steps('처음 켜면 할 일 3가지', ['회사·학교 계정인지 로그인 계정을 확인합니다.', 'Copilot Chat을 고정합니다.', 'Library 위치를 확인합니다.'])], ['가장 가까운 진입점에서 열어야 맥락이 잘 잡힙니다.', '새 앱은 좌측 탐색·작업 인식 프롬프트·고정 세션 구조입니다.']],
  'm01-2': ['M1-2', 'Copilot vs Copilot Chat — 내 라이선스 범위', 'Copilot Chat은 웹 근거, Microsoft 365 Copilot은 웹과 내 업무 데이터까지 다룹니다.', [table('한 장 비교', ['항목', 'Copilot Chat', 'Microsoft 365 Copilot'], [['근거', '웹', '웹 + 업무 데이터'], ['라이선스', 'Microsoft 365 구독 기본 포함', '추가 기능 라이선스'], ['앱 내 편집', '제한적', 'Word·Excel·PowerPoint·Outlook'], ['에이전트', '종량제 에이전트', '사전 구축·맞춤·Researcher·Analyst']]), bullets('업무 데이터 접근', ['내용 복사·붙여넣기, + 파일 업로드, / 파일·사람 참조', 'Teams·Outlook에서 열린 콘텐츠 활용', '라이선스가 있으면 Work IQ가 업무 맥락을 자동으로 연결']), bullets('라이선스 확인', ['제품 내 M365 Copilot Premium/Basic 레이블을 확인합니다.', 'Copilot Chat Basic은 앱 내 Copilot 접근 범위가 다릅니다.'])], ['Chat은 웹, Copilot은 웹 + 업무 데이터입니다.', 'Chat만 있어도 업로드·참조·열린 콘텐츠로 업무 내용을 활용할 수 있습니다.']],
  'm01-3': ['M1-3', '프롬프트 기본기 — 4요소', '좋은 답은 좋은 프롬프트에서 나옵니다. 목표·맥락·출처·기대를 갖춥니다.', [table('프롬프트 4요소', ['요소', '질문', '예시'], [['목표', '무엇을 원하나', '3분기 영업 실적 요약을 만들어'], ['맥락', '배경·대상은', '임원 보고용, 비전문가도 이해하게'], ['출처', '무엇에 근거하나', '첨부 Excel과 SharePoint 기준'], ['기대', '형식·분량·어조', '표 1개 + 3문단, 정중한 한국어']]), bullets('대화를 다듬는 후속 지시', ['리스크 항목을 불릿 3개로 추가해', '숫자를 전년 대비 증감률로 바꿔', '더 짧게 한 문단으로 줄여']), bullets('자주 하는 실수', ['한 프롬프트에 너무 많은 일을 넣습니다.', '근거를 지정하지 않습니다.', '원하는 형식과 분량을 지정하지 않습니다.'])], ['목표·맥락·출처·기대가 프롬프트의 골격입니다.', '한 번에 끝내지 말고 후속 지시로 다듬습니다.']],
  'm01-4': ['M1-4', 'Work IQ 그라운딩 — 업무·웹 전환·인용 확인', '같은 질문도 웹과 내 업무 데이터 중 무엇에 근거하느냐에 따라 답이 달라집니다.', [table('Work IQ 토글', ['상태', '근거', '예시'], [['켬', '이메일·회의·파일·채팅', '내 지난주 회의에서 정한 예산은?'], ['끔', '웹과 접근 가능한 결과', '최신 업계 규제 동향 정리']]), bullets('인용 확인 습관', ['각주·출처 링크를 클릭해 원본으로 이동합니다.', '숫자·인용문·날짜는 원본과 대조합니다.', '오래된 파일을 근거로 삼았는지 날짜를 확인합니다.']), bullets('신뢰성 점검 3원칙', ['근거를 물어라', '인용을 열어라', '최신성을 의심하라'])], ['답의 품질은 그라운딩이 좌우합니다.', '중요한 결정 전 인용 확인은 필수 습관입니다.']],
}

const detailPages = {
  'm02-1': ['M2-1', '업무 데이터에 묻기', '내 이메일·회의·문서·채팅을 근거로 요약하고 질문합니다.', [table('대표 시나리오', ['상황', '프롬프트'], [['메일 스레드 요약', '핵심 결정과 남은 액션을 정리해'], ['회의 따라잡기', '어제 마케팅 회의의 다음 단계 알려줘'], ['문서 찾기', '지난달 예산 관련 최신 문서를 찾아 요약해']]), bullets('잘 묻는 요령', ['기간·대상을 좁힙니다.', '원하는 산출물을 명시합니다.', '후속 지시로 범위를 좁힙니다.']), bullets('권한·개인정보', ['Copilot은 내가 접근 권한이 있는 데이터만 봅니다.', '채팅 기록은 검토·삭제할 수 있습니다.'])], ['이메일·회의·문서·채팅을 근거로 질문합니다.', '기간과 대상을 좁히고 후속 지시로 다듬습니다.']],
  'm02-2': ['M2-2', '참조 넣기 — 파일·ContextIQ·범위 지정', 'Copilot에게 정확한 근거를 주는 방법을 익힙니다.', [table('참조 방법 5가지', ['방법', '동작'], [['파일 업로드', '+ 버튼으로 내 PC·클라우드 파일 첨부'], ['ContextIQ', '/ 입력으로 파일·사람·회의 지정'], ['클라우드 폴더', 'SharePoint·OneDrive 폴더 범위 지정'], ['SharePoint 사이트', '특정 사이트로 검색 범위 한정'], ['PDF 열기', '채팅 안에서 PDF를 보며 질문']]), bullets('범위를 좁히는 방법', ['너무 넓은 검색은 관련 없는 결과를 섞습니다.', '파일·폴더·사이트 범위를 구체적으로 지정합니다.'])], ['업로드·/ 참조·클라우드 폴더·사이트·PDF로 근거를 제공합니다.', '범위를 좁힐수록 정확도가 올라갑니다.']],
  'm02-3': ['M2-3', 'Copilot Pages·Library', '채팅 답변을 Pages로 다듬고 Library에서 다시 찾습니다.', [steps('Copilot Pages 흐름', ['답변에서 Edit in Pages를 선택합니다.', '텍스트·표·이미지를 다듬고 추가 프롬프트로 확장합니다.', '팀원과 공유하고 필요하면 Word로 변환합니다.']), bullets('Library', ['이미지·Pages를 유형별로 필터링합니다.', 'Teams·이메일로 공유합니다.', '과거 작업을 다시 열어 재사용합니다.']), steps('실무 흐름 예시', ['Chat에서 3분기 실적 브리핑 초안을 만듭니다.', 'Pages에서 표와 문장을 다듬습니다.', 'Word로 변환하고 Library에 남깁니다.'])], ['Pages는 답변을 편집·공유하는 캔버스입니다.', '채팅 → Pages → 문서 흐름으로 결과를 남깁니다.']],
  'm02-4': ['M2-4', '이미지 생성', '슬라이드·문서·공지에 쓸 이미지를 프롬프트로 만들고 Library에 보관합니다.', [bullets('이미지 프롬프트 구성', ['주제·스타일·색감·비율·용도를 함께 적습니다.', '예: 따뜻한 톤의 팀워크 일러스트, 가로형, 텍스트 없이']), bullets('활용', ['PowerPoint·Word에 삽입합니다.', 'Pages를 꾸미고 Library에서 재사용합니다.']), bullets('유의점', ['서비스 가용성은 액세스 수준에 따라 다를 수 있습니다.', '사람·브랜드·저작물을 묘사할 때 정책과 저작권을 확인합니다.', '생성물은 배포 전 검토합니다.'])], ['구체적인 주제·스타일·색·비율·용도가 좋은 결과를 만듭니다.', '생성물은 초안으로 검토 후 사용합니다.']],
  'm02-5': ['M2-5', '예약 프롬프트', '반복 작업을 예약해 자동 실행합니다.', [steps('예약 만들기', ['무엇을·언제를 메시지에 함께 적습니다.', '예: 매일 아침 9시에 하루 브리핑을 보내줘']), table('관리하기', ['메뉴', '기능'], [['Runs', '지난·예정 실행 내역'], ['Manage schedules', '편집·일시중지·재개·삭제']]), bullets('활용과 유의', ['아침 받은 편지함·일정 요약과 주간 상태 보고에 활용합니다.', '예약은 최대 5개 기준이며 자동 결과도 초안으로 검토합니다.'])], ['무엇을·언제를 적으면 예약을 만들 수 있습니다.', 'Scheduled 페이지에서 실행과 정의를 관리합니다.']],
  'm02-6': ['M2-6', '메모리·개인 설정', 'Copilot이 나를 기억하게 하되 무엇을 기억할지는 내가 통제합니다.', [table('세 가지 개인화 요소', ['요소', '의미', '예시'], [['사용자 지정 지침', '항상 지킬 규칙', '한국어·정중한 어조·표 선호'], ['저장된 메모리', '내가 저장한 사실', '마케팅팀·국내 캠페인 담당'], ['채팅 기록', '대화에서 유추한 맥락', '반복 주제·선호']]), bullets('설정과 통제', ['설정 > 개인 설정에서 지침을 관리합니다.', '저장된 메모리는 직접 삭제할 때까지 유지됩니다.', '민감 정보가 섞이면 메모리와 기록을 점검합니다.'])], ['지침·저장된 메모리·채팅 기록이 개인화를 만듭니다.', '반복 배경은 지침으로, 민감 정보는 주기적으로 점검합니다.']],
  'm03-1': ['M3-1', 'Copilot Search', '키워드가 아니라 의미로 찾고, 검색 답변에서 채팅으로 이어갑니다.', [bullets('무엇인가', ['Microsoft 365와 연결된 타사 원본까지 통합 검색합니다.', '100개 이상의 커넥터로 관련 결과를 찾습니다.']), bullets('자연어 검색', ['지난주 John이 보낸 4분기 예측 이메일 보여줘', '지역별 마케팅 ROI 스프레드시트는 어디 있나?']), table('Search vs Chat', ['항목', 'Search', 'Chat'], [['적합', '빠르게 찾기', '심층 답변·생성·작업'], ['스타일', '검색 쿼리', '대화형'], ['데이터', 'Graph + 타사', 'Graph + 타사 + 웹']])], ['의미 기반 통합 검색으로 의도까지 해석합니다.', '찾기(Search) → 심화(Chat) 흐름으로 연결합니다.']],
  'm03-2': ['M3-2', 'Copilot Notebooks', '파일·링크·이메일을 한 노트북에 모아 근거 있는 작업 공간을 만듭니다.', [bullets('노트북이란', ['특정 프로젝트·주제의 참조를 모아 두는 공간입니다.', '담은 자료가 대화의 근거 범위가 됩니다.']), bullets('개편된 화면', ['참조·Pages·Copilot 채팅을 나란히 봅니다.', '왼쪽 참조 목록과 가운데·오른쪽 콘텐츠를 함께 사용합니다.']), steps('참조 추가', ['노트북을 열고 참조 추가를 선택합니다.', '파일·링크·이메일을 선택합니다.', '자료 기준으로 핵심 쟁점을 정리합니다.'])], ['노트북은 참조를 모은 근거 범위입니다.', '조사·회의 준비·반복 주제에 특히 유용합니다.']],
  'm03-3': ['M3-3', 'Notebooks 산출물 — Quick create', '노트북에 모은 맥락으로 Word·Excel·PowerPoint·마인드맵을 만듭니다.', [table('Quick create 결과물', ['결과물', '용도'], [['Word 문서', '조사 결과를 보고서로'], ['Excel 표', '정리한 데이터를 스프레드시트로'], ['PowerPoint 덱', '노트북 맥락으로 슬라이드 구성'], ['마인드맵', '아이디어·구조를 시각화']]), steps('PowerPoint 덱 만들기', ['노트북을 엽니다.', 'Quick create에서 PowerPoint presentation을 선택합니다.', '생성된 덱을 채팅 또는 PowerPoint에서 편집합니다.']), bullets('실무 흐름', ['참조 모으기 → 질문·정리 → Quick create → 앱에서 다듬기'])], ['노트북 맥락으로 편집 가능한 결과물을 만듭니다.', '모으기 → 정리 → 산출 → 다듬기 흐름을 완성합니다.']],
}

const remainingPages = {
  'm04-1': ['M4-1', 'Word에서 Copilot', '빈 화면 앞에서 막히지 않습니다. Copilot이 초안·재작성·요약·질문까지 함께합니다.', [bullets('초안 만들기', ['새 문서 초안을 만들고 회의록·기획서를 근거로 문서를 생성합니다.', '목차만 주고 각 절에 내용을 채웁니다.']), bullets('재작성·요약·문서 채팅', ['선택한 문단을 더 간결하게·정중하게·불릿으로 바꿉니다.', '긴 문서의 핵심과 의무·기한을 뽑고 문서에 질문합니다.']), bullets('실무 팁', ['근거 파일을 지정하고 사실·수치를 검토합니다.', '긴 문서는 절 단위로 나눠 지시합니다.'])], ['초안·재작성·요약·질문이 Word Copilot의 축입니다.', '결과는 초안이므로 사실과 수치를 검토합니다.']],
  'm04-2': ['M4-2', 'Excel에서 Copilot — Edit with Copilot', '2026년 Excel Copilot은 표·차트·피벗·수식을 직접 다루며 복잡한 데이터 작업을 돕습니다.', [bullets('Edit with Copilot', ['월별 피벗과 추세 차트를 만듭니다.', '중복을 제거하고 부서별 합계 표를 만듭니다.', '이상치가 있는 행을 표시하고 이유를 설명합니다.']), bullets('수식·인사이트·Work IQ', ['전년 대비 증감률 수식을 제안받습니다.', '데이터에서 눈에 띄는 인사이트와 차트 유형을 찾습니다.', '관련 이메일·회의·파일을 연결해 다단계 편집을 돕습니다.']), bullets('실무 팁', ['데이터를 표(Table)로 정리합니다.', '큰 변경은 사본에서 시도하고 결과 수식을 검산합니다.'])], ['Edit with Copilot은 Excel 도구를 직접 조작합니다.', '표 정리·사본 작업·검산이 정확성 습관입니다.']],
  'm04-3': ['M4-3', 'PowerPoint에서 Copilot', '프롬프트나 Word 문서로 발표 뼈대를 만들고 슬라이드와 서식을 다듬습니다.', [bullets('프레젠테이션 생성', ['신규 서비스 소개 10장과 회사 템플릿을 요청합니다.', 'Word 파일과 Notebooks 맥락에서 덱을 생성합니다.']), bullets('슬라이드 편집·요약', ['슬라이드 추가·이미지 삽입·전체 서식 통일을 명령합니다.', '긴 덱을 요약하고 재무 관련 슬라이드를 찾습니다.']), bullets('실무 팁', ['회사 템플릿으로 브랜드 일관성을 유지합니다.', '자동 생성 덱은 메시지와 순서를 직접 다듬습니다.'])], ['프롬프트·Word·Notebooks에서 덱을 생성합니다.', '생성 결과는 구성 초안이므로 직접 다듬습니다.']],
  'm04-4': ['M4-4', 'Outlook에서 Copilot', '긴 스레드를 요약하고 초안을 대신 쓰며 어조를 코칭받습니다.', [bullets('스레드 요약·초안·코칭', ['결정·쟁점·남은 액션을 정리합니다.', '정중한 회신 초안과 회의 일정 제안을 작성합니다.', '명확성·감정·어조를 평가하고 개선합니다.']), bullets('받은 편지함·일정 전체 추론', ['2026년 Copilot Chat은 메일과 일정 전체를 대상으로 추론합니다.', '오늘 놓치면 안 되는 메일과 회의를 마감 순으로 정리합니다.']), bullets('실무 팁', ['회신 초안의 사실과 약속을 검토합니다.', '민감한 내용은 어조 코칭으로 점검합니다.'])], ['요약·초안·코칭이 Outlook Copilot의 3축입니다.', '발송 전 사실과 어조를 점검합니다.']],
  'm04-5': ['M4-5', 'Teams에서 Copilot', '채팅·채널을 따라잡고 회의를 요약하며 실시간으로 질문합니다.', [bullets('채팅·채널·모임·통화', ['채팅의 최근 핵심과 채널의 결정·담당자를 요약합니다.', '회의 중 핵심 논의와 결정, 회의 후 액션 항목을 정리합니다.', '통화의 핵심 포인트와 작업 소유자를 캡처합니다.']), bullets('확장된 접근', ['2026년 Copilot Chat이 Teams 채팅·채널·통화·모임 전체로 확장됐습니다.']), bullets('실무 팁', ['회의록과 액션 항목은 공유 전 사실을 확인합니다.', '긴 채널은 기간과 주제로 범위를 지정합니다.'])], ['채팅·채널 요약, 모임 Q&A, 통화 액션 캡처가 핵심입니다.', '인용 확인과 범위 지정으로 신뢰성을 유지합니다.']],
  'm04-6': ['M4-6', '기타 앱 — OneNote·Loop·Whiteboard·Forms·Edge', '핵심 4대 앱 외에도 메모·공동작업·아이디어·설문·웹까지 Copilot을 활용합니다.', [bullets('앱별 활용', ['OneNote: 메모를 할 일 목록으로 정리합니다.', 'Loop: 공동 콘텐츠와 업무 추적을 만듭니다.', 'Whiteboard: 아이디어를 만들고 테마로 묶습니다.', 'Forms: 설문과 퀴즈 초안을 만듭니다.', 'Edge: 열린 웹페이지를 요약하고 후속 질문을 합니다.'])], ['각 앱의 작업 맥락에서 Copilot을 바로 호출합니다.', '어디서나 결과는 초안이므로 검토 후 확정합니다.']],
  'm05-1': ['M5-1', '에이전트 이해·Agent Store', '에이전트는 특정 업무·데이터에 범위를 좁힌 Copilot이며 대부분 Store에서 골라 씁니다.', [bullets('에이전트란', ['특정 지식·도구·지침으로 한 가지 일을 잘하도록 구성합니다.', '지원 티켓·HR 정보 조회 같은 업무에 활용합니다.']), table('Agent Store', ['종류', '예시'], [['Microsoft 사전 구축', 'Researcher·Analyst'], ['조직 배포', '우리 회사가 만든 에이전트'], ['파트너·타사', 'Store 게시 에이전트']]), bullets('@멘션', ['Copilot Chat에서 @PowerPoint·@Excel 같은 앱 에이전트를 호출합니다.'])], ['에이전트는 한 가지 업무에 특화된 Copilot입니다.', 'Store에서 찾고 채팅의 @멘션으로 호출합니다.']],
  'm05-2': ['M5-2', 'Researcher·Analyst', 'Researcher는 깊게 조사하고 Analyst는 데이터를 다단계로 분석합니다.', [bullets('Researcher', ['업무 데이터와 웹을 가로질러 다단계 조사를 수행합니다.', '규제 변화나 경쟁사 전략처럼 복잡한 과제에 적합합니다.']), bullets('Analyst', ['원시 데이터를 정제·분석·시각화합니다.', '가설을 세우고 데이터로 검증합니다.']), table('언제 쓰나', ['과제', '도구'], [['넓은 주제 조사', 'Researcher'], ['숫자·데이터 인사이트', 'Analyst'], ['간단한 질문·요약', '일반 Copilot Chat']])], ['Researcher는 심층 조사, Analyst는 데이터 분석에 특화됩니다.', '결과의 출처와 계산을 검증합니다.']],
  'm05-3': ['M5-3', 'Agent Builder로 나만의 에이전트', '코드 없이 말로 설명하듯 나만의 에이전트를 만들고 반복해서 사용합니다.', [table('구성 요소', ['요소', '역할', '예시'], [['이름·설명', '무엇을 하는가', '회의록 정리 도우미'], ['지침', '행동·어조·규칙', '결정·액션·기한을 표로'], ['지식', '근거 자료', 'SharePoint 사이트·파일'], ['시작 프롬프트', '예시 질문', '이 회의록 정리해줘']]), steps('만드는 흐름', ['Agent Builder에서 새 에이전트를 엽니다.', '자연어 설명으로 기본 구성을 만듭니다.', '지침·지식·시작 프롬프트를 다듬습니다.', '테스트하고 나만의 사용자·팀에 공유합니다.'])], ['이름·지침·지식·시작 프롬프트 4요소로 구성합니다.', '한 가지 일에 집중하고 테스트 후 공유합니다.']],
  'm06-1': ['M6-1', 'Copilot Cowork 개요·작업 위임', '질문에 답하는 것을 넘어 작업을 처음부터 끝까지 실행해 완성물을 반환합니다.', [bullets('Cowork란', ['계획·실행·산출을 스스로 하는 에이전틱 시스템입니다.', '초안·추천이 아니라 완성된 결과물을 반환합니다.']), table('에이전트 vs Cowork', ['항목', '에이전트', 'Cowork'], [['성격', '특정 업무 대화형 도우미', '작업을 끝까지 실행'], ['결과', '답변·초안', '완성된 산출물'], ['사용', 'Store·@멘션', '작업을 정의해 위임']]), steps('작업 위임 흐름', ['목표·근거·산출 형식을 서술합니다.', 'Cowork가 계획을 세우고 실행합니다.', '진행과 활성 스킬을 확인합니다.', '완성물을 검토하고 후속 지시합니다.'])], ['Cowork는 실행형 동료입니다.', '명확히 정의하고 사람이 최종 검토합니다.']],
  'm06-2': ['M6-2', 'Cowork 스킬·플러그인', 'Cowork의 작업 방식을 스킬로 재사용하고 App Store 플러그인으로 확장합니다.', [bullets('스킬과 공유', ['반복 업무를 재사용 가능한 방식으로 저장합니다.', 'Customize에서 나만 또는 특정 사용자와 공유하고 Re-share합니다.']), bullets('플러그인 스킬', ['Microsoft 365 App Store에서 획득합니다.', '세션 맥락에 따라 자동 활성화되고 사이드 패널에 표시됩니다.']), bullets('활용 원칙', ['정형화된 반복 업무를 스킬로 만듭니다.', '검증된 스킬을 팀에 공유하고 필요한 플러그인만 사용합니다.'])], ['스킬은 Cowork 작업 방식의 재사용 단위입니다.', '반복 업무를 표준화해 팀 품질을 높입니다.']],
  'm06-3': ['M6-3', 'Cowork 예약·사용 이해', 'Cowork는 반복 작업을 예약할 수 있고 사용량 기반 특성이 있습니다.', [table('예약 관리', ['메뉴', '기능'], [['Runs', '지난·예정 실행'], ['Manage schedules', '정의 편집·일시중지·재개·삭제']]), bullets('사용량·라이선스', ['Microsoft 365 Copilot 라이선스가 필요합니다.', '에이전틱 작업은 사용량 기반 특성이 있으므로 범위를 관리합니다.']), bullets('잘 쓰는 원칙', ['명확히 정의합니다.', '사람이 결과를 검토합니다.', '반복은 예약하고 범위를 적절히 관리합니다.'])], ['Cowork도 Scheduled 페이지에서 예약 실행을 관리합니다.', '라이선스·사용량·검토 원칙을 함께 이해합니다.']],
  'm07-1': ['M7-1', 'Lab 0. Copilot Chat·프롬프트 워밍업', '그라운딩·참조·프롬프트 4요소를 손에 익히는 모든 Lab의 기본기입니다.', [bullets('준비물', ['Microsoft 365 Copilot 또는 Copilot Chat 계정', '회의록·기획서·데이터 표 같은 실습 파일 1개']), steps('실습 단계', ['파일을 업로드하고 4요소 프롬프트로 요약합니다.', '/ 참조와 범위 지정으로 근거를 좁힙니다.', 'Work IQ를 켜고 끄며 답의 차이를 비교하고 인용을 확인합니다.']), bullets('체크포인트', ['원하는 형식의 답을 얻었습니다.', '참조와 범위 지정으로 근거를 좁혔습니다.', 'Work IQ 전환과 인용 확인을 했습니다.'])], ['근거 + 형식 + 검증이 기본 루틴입니다.', '후속 지시로 답을 다듬습니다.']],
  'm07-2': ['M7-2', 'Lab 1. 문서 자동화 — Chat → Word → PPT', '자료에서 초안을 만들고 Pages·Word를 거쳐 발표 덱까지 완성합니다.', [bullets('준비물', ['Microsoft 365 Copilot 라이선스 계정', '회의록·데이터·기획 메모 2~3개']), steps('실습 단계', ['Notebooks에 자료와 이메일을 참조로 모읍니다.', 'Chat에서 보고서 초안을 만들고 Pages와 Word로 다듬습니다.', 'Quick create 또는 PowerPoint에서 덱을 생성합니다.', '사실·수치를 인용으로 대조하고 팀에 공유합니다.'])], ['모으기 → 초안 → 편집 → 발표 파이프라인을 완성합니다.', '마지막은 언제나 사실 검토입니다.']],
  'm07-3': ['M7-3', 'Lab 2. 하루 업무 — Outlook·Teams', '메일·회의로 하루를 시작하고 마무리하는 실무 루틴을 Copilot으로 처리합니다.', [bullets('준비물', ['Microsoft 365 Copilot 계정', '받은 편지함·오늘 일정·최근 Teams 회의']), steps('실습 단계', ['아침 브리핑으로 놓치면 안 되는 메일과 회의를 정리합니다.', '회신 초안과 어조 코칭을 받고 사실을 검토합니다.', 'Teams 회의·채널의 결정과 액션을 담당자·기한으로 정리합니다.', '오늘의 결정·약속·남은 일을 롤업합니다.'])], ['아침 브리핑 → 회신·코칭 → 회의 → 롤업 루틴입니다.', '발송·공유 전 사실과 어조를 점검합니다.']],
  'm07-4': ['M7-4', 'Lab 3. 나만의 에이전트 (선택)', 'Agent Builder로 반복 업무용 에이전트를 만들고 팀에 공유합니다.', [bullets('준비물', ['Microsoft 365 Copilot 계정', 'Agent Builder 권한', '회의록이 있는 SharePoint 사이트']), steps('실습 단계', ['회의록을 결정·액션·기한 표로 정리하는 에이전트를 정의합니다.', '지식 사이트와 짧고 명확한 지침을 지정합니다.', '여러 예시로 테스트하고 나만·특정 사용자·팀에 공유합니다.']), bullets('체크포인트', ['한 가지 일에 특화된 에이전트를 만들었습니다.', '지식과 지침을 다듬었습니다.', '테스트 후 팀에 공유했습니다.'])], ['Agent Builder는 코드 없이 만드는 선언형 에이전트입니다.', '한 가지 일에 집중하고 테스트 후 공유합니다.']],
  'm07-5': ['M7-5', 'Lab 4. Cowork (선택)', 'Cowork에 작업을 위임해 완성물을 받고 스킬·예약으로 반복 업무를 자동화합니다.', [bullets('준비물', ['Microsoft 365 Copilot 계정', 'Cowork 권한', 'SharePoint·OneDrive 근거 자료 폴더']), steps('실습 단계', ['분기 리뷰 보고서를 완성해 달라고 작업을 위임합니다.', '진행 상황과 활성 스킬을 확인하고 완성물을 검토합니다.', '작업 방식을 스킬로 저장·공유합니다.', '매주 상태 보고서처럼 반복 작업을 예약합니다.'])], ['Cowork는 작업을 끝까지 실행하지만 사람이 검토합니다.', '스킬로 재사용하고 반복은 예약합니다.']],
}

const normalizePage = (slug, value) => {
  if (Array.isArray(value)) {
    const [code, title, summary, sections, takeaways] = value
    return modulePage(slug, code, title, summary, sections, takeaways, null, null)
  }
  return value
}

Object.entries(subPages).forEach(([slug, value]) => { coursePages[slug] = normalizePage(slug, value) })
Object.entries(detailPages).forEach(([slug, value]) => { coursePages[slug] = normalizePage(slug, value) })
Object.entries(remainingPages).forEach(([slug, value]) => { coursePages[slug] = normalizePage(slug, value) })

const courseSlugOrder = courseModuleGroups.flatMap((group) => [group.slug, ...(group.children?.map(([, , slug]) => slug) || [])])
courseSlugOrder.forEach((slug, index) => {
  const page = coursePages[slug]
  if (!page) return
  page.previous = page.previous || courseSlugOrder[index - 1] || null
  page.next = page.next || courseSlugOrder[index + 1] || null
})

const profileSectionIds = ['bio', 'fields', 'history', 'certifications', 'books']

const getCourseSlug = () => {
  const hash = window.location.hash.replace(/^#/, '')
  if (hash === 'm365-copilot') return 'm00'
  if (hash.startsWith('m365-copilot/')) return hash.replace('m365-copilot/', '')
  return null
}

function App() {
  const [openSections, setOpenSections] = useState(profileSectionIds)
  const [openHistoryYears, setOpenHistoryYears] = useState(['2026'])
  const [activeView, setActiveView] = useState(() => {
    if (getCourseSlug()) return 'courseDoc'
    if (window.location.hash === '#labs') return 'labs'
    if (window.location.hash === '#inquiry') return 'contact'
    return 'home'
  })
  const [courseSlug, setCourseSlug] = useState(() => getCourseSlug() || 'm00')
  const [contactForm, setContactForm] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    inquiryType: '기업/기관 교육 문의',
    message: '',
  })

  const isOpen = (id) => openSections.includes(id)
  const toggleSection = (id) => {
    setOpenSections((current) =>
      current.includes(id)
        ? current.filter((section) => section !== id)
        : [...current, id],
    )
  }
  const isHistoryYearOpen = (year) => openHistoryYears.includes(year)
  const toggleHistoryYear = (year) => {
    setOpenHistoryYears((current) =>
      current.includes(year)
        ? current.filter((openYear) => openYear !== year)
        : [...current, year],
    )
  }
  const saveProfilePdf = () => {
    setOpenSections(profileSectionIds)
    window.setTimeout(() => window.print(), 0)
  }
  const openHomeSection = (href) => (event) => {
    event.preventDefault()
    setActiveView('home')
    window.history.replaceState(null, '', href)
    window.setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 0)
  }
  const openLabsView = (event) => {
    event.preventDefault()
    setActiveView('labs')
    window.history.replaceState(null, '', '#labs')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const openLabDetail = (event) => {
    event.preventDefault()
    setActiveView('courseDoc')
    setCourseSlug('m00')
    window.history.replaceState(null, '', '#m365-copilot')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const openCoursePage = (event, slug) => {
    event.preventDefault()
    setActiveView('courseDoc')
    setCourseSlug(slug)
    window.history.replaceState(null, '', `#m365-copilot/${slug}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const openCourseHub = (event) => {
    event.preventDefault()
    setActiveView('courseDoc')
    setCourseSlug('m00')
    window.history.replaceState(null, '', '#m365-copilot')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const openContactForm = (event) => {
    event?.preventDefault()
    setActiveView('contact')
    window.history.replaceState(null, '', '#inquiry')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const updateContactForm = (event) => {
    const { name, value } = event.target
    setContactForm((current) => ({ ...current, [name]: value }))
  }
  const submitContactForm = (event) => {
    event.preventDefault()
    const body = [
      `성함: ${contactForm.name}`,
      `회사/기관: ${contactForm.organization}`,
      `이메일: ${contactForm.email}`,
      `연락처: ${contactForm.phone}`,
      `문의 유형: ${contactForm.inquiryType}`,
      '',
      '문의 내용:',
      contactForm.message,
    ].join('\n')

    window.location.href = `mailto:jin1082@naver.com?subject=${encodeURIComponent('HelloPT 강의 의뢰')}&body=${encodeURIComponent(body)}`
  }
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" onClick={openHomeSection('#top')} aria-label="HelloPT 홈으로 이동">
          <img src={asset('brand/hellopt-logo-original.png')} alt="HelloPT" />
        </a>
        <nav aria-label="주요 메뉴">
          {navItems.map(([label, href, view]) => <a key={href} href={href} onClick={view === 'labs' ? openLabsView : openHomeSection(href)}>{label}</a>)}
        </nav>
        <div className="header-badges" aria-label="강사 인증 로고">
          <img className="header-titan-badge" src={asset('brand/titan-badge.png')} alt="TITAN" />
          <img className="header-mct-badge" src={asset('brand/mct-badge-round.png')} alt="MCT" />
        </div>
      </header>

      <main id="top">
        {activeView === 'home' ? <>
          <section className="hero-section">
          <div className="hero-copy">
            <p className="hero-kicker">Microsoft Certified Trainer · HelloPT</p>
            <h1>AI는 도구가 아닙니다. <span>새로운 업무 파트너입니다.</span></h1>
            <p>기업과 기관의 업무 현장에 맞춘 Microsoft AI, Copilot Studio, Excel 데이터 분석, 프레젠테이션 실습 교육을 진행합니다.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#inquiry" onClick={openContactForm}>강의 문의하기</a>
              <a className="ghost-button" href="#profile" onClick={openHomeSection('#profile')}>프로필 보기</a>
            </div>
            <div className="chip-row" aria-label="주요 교육 키워드">
              {heroChips.map((chip) => <span key={chip}>{chip}</span>)}
            </div>
          </div>
          </section>

          <section className="stats-band" aria-label="핵심 신뢰 지표">
          {stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </section>

          <section className="logo-strip" aria-label="주요 강의 기업 및 기관">
          <div className="strip-track">
            {[...partners, ...partners].map((partner, index) => <span key={`${partner}-${index}`}>{partner}</span>)}
          </div>
          </section>

          <section id="profile" className="section profile-section">
          <SectionHead eyebrow="Profile" title="박은진 강사 프로필" text="" />
          <div className="accordion-stack">
            <AccordionPanel id="bio" title="약력" open={isOpen('bio')} onToggle={toggleSection}>
              <div className="bio-layout">
                <img className="bio-photo" src={asset('brand/portrait.png')} alt="박은진 강사 얼굴 사진" />
                <div className="bio-copy">
                  <div className="bio-identity">
                    <span>Hello. People & Technology.</span>
                    <h3>박은진 강사</h3>
                  </div>
                  <div className="bio-roles" aria-label="주요 약력">
                    <span>HelloPT 대표</span>
                    <span>Microsoft Certified Trainer</span>
                    <span>Frontier Transformation Engineer</span>
                  </div>
                  <div className="bio-contact" aria-label="강사 연락처">
                    <a href="tel:01047070285">010-4707-0285</a>
                    <a href="mailto:jin1082@naver.com">jin1082@naver.com</a>
                  </div>
                  <div className="profile-actions">
                    <button className="outline-button" type="button" onClick={saveProfilePdf}>프로필 PDF 저장</button>
                    <a className="outline-button" href="https://www.linkedin.com/in/hellopt" target="_blank" rel="noreferrer">LinkedIn</a>
                  </div>
                </div>
                <div className="bio-side">
                  <div className="bio-badges" aria-label="강사 인증 및 브랜드">
                    <img className="titan-badge" src={asset('brand/titan-badge.png')} alt="Microsoft Frontier Transformation Engineer TITAN 뱃지" />
                    <img className="mct-badge" src={asset('brand/mct-badge-round.png')} alt="MCT 뱃지" />
                  </div>
                </div>
              </div>
            </AccordionPanel>

            <AccordionPanel id="fields" title="강의분야" open={isOpen('fields')} onToggle={toggleSection}>
              <div className="field-grid">{fields.map(([title, desc]) => <article key={title}><strong>{title}</strong><p>{desc}</p></article>)}</div>
            </AccordionPanel>

            <AccordionPanel id="history" title="강의이력" open={isOpen('history')} onToggle={toggleSection}>
              <div className="history-timeline">
                {groupedHistory.map(({ year, items }) => (
                  <section className="history-year-group" key={year}>
                    <button type="button" className="history-year-marker" aria-expanded={isHistoryYearOpen(year)} aria-controls={`history-${year}-content`} onClick={() => toggleHistoryYear(year)}>
                      <strong>{year}</strong>
                      <span aria-hidden="true">{isHistoryYearOpen(year) ? '▴' : '▾'}</span>
                    </button>
                    {isHistoryYearOpen(year) && (
                      <div className="history-course-list" id={`history-${year}-content`}>
                        {items.map(([company, title]) => (
                          <article className="history-course-card" key={`${year}-${company}-${title}`}>
                            <strong>{company}</strong>
                            <p>{title}</p>
                          </article>
                        ))}
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </AccordionPanel>

            <AccordionPanel id="certifications" title="자격증" open={isOpen('certifications')} onToggle={toggleSection}>
              <div className="cert-grid">{certifications.map(([code, name, img, link]) => <a className="cert-card" key={code} href={link} target="_blank" rel="noreferrer"><img src={asset(img)} alt={`${code} ${name} 뱃지`} /><span>{code}</span><strong>{name}</strong></a>)}</div>
            </AccordionPanel>

            <section className="accordion-panel book-panel">
              <button type="button" className="accordion-trigger" aria-expanded={isOpen('books')} aria-controls="books-content" onClick={() => toggleSection('books')}>
                <span>저서</span><strong className="accordion-icon" aria-label={isOpen('books') ? '접기' : '펼치기'}>{isOpen('books') ? '▴' : '▾'}</strong>
              </button>
              <div className="book-preview-strip" aria-label="저서 표지 썸네일">
                {bookThumbnails.map((file, index) => <img key={file} src={asset(`books/${file}`)} alt={`박은진 강사 저서 표지 ${index + 1}`} loading="lazy" />)}
              </div>
              {isOpen('books') && (
                <div className="accordion-content" id="books-content">
                  <div className="book-list" aria-label="저서 목록">
                    {books.map(([title, meta]) => (
                      <article key={title}>
                        <strong>{title}</strong>
                        <span>{meta}</span>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
          </section>

          <section id="courses" className="section courses-section">
          <SectionHead eyebrow="Training Programs" title="실무 중심 교육과정" text="강의 주제별 목표와 결과물이 명확한 기업 맞춤형 과정입니다." centered />
          <div className="course-grid">{courses.map(([title, desc, tags]) => <article className="course-card" key={title}><h3>{title}</h3><p>{desc}</p><div>{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>
          </section>

          <section id="contact" className="section contact-section">
          <div className="contact-card">
            <div className="contact-head">
              <p className="eyebrow">CONTACT</p>
              <h2>AI · 데이터 · 업무혁신을 설계합니다.</h2>
              <p>기업 맞춤형 강의 요청 · 특강 · 컨퍼런스 및 협업 문의를 기다립니다.</p>
            </div>
            <button className="mail-button" type="button" onClick={openContactForm}>강의 의뢰</button>
          </div>
          </section>
        </> : activeView === 'contact' ? (
          <section className="contact-form-shell contact-page-section" aria-label="강의 의뢰 폼">
              <div className="contact-form-layout">
                <section className="lecture-form-card" aria-labelledby="lecture-form-title">
                  <div className="form-title-block">
                    <h3 id="lecture-form-title">강의 문의</h3>
                    <p>아래 폼을 작성해 주시면 이메일로 접수되어 빠르게 회신드립니다.</p>
                  </div>
                  <form className="lecture-form" onSubmit={submitContactForm}>
                    <label>
                      <span>성함 <em>*</em></span>
                      <input name="name" type="text" value={contactForm.name} onChange={updateContactForm} required />
                    </label>
                    <label>
                      <span>회사/기관</span>
                      <input name="organization" type="text" value={contactForm.organization} onChange={updateContactForm} />
                    </label>
                    <label>
                      <span>이메일 <em>*</em></span>
                      <input name="email" type="email" value={contactForm.email} onChange={updateContactForm} required />
                    </label>
                    <label>
                      <span>연락처</span>
                      <input name="phone" type="tel" value={contactForm.phone} onChange={updateContactForm} />
                    </label>
                    <label className="form-wide">
                      <span>문의 유형</span>
                      <select name="inquiryType" value={contactForm.inquiryType} onChange={updateContactForm}>
                        <option>기업/기관 교육 문의</option>
                        <option>특강 문의</option>
                        <option>컨퍼런스/세미나 문의</option>
                        <option>협업 문의</option>
                      </select>
                    </label>
                    <label className="form-wide">
                      <span>문의 내용 <em>*</em></span>
                      <textarea name="message" rows="6" value={contactForm.message} onChange={updateContactForm} placeholder="교육 대상·인원·희망 일정 등을 함께 적어 주시면 더 빠르게 안내드릴 수 있습니다." required />
                    </label>
                    <button className="form-submit" type="submit">문의 보내기 →</button>
                  </form>
                </section>
                <section className="contact-info-panel" aria-label="직접 연락처">
                  <h3>Contact</h3>
                  <div className="contact-info-grid">
                    <a href="tel:01047070285">
                      <span aria-hidden="true">☎</span>
                      <small>PHONE</small>
                      <strong>010-4707-0285</strong>
                    </a>
                    <a href="mailto:jin1082@naver.com">
                      <span aria-hidden="true">✉</span>
                      <small>EMAIL</small>
                      <strong>jin1082@naver.com</strong>
                    </a>
                    <a href="https://www.linkedin.com/in/hellopt" target="_blank" rel="noreferrer">
                      <span aria-hidden="true">in</span>
                      <small>LINKEDIN</small>
                      <strong>www.linkedin.com/in/hellopt</strong>
                    </a>
                  </div>
                </section>
              </div>
          </section>
        ) : activeView === 'courseDoc' ? (
          <CourseDocument page={coursePages[courseSlug] || coursePages.m00} courseSlug={courseSlug} onNavigate={openCoursePage} onBack={openLabsView} onHub={openCourseHub} />
        ) : activeView === 'labDetail' ? (
          <section id="m365-copilot" className="lab-detail-section">
            <div className="lab-detail-hero">
              <a className="detail-back-link" href="#labs" onClick={openLabsView}>← 핸즈온랩 목록</a>
              <p className="eyebrow">Course 01 · Hands-on Lab</p>
              <h1>Microsoft 365 Copilot 기능·활용 실무</h1>
              <p>Microsoft 365 Copilot을 관리자가 아닌 엔드유저 관점에서, 무엇을 · 어디서 · 어떻게 쓰는가를 기능별로 익히는 하루 완성 실무 과정입니다.</p>
              <div className="detail-tags" aria-label="과정 핵심 키워드">
                {['Copilot Chat', 'Word·Excel·PowerPoint', 'Outlook·Teams', 'Search·Notebooks', 'Agent·Cowork'].map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>

            <div className="lab-detail-content">
              <section className="detail-panel detail-summary-panel">
                <div>
                  <p className="eyebrow">Overview</p>
                  <h2>공개 과정</h2>
                  <p>Word·Excel·PowerPoint·Outlook·Teams 안의 Copilot부터 Copilot Chat·Search·Notebooks·에이전트·Cowork까지, 실제 업무자가 자주 만나는 기능을 실무 시나리오로 직접 써 보며 익힙니다.</p>
                </div>
                <aside className="detail-callout">
                  <strong>과정 목표</strong>
                  <p>새 Copilot 앱 화면에서 시작해 문서 작성, 데이터 분석, 회의·메일 처리, 업무 위임까지 하루 업무 흐름으로 연결합니다.</p>
                </aside>
              </section>

              <section className="detail-panel">
                <p className="eyebrow">What’s New</p>
                <h2>2026년 무엇이 달라졌나</h2>
                <div className="update-grid">
                  {m365Updates.map((item) => <article key={item}>{item}</article>)}
                </div>
              </section>

              <section className="detail-panel">
                <p className="eyebrow">Curriculum</p>
                <h2>모듈 목차</h2>
                <div className="table-scroll">
                  <table className="detail-table module-table">
                    <thead>
                      <tr><th>모듈</th><th>주제</th><th>핵심 내용</th></tr>
                    </thead>
                    <tbody>
                      {m365Modules.map(([module, topic, details]) => <tr key={module}><th>{module}</th><td>{topic}</td><td>{details}</td></tr>)}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="detail-panel">
                <p className="eyebrow">Schedule</p>
                <h2>1일 타임테이블 <span>09:00~18:00</span></h2>
                <p className="detail-note">50분 수업 · 10분 휴식 · 점심 11:50~13:00 기준으로 운영합니다.</p>
                <div className="table-scroll">
                  <table className="detail-table schedule-table">
                    <thead>
                      <tr><th>시간</th><th>모듈</th><th>내용</th><th>형태</th></tr>
                    </thead>
                    <tbody>
                      {m365Schedule.map(([time, module, details, type]) => <tr key={`${time}-${module}`}><th>{time}</th><td>{module}</td><td>{details}</td><td><span>{type}</span></td></tr>)}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="detail-panel detail-two-column">
                <div>
                  <p className="eyebrow">Preparation</p>
                  <h2>실습 준비물</h2>
                  <p>실습에는 Microsoft 365 Copilot 라이선스가 부여된 회사·학교 계정이 필요합니다. Copilot Chat만 있는 계정으로도 프롬프트·이미지·Pages 일부 실습은 진행할 수 있으나, 업무 데이터 그라운딩과 앱 내 Copilot 실습은 라이선스가 있어야 합니다.</p>
                </div>
                <div>
                  <p className="eyebrow">Mental Model</p>
                  <h2>한 줄 멘탈모델</h2>
                  <p className="detail-quote">묻지 말고 맡겨라. 어디서 시작하고, 무엇에 근거하며, 어떻게 요청할지 갖추면 Copilot이 초안·요약·분석·실행까지 끌고 갑니다.</p>
                </div>
              </section>

              <section className="detail-panel">
                <p className="eyebrow">Next Step</p>
                <h2>다음 단계</h2>
                <div className="detail-next-actions">
                  <a href="https://canrobot.co.kr/courses/m365-copilot/m00/" target="_blank" rel="noreferrer">M0. What’s New 2026</a>
                  <a href="https://canrobot.co.kr/courses/m365-copilot/m01/" target="_blank" rel="noreferrer">M1. 시작하기</a>
                  <a href="#inquiry" onClick={openContactForm}>강의 문의하기</a>
                </div>
              </section>

              <section className="detail-panel detail-sources">
                <p className="eyebrow">Sources</p>
                <h2>출처</h2>
                <ul>
                  <li><a href="https://learn.microsoft.com/ko-kr/microsoft-365/copilot/microsoft-365-copilot-overview" target="_blank" rel="noreferrer">Microsoft 365 Copilot 개요</a></li>
                  <li><a href="https://learn.microsoft.com/copilot/overview" target="_blank" rel="noreferrer">Copilot Chat 개요</a></li>
                  <li><a href="https://www.microsoft.com/en-us/microsoft-365/blog/2026/05/28/introducing-a-new-design-for-microsoft-365-copilot/" target="_blank" rel="noreferrer">Microsoft 365 Copilot 새 디자인 발표</a></li>
                  <li><a href="https://canrobot.co.kr/courses/m365-copilot/" target="_blank" rel="noreferrer">CanRobot 원본 과정 페이지</a></li>
                </ul>
              </section>
            </div>
          </section>
        ) : (
          <section id="labs" className="section lab-section lab-page-section">
            <SectionHead eyebrow="Hands-on Lab" title="핸즈온랩" text="기업 · 기관 · 개인 대상 Microsoft AI 교육 과정 — 모든 과정은 실습 중심, 기업 맞춤 커스터마이징이 가능합니다." centered />
            <div className="lab-placeholder" aria-label="핸즈온랩 준비 영역">
              {labMaterials.map((lab) => (
                <article className={lab.link ? 'lab-card-featured' : undefined} key={lab.title}>
                  {lab.link ? <div className="lab-icon" aria-hidden="true">✦</div> : null}
                  <span>{lab.status}</span>
                  <h3>{lab.title}</h3>
                  <p>{lab.text}</p>
                  {lab.tags ? <div className="lab-tags">{lab.tags.map((tag) => <em key={tag}>{tag}</em>)}</div> : null}
                  {lab.link ? <a className="lab-link" href={lab.link} onClick={openLabDetail}>강의 보기 →</a> : null}
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <a className="footer-brand" href="#top" onClick={openHomeSection('#top')} aria-label="HelloPT 홈으로 이동">
            <img src={asset('brand/hellopt-logo-original.png')} alt="HelloPT" />
          </a>
          <a className="footer-site" href="https://www.hellopt.co.kr" target="_blank" rel="noreferrer">www.hellopt.co.kr</a>
          <p>Copyright © 2026 HelloPT All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}

function CourseDocument({ page, courseSlug, onNavigate, onBack, onHub }) {
  const [expanded, setExpanded] = useState(true)
  const appCards = [
    ['Word', '초안·재작성', 'm04-1'], ['Excel', 'Edit with Copilot', 'm04-2'], ['PowerPoint', '덱 생성', 'm04-3'],
    ['Outlook', '요약·초안', 'm04-4'], ['Teams', '회의·채널', 'm04-5'], ['기타', 'OneNote·Loop·Forms', 'm04-6'],
  ]

  return (
    <section className="course-doc-section">
      <div className="course-doc-shell">
        <aside className="course-sidebar" aria-label="Microsoft 365 Copilot 과정 목차">
          <div className="course-sidebar-head">
            <strong>목차</strong>
            <button type="button" onClick={() => setExpanded((value) => !value)}>{expanded ? '모두 접기' : '모두 펼치기'}</button>
          </div>
          <a className="course-home-link" href="#m365-copilot" onClick={onHub}>✦ Microsoft 365 Copilot</a>
          {expanded && courseModuleGroups.map((group) => (
            <div className="course-nav-group" key={group.code}>
              <a className={`course-nav-link course-nav-parent${courseSlug === group.slug ? ' active' : ''}`} href={`#m365-copilot/${group.slug}`} onClick={(event) => onNavigate(event, group.slug)}>
                <span>{group.code}</span><strong>{group.title}</strong><i aria-hidden="true">›</i>
              </a>
              {group.children?.map(([code, title, slug]) => (
                <a className={`course-nav-link course-nav-child${courseSlug === slug ? ' active' : ''}`} href={`#m365-copilot/${slug}`} onClick={(event) => onNavigate(event, slug)} key={slug}>
                  <span>{code}</span><strong>{title}</strong>
                </a>
              ))}
            </div>
          ))}
          <a className="course-back-link" href="#labs" onClick={onBack}>← 핸즈온랩 목록</a>
        </aside>

        <article className="course-doc-main">
          <div className="course-doc-heading">
            <p className="eyebrow">{page.code} · MICROSOFT 365 COPILOT</p>
            <h1>{page.title}</h1>
            <p className="course-summary">{page.summary}</p>
          </div>

          {page.code === 'M4' && (
            <section className="course-feature-panel">
              <p className="eyebrow">M365 COPILOT · M4</p>
              <h2>앱 속 Copilot 지도</h2>
              <div className="app-map-grid">
                {appCards.map(([name, text, slug]) => <a href={`#m365-copilot/${slug}`} onClick={(event) => onNavigate(event, slug)} key={slug}><strong>{name}</strong><span>{text}</span></a>)}
              </div>
            </section>
          )}

          <div className="course-doc-body">
            {page.sections.map((section, index) => <CourseSection section={section} key={`${section.title}-${index}`} onNavigate={onNavigate} />)}
          </div>

          <section className="course-takeaways">
            <p className="eyebrow">Key Takeaways</p>
            <h2>핵심 정리</h2>
            <ol>{page.takeaways.map((item) => <li key={item}>{item}</li>)}</ol>
          </section>

          <nav className="course-prev-next" aria-label="모듈 이동">
            {page.previous ? <a href={`#m365-copilot/${page.previous}`} onClick={(event) => onNavigate(event, page.previous)}>← 이전 모듈</a> : <span />}
            {page.next ? <a href={`#m365-copilot/${page.next}`} onClick={(event) => onNavigate(event, page.next)}>다음 모듈 →</a> : <span />}
          </nav>

          {page.sources?.length > 0 && <section className="course-sources"><p className="eyebrow">Sources</p><h2>출처</h2><ul>{page.sources.map((source) => <li key={source}>{source}</li>)}</ul></section>}
        </article>
      </div>
    </section>
  )
}

function CourseSection({ section }) {
  return (
    <section className={`course-content-section course-section-${section.type}`}>
      <h2>{section.title}</h2>
      {section.type === 'bullets' && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
      {section.type === 'steps' && <ol>{section.items.map((item) => <li key={item}>{item}</li>)}</ol>}
      {section.type === 'table' && <div className="course-table-scroll"><table className="course-content-table"><thead><tr>{section.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{section.rows.map((row, index) => <tr key={`${section.title}-${index}`}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={`${cell}-${cellIndex}`}>{cell}</th> : <td key={`${cell}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody></table></div>}
    </section>
  )
}

function SectionHead({ eyebrow, title, text, centered = false }) {
  return <div className={`section-head${centered ? ' centered' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p>{text}</p>}</div>
}

function AccordionPanel({ id, title, open, onToggle, children }) {
  return (
    <section className="accordion-panel">
      <button type="button" className="accordion-trigger" aria-expanded={open} aria-controls={`${id}-content`} onClick={() => onToggle(id)}>
        <span>{title}</span><strong className="accordion-icon" aria-label={open ? '접기' : '펼치기'}>{open ? '▴' : '▾'}</strong>
      </button>
      {open && <div className="accordion-content" id={`${id}-content`}>{children}</div>}
    </section>
  )
}

export default App
