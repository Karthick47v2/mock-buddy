from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():

    if request.method == 'POST':
        user = request.form['name']
        return redirect(url_for('display_name', name=user))
    return render_template('homepage.html')

@app.route('/<string:name>')
def display_name(name):
    return f'{name}'

# return redirect(url_for(##TYPE FUNCTION NAME WITH ROUTE))

if __name__ == '__main__':
    app.run(debug=True)