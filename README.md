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

## To do

### Frontend

[] create 'Add match' page
[] check if response status is 401 -> player has to sign in again; otherwise player is already signed in

### Backend

[] remove 'token' property from player
[] create seed with all players
