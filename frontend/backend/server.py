from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/", methods=["POST", "GET"])
def test():
    file_dict = request.files.to_dict()
    file_dict["File"].save("C:/Users/user/Desktop/flask_react_app/frontend/src/uploaded.csv")
    return {"succesfull": "yes"}
