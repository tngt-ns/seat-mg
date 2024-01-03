from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
    isDisable = request.args.get("isDisable", 1)
    return render_template("index.html", isDisable=isDisable)

@app.route("/admin")
def admin():
    return render_template("admin.html")

@app.route("/visitor")
def visitor():
    return render_template("visitor.html")

if __name__ == "__main__":
    app.run()  