from app import app, db, Seat

num_seats = 4

# Flaskアプリケーションコンテキストを手動で確立
with app.app_context():
    # データベースのテーブルを削除
    db.drop_all()
    # データベースのテーブルを再作成
    db.create_all()

# テーブルが作成された後にデータを挿入
with app.app_context():
    for i in range(num_seats):
        seat = Seat(id=i, status="available")
        db.session.add(seat)
        db.session.commit()