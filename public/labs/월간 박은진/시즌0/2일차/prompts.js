export const groups = [
  {
    "id": "word",
    "name": "Word Copilot",
    "short": "W",
    "description": "초안 만들기 · 재작성·편집 · 요약 · 문서 질문",
    "sections": [
      {
        "name": "1. 초안 만들기 (Draft)",
        "items": [
          {
            "number": "1",
            "title": "편집 허용 / 채팅만 모드 비교",
            "source": "",
            "prompts": [
              {
                "label": "실습 1",
                "text": "기업에서 ChatGPT와 Microsoft 365 Copilot을 활용하는 경우를 비교해줘."
              }
            ]
          },
          {
            "number": "2",
            "title": "신제품 출시 내부 공지문 작성",
            "source": "",
            "prompts": [
              {
                "label": "실습 2",
                "text": "전 직원 대상 내부 공지문 초안을 작성해줘.\n1. 포함 내용\n- 제품 소개\n- 출시 일정\n- 주요 특징\n- 고객 응대 시 유의사항\n2. 분량 : A4 1페이지\n3. 톤앤매너 : 공식적이고 전문적인 어조"
              }
            ]
          },
          {
            "number": "3",
            "title": "회의록 → 실행 계획서",
            "source": "입력자료 : 회의록.docx",
            "prompts": [
              {
                "label": "실습 3",
                "text": "첨부된 신제품 출시 TF 회의록을 기반으로 프로젝트 실행 계획서를 작성해줘.\n포함 내용\n- 주요 결정사항\n- 담당자\n- 일정\n- 주요 리스크\n- 후속 Action Item"
              }
            ]
          },
          {
            "number": "4",
            "title": "회의록 → 경영진 보고서",
            "source": "입력자료 : 회의록.docx",
            "prompts": [
              {
                "label": "실습 4",
                "text": "첨부된 회의록을 기반으로 한국 지사장 보고용 1페이지 요약 보고서를 작성해줘.\n포함 내용\n- 핵심 진행 현황\n- 주요 리스크\n- 의사결정 필요사항\n- 향후 일정"
              }
            ]
          }
        ]
      },
      {
        "name": "2. 재작성·편집 (Rewrite)",
        "items": [
          {
            "number": "5",
            "title": "재작성, 편집하기",
            "source": "작업자료 : 앞 단계에서 생성한 경영진 보고서",
            "prompts": [
              {
                "label": "실습 예제 5-1",
                "text": "문서의 본문 표 4개를 모두 눈금 표 4 - 강조색 1 스타일로 변경하고 줄 무늬 행 없이, 머리글 글자가 잘 보이도록 정리해줘"
              },
              {
                "label": "실습 예제 5-2",
                "text": "이 표를 문장 설명으로 바꿔줘."
              },
              {
                "label": "실습 예제 5-3",
                "text": "선택한 텍스트를 구조화하고 가독성을 높여줘."
              }
            ]
          },
          {
            "number": "6",
            "title": "임원 보고용으로 더 간결하게",
            "source": "작업자료 : 앞 단계에서 생성한 실행계획서",
            "prompts": [
              {
                "label": "실습 6",
                "text": "이 실행계획서를 한국 지사장이 3분 안에 읽을 수 있도록\n- 핵심 내용만 남기고\n- 중복 내용을 제거하고\n- 한 장 분량으로 요약해줘.\n톤앤매너는 임원 보고용으로 작성해줘."
              }
            ]
          },
          {
            "number": "7",
            "title": "실행계획서 → Action Item 표",
            "source": "작업자료 : 앞 단계에서 생성한 실행계획서",
            "prompts": [
              {
                "label": "실습 7",
                "text": "이 문서에서 실행 과제만 추출하여\n- 담당부서\n- 담당자\n- 마감일\n- 우선순위\n형태의 표로 정리해줘."
              }
            ]
          }
        ]
      },
      {
        "name": "3. 요약 (Summarize)",
        "items": [
          {
            "number": "8",
            "title": "핵심 3가지로 요약 ",
            "source": "작업파일 : 계약서.docx",
            "prompts": [
              {
                "label": "실습 8",
                "text": "이 계약서를 핵심 3가지로 요약해줘."
              }
            ]
          },
          {
            "number": "9",
            "title": "의무사항과 기한만 추출",
            "source": "작업파일 : 계약서.docx",
            "prompts": [
              {
                "label": "실습 9",
                "text": "이 계약서에서\n1. 대행사가 수행해야 하는 의무\n2. 관련 기한\n3. 제출해야 하는 산출물\n만 표로 정리해줘."
              }
            ]
          }
        ]
      },
      {
        "name": "4. 문서에 대해 질문 (Chat)",
        "items": [
          {
            "number": "10",
            "title": "문서에 대한 질문 : 리스크 찾기, 위험요소, 보완점 확인",
            "source": "입력자료 : 계약서.docx",
            "prompts": [
              {
                "label": "리스크와 관리 포인트",
                "text": "Dyson Korea 담당자 관점에서 주의해야 할 리스크와 관리 포인트를 정리해줘."
              },
              {
                "label": "위험 요소와 보완점",
                "text": "이 계약서의 주요 위험 요소를 알려주고, 계약서의 보완할 점을 요약해줘."
              }
            ]
          },
          {
            "number": "11",
            "title": "문서에 대한 질문 : 결론이 서론의 목표와 일치하나?",
            "source": "입력자료 : 회의록.docx",
            "prompts": [
              {
                "label": "목표 확인",
                "text": "결론이 서론의 목표와 일치하나?"
              },
              {
                "label": "다음 회의 질문",
                "text": "다음 회의에서 확인해야 할 질문 목록을 생성해줘."
              },
              {
                "label": "질문 추천",
                "text": "이 문서에서 질문 추천해줘."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "powerpoint",
    "name": "PowerPoint Copilot",
    "short": "P",
    "description": "프레젠테이션 생성 · 슬라이드 편집 · 요약·Q&A",
    "source": "파일 : Dyson AirWrap iQ 한국 출시 프로젝트 실행 계획서.docx",
    "sections": [
      {
        "name": "1. 프레젠테이션 생성 (Draft)",
        "items": [
          {
            "number": "1",
            "title": "프롬프트로 슬라이드 만들기",
            "source": "",
            "prompts": [
              {
                "label": "실습 1",
                "text": "2030 세대가 즐기는 인기 취미를 주제로, 밝고 트렌디한 분위기의 발표자료를 7장으로 만들어줘. 운동, 여행, 자기계발, 콘텐츠 제작 등 다양한 취미를 사진과 함께 소개해줘."
              }
            ]
          },
          {
            "number": "2",
            "title": "근거자료로 슬라이드 만들기",
            "source": "",
            "prompts": [
              {
                "label": "실습 2",
                "text": "이 파일로 신제품 소개 슬라이드를 만들려고 해. 프롬프트 추천해줘."
              }
            ]
          },
          {
            "number": "3",
            "title": "생성된 추천 프롬프트",
            "source": "",
            "prompts": [
              {
                "label": "실습 3",
                "text": "첨부한 \"프로젝트 실행 계획서.docx\"를 바탕으로 Dyson AirWrap iQ 한국 출시 신제품 소개 슬라이드를 8~10장으로 만들어줘.\n대상: 내부 임원 및 TF 참여 팀(영업·마케팅·고객지원·공급망)\n흐름: 표지 → 출시 개요(1월 첫째 주, 초도 5,000대, 4개 팀) → 팀별 역할 → 마케팅 계획(SNS 티저, 인플루언서 10명, 백화점 체험 이벤트) → 전체 일정 타임라인 → 공급·재고 현황(초도 5,000대 vs 예상 수요 7,000~8,000대, 차트) → 주요 리스크와 대응 → 후속 Action Item → 확인 필요 사항\n문서에 없는 수치나 제품 스펙은 만들지 말고, 문서 내용만 사용해줘.\n디자인: 세련되고 미니멀한 프리미엄 가전 느낌, 짙은 네이비와 밝은 배경에 포인트 컬러 1개, 한국어 맑은 고딕.\n일정은 타임라인, 리스크는 표나 카드, 수요 대비 물량은 차트로 시각화해줘."
              }
            ]
          }
        ]
      },
      {
        "name": "2. 슬라이드 편집 (Edit)",
        "items": [
          {
            "number": "4",
            "title": "슬라이드 편집 : 특정 주제 관련 슬라이드 추가",
            "source": "",
            "prompts": [
              {
                "label": "실습 4",
                "text": "이 슬라이드 다음에 \"출시 일정과 실행 체계\" 주제로 슬라이드 한 장 추가해줘."
              }
            ]
          },
          {
            "number": "5",
            "title": "슬라이드 편집 : 이미지 생성 및 삽입",
            "source": "",
            "prompts": [
              {
                "label": "실습 5",
                "text": "표지에 적합한 이미지를 삽입해줘."
              }
            ]
          },
          {
            "number": "6",
            "title": "슬라이드 편집 : 스킬 Skills",
            "source": "",
            "prompts": [
              {
                "label": "실습 6",
                "text": "이 슬라이드 시각화 (visualize-this-slide) 이 파일의 템플릿, 테마 및 톤앤매너에 맞게 시각화해줘."
              }
            ]
          },
          {
            "number": "7",
            "title": "슬라이드 편집 : 스킬 Skills - 대화형 슬라이드 만들기 (interactive-slide)",
            "source": "",
            "prompts": [
              {
                "label": "실습 7",
                "text": "Create an interactive, full-bleed slide: a draggable before/after reveal of a butterfly. Imagery (AI-generated photos, not vector art): a photorealistic butterfly, wings open, straight-on, cut out with transparency; and a heavily blurred green foliage background, no subject. Composition: edge to edge, no margins. One vertical divider with a small circular drag handle; dragging sweeps between halves. Caption at the bottom of the slide: \"◀ Drag the divider ▶\". Use the same darkened greenery (~40% brightness) behind both halves so only the butterfly's rendering differs. Left = the photographic butterfly (Analog). Right = the same butterfly, same size and position, re-rendered live as white bold ASCII art with a dark outline and soft glow (Digital). Animation: wings flap continuously with eased motion plus a gentle bob; both halves animate from the same values so they align across the divider; wings shouldn't collapse too far; the ASCII regenerates each frame so characters reflow. Sizing: identical scale on both sides; compensate for monospace characters being taller than wide so the ASCII isn't squashed. Text: heading \"The Transformational Journey\" with \"Transformational\" emphasized; labels Analog (left) and Digital (right); nothing else. Responsiveness: scale to any slide size without clipping or scrollbars. Keep embedded images compressed to WebP and the total payload under 300 KB. Make the static preview a real render of the finished visual, not a blank placeholder."
              }
            ]
          },
          {
            "number": "7-1",
            "title": "슬라이드 편집 : 스킬 Skills - 대화형 슬라이드 만들기 (interactive-slide)",
            "source": "",
            "prompts": [
              {
                "label": "실습 7-1",
                "text": "Inside a Salmon\nSelect a numbered hotspot to reveal its explanation. Select × to close it. Opening another hotspot hides the previous explanation.\n1. Brain\nProcesses information from the senses.\nCoordinates movement.\n2. Gills\nTake oxygen from the water.\nRelease carbon dioxide.\n3. Spine\nSupports the body.\nProtects the spinal cord.\n4. Swim bladder\nHelps control buoyancy.\nHelps the salmon maintain its depth.\n5. Liver\nProcesses nutrients.\nProduces bile to help digest fats.\n6. Heart\nPumps blood through the gills.\nKeeps blood moving around the body.\n7. Intestines\nContinue digestion.\nAbsorb nutrients from food.\n8. Stomach\nUses acid to break down food.\nUses digestive enzymes to help digest food.\nHotspot names and locations supplied by the educator. Kidney and muscle structure have no named hotspots on this slide. AI-generated anatomy is illustrative, not a verified anatomical reference.\nSources:\nU.S. Fish and Wildlife Service, Salmon Anatomy Cheat Sheet: https://www.fws.gov/sites/default/files/documents/03_Salmon%20Anatomy%20Cheat%20Sheet.pdf\nSouth Puget Sound Salmon Enhancement Group, Salmon Anatomy: https://spsseg.org/salmon-anatomy/\nExplanatory wording follows the draft supplied in the conversation."
              }
            ]
          }
        ]
      },
      {
        "name": "3. 슬라이드 요약·Q&A (Chat)",
        "items": [
          {
            "number": "8",
            "title": "슬라이드 요약",
            "source": "",
            "prompts": [
              {
                "label": "실습 8",
                "text": "이 10장 덱을 핵심 5가지로 요약해줘."
              }
            ]
          },
          {
            "number": "9",
            "title": "슬라이드 요약",
            "source": "",
            "prompts": [
              {
                "label": "실습 9",
                "text": "재무 관련 슬라이드만 찾아줘."
              }
            ]
          },
          {
            "number": "10",
            "title": "슬라이드 요약",
            "source": "",
            "prompts": [
              {
                "label": "실습 10",
                "text": "발표자 노트에 발표 스크립트 넣어줘."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "excel",
    "name": "Excel Copilot",
    "short": "E",
    "description": "수식 생성 · 데이터 정리 · 피벗테이블 · 대시보드",
    "sections": [
      {
        "name": "수식 생성 및 데이터 정리",
        "items": [
          {
            "number": "1",
            "title": "수식 생성",
            "source": "실습 파일 : 조건부함수.xlsx – [집계]시트",
            "prompts": [
              {
                "label": "실습1-1",
                "text": "지점별 총 매출합계와 매출건수를 SUMIFS, COUNTIFS로 구해줘. 사용한 수식도 함께 설명해줘."
              },
              {
                "label": "실습1-2",
                "text": "할인율 조건에 맞는 제품의 건수와 수량을 구해줘."
              },
              {
                "label": "실습1-3",
                "text": "제품명을 [제품목록]표에서 찾아보고 같은 제품명이 없으면 [신제품 판정]에 '신제품'이라고 표기해줘."
              },
              {
                "label": "실습1-4",
                "text": "신제품 현황의 건수와 금액을 계산해줘."
              }
            ]
          },
          {
            "number": "2",
            "title": "수식 생성 및 데이터 정리",
            "source": "실습 파일 : 조건부함수.xlsx – [다중집계]시트",
            "prompts": [
              {
                "label": "실습2-1",
                "text": "k열에 '지역'의 목록 리스트로 표현하고, 선택한 셀의 '지역'값을 목록에서 선택할 수 있게 만들어줘. 선택한 지역별 총합계와 총건수를 구해줘."
              },
              {
                "label": "실습2-2",
                "text": "품목별 수량합계와 판매건수도 집계해줘."
              }
            ]
          },
          {
            "number": "3",
            "title": "수식 생성 및 데이터 정리",
            "source": "실습 파일 : 조건부함수.xlsx – [실습1]시트",
            "prompts": [
              {
                "label": "실습3-1",
                "text": "센터는 중복을 제거하고 고유한 값만 오름차순으로 G5셀에 표시하고 센터별 수량 합계를 집계해줘."
              }
            ]
          },
          {
            "number": "4",
            "title": "수식 생성 및 데이터 정리",
            "source": "실습 파일 : 조건부함수.xlsx – [실습2]시트",
            "prompts": [
              {
                "label": "실습4-1",
                "text": "D열의 판매일자 데이터를 날짜 서식에 맞게 변경해줘."
              },
              {
                "label": "실습4-2",
                "text": "D열의 판매일자를 이용하여 E열의 월을 텍스트로 입력해줘. (예:1월, 2월, ...,12월로 표시)"
              },
              {
                "label": "실습4-3",
                "text": "월 데이터는 목록에서 선택할 수 있도록 만들어줘. 월 데이터의 목록은 S열에 표시한 후 화면에 보이지 않도록 표시형식을 이용하여 숨겨줘."
              },
              {
                "label": "실습4-4",
                "text": "월과 분류에 따른 다중 조건으로 집계할거야. K열, L열에 판매건수, 총판매금액을 계산해줘."
              },
              {
                "label": "실습4-5",
                "text": "집계한 판매건수와 총판매금액 데이터는 쉼표 스타일을 사용하되 소수점 없이 정수로 표현해줘."
              }
            ]
          }
        ]
      },
      {
        "name": "데이터 분석 및 시각화",
        "items": [
          {
            "number": "5",
            "title": "데이터 분석 : 피벗테이블",
            "source": "실습 파일 : 엑셀BI.xlsx – [피벗]시트",
            "prompts": [
              {
                "label": "실습 5",
                "text": "판매 시트를 바탕으로 피벗 시트에 있는 각 제목별로 요약 보고서를 만들어줘. 보고서가 겹치지 않도록 열 너비를 조정하고 보고서 사이에 1열씩 공백으로 띄워줘."
              }
            ]
          },
          {
            "number": "6",
            "title": "데이터 분석 및 시각화 : 대시보드",
            "source": "실습 파일 : 엑셀BI.xlsx – [대시보드]시트",
            "prompts": [
              {
                "label": "실습 6",
                "text": "작성된 피벗 시트의 자료를 참고해서 판매 시트를 바탕으로 '대시보드'시트에 총매출금액·총매출이익·판매건수·평균할인율 KPI 카드와 연도별 매출 추이, 거래처 TOP10 차트가 있는 대시보드를 만들어줘."
              }
            ]
          }
        ]
      }
    ]
  }
];
