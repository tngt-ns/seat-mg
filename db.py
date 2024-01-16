from app import app, db, Seat

num_seats = 4

# Flaskアプリケーションコンテキストを手動で確立
with app.app_context():
    # データベースのテーブルを削除
    db.drop_all()
    # データベースのテーブルを再作成
    db.create_all()
    

area_positions = ["76, 84, 40", "220, 84, 40", "76, 227, 40", "220, 227, 40"]
button_positions = ["top: 44px; left: 36px; width: 80px; height: 80px;",
                    "top: 44px; left: 180px; width: 80px; height: 80px;",
                    "top: 187px; left: 36px; width: 80px; height: 80px;",
                    "top: 187px; left: 180px; width: 80px; height: 80px;"]

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