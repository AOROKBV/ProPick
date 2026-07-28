# 문제 조회 페이지네이션 
## URL
`GET` https://school.programmers.co.kr/api/v2/school/challenges/?perPage=&levels[]=&languages[]=&order=&page=
## 쿼리 파라미터
| 이름 | 타입 | 설명 |
| --- | --- | --- |
| perPage | integer | 페이지당 문제 수 |
| levels[] | integer | 문제 난이도. 0~5 |
| languages[] | string | 문제 언어. c, cpp, java, javascript, python3 |
| order | string | 정렬 기준. recent, acceptance_desc, acceptance_asc |
| page | integer | 페이지 번호. 1부터 시작 |
## 응답 구조
```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer"
    },
    "perPage": {
      "type": "integer"
    },
    "totalPages": {
      "type": "integer"
    },
    "totalEntries": {
      "type": "integer"
    },
    "languages": {
      "type": "array",
      "items": [
        {
          "type": "string"
        },
        {
          "type": "string"
        },
        {
          "type": "string"
        },
        {
          "type": "string"
        },
        {
          "type": "string"
        },
        {
          "type": "string"
        },
        {
          "type": "string"
        },
        {
          "type": "string"
        },
        {
          "type": "string"
        },
        {
          "type": "string"
        },
        {
          "type": "string"
        },
        {
          "type": "string"
        },
        {
          "type": "string"
        }
      ]
    },
    "result": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer"
            },
            "title": {
              "type": "string"
            },
            "partTitle": {
              "type": "string"
            },
            "level": {
              "type": "integer"
            },
            "finishedCount": {
              "type": "integer"
            },
            "acceptanceRate": {
              "type": "integer"
            },
            "status": {
              "type": "string"
            },
            "openedAt": {
              "type": "string"
            },
            "contentUpdatedAt": {
              "type": "null"
            },
            "bookmarked": {
              "type": "boolean"
            },
            "aiCommentable": {
              "type": "boolean"
            }
          }
        }
      ]
    }
  }
}
```