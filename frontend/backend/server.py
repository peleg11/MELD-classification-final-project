from flask import Flask, request

app = Flask(__name__)


@app.route("/", methods=["POST", "GET"])
def test():
    if request.method == "POST":
        req = request.json
        print(req)
        return {"ok": True}
    else:
        return {"ok": False}
