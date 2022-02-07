import requests
from bs4 import BeautifulSoup
from lxml import etree
url = "https://www.openstreetmap.org/search?query=" + "Алексеевка" + "%2C" + "Маложинский сельский совет" 
page = requests.get(url)
elements_lst = []
soup = BeautifulSoup(page.text, 'html.parser')
dom = etree.HTML(str(soup))
url_n = dom.xpath('//a[@class="set_position"]/@href')[0]
url_n = "https://www.openstreetmap.org" + url_n
page = requests.get(url_n)
elements_lst = []
soup = BeautifulSoup(page.text, 'html.parser')
dom = etree.HTML(str(soup))
url_n = dom.xpath('//ul//a[@title=""]/@href')
url_n = "https://www.openstreetmap.org" + url_n
age = requests.get(url_n)
elements_lst = []
soup = BeautifulSoup(page.text, 'html.parser')
dom = etree.HTML(str(soup))
longitude = dom.xpath('//span[@class="longitude"]/text()')
latitude = dom.xpath('//span[@class="latitude"]/text()')
return url_n
