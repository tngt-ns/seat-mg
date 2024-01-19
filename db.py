from app import app, db, Seat

num_seats = 34

# Flaskアプリケーションコンテキストを手動で確立
with app.app_context():
    # データベースのテーブルを削除
    db.drop_all()
    # データベースのテーブルを再作成
    db.create_all()
    
    
positions = [[155, 102, 21], [155, 158, 21], [155, 251, 21], [155, 307, 21], [155, 394, 21], [155, 450, 21],
            [263, 121, 21], [340, 121, 21], [231, 312, 21], [231, 397, 21], [346, 312, 21], [347, 397, 21],
            [436, 92, 21], [437, 176, 21], [552, 92, 21], [553, 176, 21], [437, 320, 21], [516, 320, 21],
            [436, 441, 21], [516, 441, 21], [670, 113, 21], [750, 113, 21], [670, 236, 21], [750, 236, 21],
            [520, 549, 21], [602, 435, 21], [723, 428, 21], [723, 482, 21], [723, 557, 21], [723, 611, 21],
            [723, 685, 21], [723, 739, 21], [607, 685, 21], [606, 739, 21]]

area_positions = []
button_positions = []
for i in range(num_seats):
    pos = positions[i]
    area_positions.append(str(pos[0]) + ", " + str(pos[1]) + ", " + str(pos[2]))
    button_positions.append("top: " + str(pos[1] - pos[2]) + "px; left: " + str(pos[0] - pos[2]) + "px; width: " + str(pos[2] * 2) + "px; height: " + str(pos[2] * 2) + "px;")


# テーブルが作成された後にデータを挿入
with app.app_context():
    for i in range(num_seats):
        seat = Seat(id=i, status="available", area_pos=area_positions[i], button_pos=button_positions[i])
        db.session.add(seat)
        db.session.commit()
        
with app.app_context():
    db_all = Seat.query.all()
        
for seat in db_all:
    print(seat.id, seat.status, seat.area_pos, seat.button_pos)