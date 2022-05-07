from flask import Flask, request, jsonify
from logic import api_function

app = Flask(__name__)


@app.route("/", methods=["POST", "GET"])
def main():
    file_dict = request.files.to_dict()
    file_dict["File"].save("./afterClean.csv")
    results = api_function()
    results.to_csv("C:/Users/user/Desktop/flask_react_app/frontend/src/results.csv")
    return results.head(15).to_json(orient="records")

@app.route('/plot/<id>',methods=['POST','GET'])
deg get_plot(id):
    