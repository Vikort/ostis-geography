from flask import Flask, request, make_response, jsonify
from flask_cors import CORS

import translator

app = Flask(__name__)
CORS(app)


@app.route('/translate', methods=['POST'])
def translate():
    try:
        results = translator.translate_text(request.data.decode('utf-8'))

        for fname, sctext in results:
            with open(f'translator_server_out\\{fname}', 'w') as f:
                f.write(sctext)

        app.logger.info(f'Successful translation of {len(results)} objects.')

        response = make_response({'Success': True, 'Objects translated': len(results)}, 200)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        app.logger.error(e)
        return make_response({'Success': False, 'Reason': str(e)}, 500)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=2436)
