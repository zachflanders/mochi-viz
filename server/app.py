import logging

from flask import Flask, request
import requests

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('mochi')

app = Flask(__name__)

def make_links(cards):
    return [
        {'source': card['id'], 'target': reference}
        for card in cards
        for reference in card['references']
        if reference in [card['id'] for card in cards]
    ]

def get_card_page(api_key, bookmark=None):
    return requests.get("https://app.mochi.cards/api/cards", params={"bookmark":bookmark}, auth=(api_key, None)).json()

@app.route("/api/cards", methods=['POST'])
def get_cards():
    cards = []
    api_key = request.form.get('api_key')  
    response = get_card_page(api_key=api_key)
    cards += response['docs']
    while len(response['docs']) > 0:
        response = get_card_page(api_key, response['bookmark'])
        cards += response['docs']
    links = make_links(cards)
    return {'cards': cards, 'links': links}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
