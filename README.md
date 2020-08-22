## Player

- id: number [PK]
- first_name: varchar(20)
- last_name: varchar(20)
- gender: char(1)
- username: varchar2(50)
- password: varchar2(50)

## Match

- id: number [PK]
- player1: number [FK]
- player2: number [FK]
- date_played: date
- win: number
- score: char(3)
- total_points: char(6)
- set_score: []
