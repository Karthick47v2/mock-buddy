from flask import Flask, request, json

app = Flask(__name__)

@app.route('/api')
def index():
    return {
        'message': 'HW'
        }


@app.route('/api/create', methods=['POST'])
def create():
    req_data = json.loads(request.data)
    #todo = Todo(content=req_data['content])

    return {'201': 'Successfully added'}

if __name__ == '__main__':
    app.run(debug=True)