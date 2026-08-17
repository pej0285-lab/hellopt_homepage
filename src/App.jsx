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

const profileSectionIds = ['bio', 'fields', 'history', 'certifications', 'books']

function App() {
  const [openSections, setOpenSections] = useState(profileSectionIds)
  const [openHistoryYears, setOpenHistoryYears] = useState(['2026'])
  const [activeView, setActiveView] = useState(() => {
    if (window.location.hash === '#m365-copilot' || window.location.hash === '#labs/m365-copilot') return 'labDetail'
    if (window.location.hash === '#labs') return 'labs'
    if (window.location.hash === '#inquiry') return 'contact'
    return 'home'
  })
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
    setActiveView('labDetail')
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
