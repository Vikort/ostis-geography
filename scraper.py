from typing import List
import requests

BASE_URL = "http://overpass-api.de/api/interpreter?data=[out:json];area[name='Беларусь'];node(area)[healthcare];out;"
# BASE_URL = "http://overpass-api.de/api/interpreter?data=[out:json];area[name='Беларусь'];node(area)[amenity=hospital];out;"
# BASE_URL = http://overpass-api.de/api/interpreter?data=[out:json];(area[name='Беларусь'];node(area)[amenity=hospital];area[name='Беларусь'];node(area)[amenity=clinic];);out;


AMENITIES_MAPPER = {
    "healthcare": {
        "hospital": "hospital",
        "dentist": "dentist",
        "clinic": "clinic",
        "doctors": "doctors",
        "baby_health": "baby_health",
        "nursing_home": "nursing_home",
        "pharmacy": "pharmacy",
        "social_facility": "social_facility",
        "veterinary": "veterinary"
    }
}

SUBJECT = "hospital"

def build_query_by_amenities(amenities: List[str]):
    return "".join(
        ["area[name='Беларусь']; node(area)[amenity={}];".format(
            amenity) for amenity in amenities]
        )




requests.get()
