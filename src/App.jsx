import { BookOpenCheck, ClipboardList, MessageSquareText, Send } from 'lucide-react'
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
  ['2025', '서울시립대학교 국제도시과학대학원 국제협력사업', '오피스 활용 과정'],
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
  ['MCT', 'Microsoft Certified Trainer 2026', 'brand/mct-badge.png', 'https://learn.microsoft.com/credentials/'],
  ['AB-730', 'AI 비즈니스 전문가', 'brand/ab-731.png', 'https://learn.microsoft.com/ko-kr/credentials/certifications/ai-business-professional/?WT.mc_id=certposter_poster-wwl&practice-assessment-type=certification'],
  ['AB-731', '인공지능 혁신 리더', 'brand/ab-730.png', 'https://learn.microsoft.com/ko-kr/credentials/certifications/ai-transformation-leader/?WT.mc_id=certposter_poster-wwl&practice-assessment-type=certification'],
  ['AI-102', 'Azure AI 엔지니어 준회원', 'brand/ai-102.png', 'https://learn.microsoft.com/ko-kr/credentials/certifications/azure-ai-apps-and-agents-developer-associate/?practice-assessment-type=certification'],
  ['AB-100', '에이전트 AI 비즈니스 솔루션 설계자', 'brand/ab-100.png', 'https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect/#certification-exams'],
  ['GH-300', 'GitHub Copilot', 'brand/gh-300.png', 'https://learn.microsoft.com/ko-kr/credentials/certifications/github-copilot/?WT.mc_id=certposter_poster_wwl&practice-assessment-type=certification'],
]

const books = [
  ['직장인을 위한 AI 실무 엑셀&파워포인트&워드', '길벗', '2025.09', '공저'],
  ['무작정 따라하기 엑셀 파워포인트 워드+한글', '길벗', '2024.07', '공저'],
  ['직장인을 위한 실무 엑셀&파워포인트&워드+한글', '길벗', '2023.04', '공저'],
  ['왕초보를 위한 첫 파워포인트 무작정 따라하기', '길벗', '2022.09', '공저'],
  ['무작정 따라하기 윈도우 10+엑셀&파워포인트&워드+한글', '길벗', '2022.04', '공저'],
  ['무작정 따라하기 엑셀&파워포인트', '길벗', '2022.03', '공저'],
  ['무작정 따라하기 엑셀&파워포인트&워드', '길벗', '2022.03', '공저'],
  ['무작정 따라하기 엑셀&파워포인트&워드+한글', '길벗', '2022.03', '공저'],
  ['엑셀&파워포인트&워드+한글 무작정 따라하기', '길벗', '2021.07', '공저'],
  ['버려지는 디자인 통과되는 디자인 : 프레젠테이션 디자인', '길벗', '2020.12', '공저'],
  ['엑셀 & 파워포인트 & 워드 2019+한글 무작정 따라하기', '길벗', '2019.04', '공저'],
  ['엑셀 &파워포인트 2019 무작정 따라하기', '길벗', '2019.04', '공저'],
  ['엑셀 & 파워포인트 & 워드 2019 무작정 따라하기', '길벗', '2019.04', '공저'],
  ['윈도우 10+엑셀 & 파워포인트 & 워드 2019+한글 무작정 따라하기', '길벗', '2019.03', '공저'],
  ['윈도우 10+엑셀 &파워포인트 & 워드 2016+한글 2014 무작정 따라하기', '길벗', '2016.05', '공저'],
  ['엑셀 &파워포인트 &워드 2016+한글 2014 무작정 따라하기', '길벗', '2016.02', '공저'],
  ['엑셀 & 파워포인트 2016+한글 2014 무작정 따라하기', '길벗', '2016.02', '공저'],
  ['엑셀 & 파워포인트 2016 무작정 따라하기', '길벗', '2016.02', '공저'],
  ['엑셀 &파워포인트 &워드 2016 무작정 따라하기', '길벗', '2016.01', '공저'],
  ['엑셀 &파워포인트 &워드 2013+한글 2014 무작정 따라하기', '길벗', '2015.04', '공저'],
  ['한글 2014 &워드 2013 무작정 따라하기', '길벗', '2015.01', '공저'],
  ['엑셀 &파워포인트 2013 & 한글 2014 무작정 따라하기', '길벗', '2014.07', '공저'],
  ['엑셀 & 파워포인트 2013 & 한글 2010 무작정 따라하기', '길벗', '2014.03', '공저'],
  ['엑셀 &파워포인트 & 워드 2013 무작정 따라하기', '길벗', '2013.10', '공저'],
  ['엑셀 &파워포인트 2013 무작정 따라하기', '길벗', '2013.09', '공저'],
  ['엑셀 &파워포인트 &워드 2010 무작정 따라하기', '길벗', '2011.08', '공저'],
  ['엑셀 & 파워포인트 2010 무작정 따라하기', '길벗', '2011.03', '공저'],
  ['필수기능 엑셀 &파워포인트 &워드 2007 무작정 따라하기', '길벗', '2009.10', '공저'],
  ['엑셀 & 파워포인트 2007 무작정 따라하기', '길벗', '2008.08', '공저'],
  ['파워포인트 2007 필수 디자인 100', '길벗', '2008', '저서'],
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
    status: 'Ready',
    title: 'New Copilot Studio',
    text: 'CLI 에이전트 개요를 바탕으로 하네스 설계, 에이전틱 루프, 스킬·도구·메모리의 핵심 흐름을 학습합니다.',
    link: 'https://chichoi1991.github.io/Agent_Blog/chapters/newcs0-overview/',
    tags: ['CLI 에이전트', '하네스 설계', 'Copilot Studio'],
  },
  { status: 'Coming Soon', title: '과정 02', text: '세부 실습자료와 안내는 추후 이 공간에 채워질 예정입니다.' },
  { status: 'Coming Soon', title: '과정 03', text: '세부 실습자료와 안내는 추후 이 공간에 채워질 예정입니다.' },
  { status: 'Coming Soon', title: '과정 04', text: '세부 실습자료와 안내는 추후 이 공간에 채워질 예정입니다.' },
  { status: 'Coming Soon', title: '과정 05', text: '세부 실습자료와 안내는 추후 이 공간에 채워질 예정입니다.' },
]

const profileSectionIds = ['bio', 'fields', 'history', 'certifications', 'books']

function App() {
  const [openSections, setOpenSections] = useState(profileSectionIds.filter((section) => section !== 'books'))
  const [activeView, setActiveView] = useState(() => window.location.hash === '#labs' ? 'labs' : 'home')

  const isOpen = (id) => openSections.includes(id)
  const toggleSection = (id) => {
    setOpenSections((current) =>
      current.includes(id)
        ? current.filter((section) => section !== id)
        : [...current, id],
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
  const sendInquiryMail = (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    const value = (key) => data[key]?.trim() || '미입력'
    const subject = `[HelloPT 강의 문의] ${value('회사·기관명')} / ${value('담당자 성함')}`
    const body = [
      '[기본 정보]',
      `담당자 성함: ${value('담당자 성함')}`,
      `회사·기관명: ${value('회사·기관명')}`,
      `이메일: ${value('이메일')}`,
      `연락처: ${value('연락처')}`,
      '',
      '[교육 조건]',
      `교육 주제: ${value('교육 주제')}`,
      `희망 일정: ${value('희망 일정')}`,
      `교육 대상·인원: ${value('교육 대상·인원')}`,
      `진행 방식: ${value('진행 방식')}`,
      '',
      '[상세 요청]',
      value('문의 내용'),
    ].join('\n')

    window.location.href = `mailto:jin1082@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="HelloPT 홈으로 이동" onClick={openHomeSection('#top')}>
          <img src={asset('brand/hellopt-logo-white.png')} alt="HelloPT" />
        </a>
        <nav aria-label="주요 메뉴">
          {navItems.map(([label, href, view]) => <a key={href} href={href} onClick={view === 'labs' ? openLabsView : openHomeSection(href)}>{label}</a>)}
        </nav>
        <div className="header-proof" aria-label="보유 인증">
          <img src={asset('brand/mct-badge-circle.png')} alt="MCT 뱃지" />
          <img src={asset('brand/tech-titan-badge.svg')} alt="Microsoft Tech Titan 뱃지" />
        </div>
      </header>

      <main id="top">
        {activeView === 'home' ? <>
          <section className="hero-section">
          <div className="hero-mark" aria-hidden="true">
            <div className="ai-card">
              <div className="ai-card-media">
                <img src={asset('brand/portrait.png')} alt="" />
                <span>Live Workshop</span>
              </div>
              <div className="ai-card-caption">
                <span>Microsoft AI Training</span>
                <strong>Copilot 실무 전환</strong>
                <em>MCT guided learning</em>
              </div>
            </div>
          </div>
          <div className="hero-copy">
            <p className="hero-kicker">Microsoft Certified Trainer · HelloPT</p>
            <h1>AI는 도구가 아닙니다. <span>새로운 업무 파트너입니다.</span></h1>
            <p>기업과 기관의 업무 현장에 맞춘 Microsoft AI, Copilot Studio, Excel 데이터 분석, 프레젠테이션 실습 교육을 진행합니다.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#contact" onClick={openHomeSection('#contact')}>강의 문의하기</a>
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
          <div className="profile-controls" aria-label="프로필 전체 제어">
            <button type="button" onClick={() => setOpenSections(profileSectionIds)}>전체 펼치기</button>
            <button type="button" onClick={() => setOpenSections([])}>전체 접기</button>
          </div>

          <div className="accordion-stack">
            <AccordionPanel id="bio" title="약력" open={isOpen('bio')} onToggle={toggleSection}>
              <div className="bio-layout">
                <img className="bio-photo" src={asset('brand/portrait.png')} alt="박은진 강사 얼굴 사진" />
                <div className="bio-copy">
                  <span>Hello. People & Technology.</span>
                  <h3>박은진 강사</h3>
                  <p>HelloPT 대표 · Microsoft Certified Trainer(2026)</p>
                  <div className="bio-contact" aria-label="강사 연락처">
                    <a href="tel:01047070285">010-4707-0285</a>
                    <a href="mailto:jin1082@naver.com">jin1082@naver.com</a>
                  </div>
                </div>
                <div className="bio-side">
                  <div className="bio-badges" aria-label="강사 인증 및 브랜드">
                    <img src={asset('brand/mct-badge.png')} alt="MCT 뱃지" />
                  </div>
                  <div className="profile-actions">
                    <button className="outline-button" type="button" onClick={saveProfilePdf}>프로필 PDF 저장</button>
                    <a className="outline-button" href="https://www.linkedin.com/in/%EC%9D%80%EC%A7%84-%EB%B0%95-950099316/" target="_blank" rel="noreferrer">LinkedIn</a>
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
                    <div className="history-year-marker">
                      <strong>{year}</strong>
                    </div>
                    <div className="history-course-list">
                      {items.map(([company, title]) => (
                        <article className="history-course-card" key={`${year}-${company}-${title}`}>
                          <strong>{company}</strong>
                          <p>{title}</p>
                        </article>
                      ))}
                    </div>
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
                    {books.map(([title, publisher, date, role]) => (
                      <article key={`${title}-${date}`}>
                        <strong>{title}</strong>
                        <span>({publisher} · {date} · {role})</span>
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
              <p className="eyebrow">Contact</p>
              <h2>강의 문의</h2>
              <p>교육 목적과 운영 조건을 알려주시면, 맞춤형 커리큘럼과 일정으로 빠르게 안내드리겠습니다.</p>
            </div>

            <form className="inquiry-form" onSubmit={sendInquiryMail}>
              <fieldset>
                <legend><span className="legend-icon"><ClipboardList size={18} aria-hidden="true" /></span><span>기본 정보</span></legend>
                <div className="form-grid">
                  <label><span className="label-text">담당자 성함 <b>*</b></span><input name="담당자 성함" type="text" placeholder="예: 홍길동" required /></label>
                  <label><span className="label-text">회사·기관명</span><input name="회사·기관명" type="text" placeholder="예: (주)데이터랩" /></label>
                  <label><span className="label-text">이메일 <b>*</b></span><input name="이메일" type="email" placeholder="예: name@company.com" required /></label>
                  <label><span className="label-text">연락처</span><input name="연락처" type="tel" placeholder="예: 010-1234-5678" /></label>
                </div>
              </fieldset>

              <fieldset>
                <legend><span className="legend-icon"><BookOpenCheck size={18} aria-hidden="true" /></span><span>교육 조건</span></legend>
                <div className="form-grid">
                  <label><span className="label-text">교육 주제 <b>*</b></span><input name="교육 주제" type="text" placeholder="예: 생성형 AI 업무 활용, Copilot Studio Agent 제작" required /></label>
                  <label><span className="label-text">희망 일정</span><input name="희망 일정" type="text" placeholder="예: 10월 중 1일, 1~3개월 이내, 협의 가능" /></label>
                  <label><span className="label-text">교육 대상·인원</span><input name="교육 대상·인원" type="text" placeholder="예: 신입사원 30명, 실무자 20명 내외" /></label>
                  <label><span className="label-text">진행 방식</span><input name="진행 방식" type="text" placeholder="예: 오프라인, 온라인, 온·오프라인 혼합" /></label>
                </div>
              </fieldset>

              <fieldset>
                <legend><span className="legend-icon"><MessageSquareText size={18} aria-hidden="true" /></span><span>상세 요청</span></legend>
                <label className="full-field"><span className="label-text">문의 내용 <b>*</b></span><textarea name="문의 내용" rows="5" placeholder="예: 생성형 AI 업무 활용 교육 / 신입사원 30명 / 10월 중 1일 / 오프라인" required /></label>
              </fieldset>

              <div className="submit-area">
                <button className="form-submit" type="submit">문의 보내기 <Send size={18} aria-hidden="true" /></button>
                <p className="form-note">영업일 기준 1일 이내 회신드립니다.</p>
              </div>
            </form>
          </div>
          </section>
        </> : (
          <section id="labs" className="section lab-section lab-page-section">
            <SectionHead eyebrow="Hands-on Lab" title="핸즈온랩" text="" />
            <div className="lab-placeholder" aria-label="핸즈온랩 준비 영역">
              {labMaterials.map((lab) => (
                <article className={lab.link ? 'lab-card-featured' : undefined} key={lab.title}>
                  <span>{lab.status}</span>
                  <h3>{lab.title}</h3>
                  <p>{lab.text}</p>
                  {lab.tags ? <div className="lab-tags">{lab.tags.map((tag) => <em key={tag}>{tag}</em>)}</div> : null}
                  {lab.link ? <a className="lab-link" href={lab.link} target="_blank" rel="noreferrer">원문 자료 보기</a> : null}
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="site-footer"><span>HelloPT. Hello. People & Technology.</span><span>박은진 MCT · jin1082@naver.com</span></footer>
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
