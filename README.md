## Player

- id: number [PK]
- first_name: string
- last_name: string
- gender: string
- username: string
- password: string

## Match

- id: number [PK]
- player1: number [FK]
- player2: number [FK]
- date_played: date
- win: number
- score: string
- total_points: string
- set_score: string[]
