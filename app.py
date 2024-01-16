from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

# create the app
app = Flask(__name__)
# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///seat.db"
# initialize the app with the extension
db.init_app(app)

class Seat(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    status: Mapped[str] = mapped_column(String, nullable=False, default="available")


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/update_seat", methods=["POST"])
def update_seat():
    data = request.get_json()
    seat_id = data.get('seat_id')

    seat = Seat.query.get(seat_id)

    if seat:
        if seat.status == "available":
            seat.status = "occupied"
        else:
            seat.status = "available"
        db.session.commit()

        return jsonify({'message': 'Seat status updated successfully'})
    else:
        return jsonify({'error': 'Invalid seat ID'}), 400
    
    
@app.route("/admin", methods=["GET", "POST"])
def admin():
    seats = Seat.query.all()
    if request.method == "GET":
        return render_template("admin.html", seats=seats)    

@app.route("/get_seats", methods=["GET"])
def get_seats():
    seats = Seat.query.all()
    seat_data = [{'id': seat.id, 'status': seat.status} for seat in seats]
    return jsonify(seat_data)

@app.route("/visitor", methods=["GET", "POST"])
def visitor():
    if request.method == "GET":
        seats = Seat.query.all()
        return render_template("visitor.html", seats=seats)

if __name__ == "__main__":
    app.run()