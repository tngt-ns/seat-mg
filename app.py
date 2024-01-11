from flask import Flask, render_template, request
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


# class Seat(db.Model):
#     id: db.Column(db.Integer, primary_key=True)
#     isAvailable: db.Column(db.Boolean, default=True)

@app.route("/")
def index():
    return render_template("index.html")
    
    
@app.route("/admin", methods=["GET", "POST"])
def admin():
    if request.method == "GET":
        seats = Seat.query.all()
        return render_template("admin.html", seats=seats)

@app.route("/visitor", methods=["GET", "POST"])
def visitor():
    if request.method == "GET":
        seats = Seat.query.all()
        return render_template("visitor.html", seats=seats)

if __name__ == "__main__":
    app.run()