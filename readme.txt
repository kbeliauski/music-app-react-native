# Rating Music APP w/ React Native by Kiryl Beliauski

Run django in django-music-project folder with :

```fish shell
python3 -m venv my-venv
source my-venv/bin/activate.fish
pip3 install Django
pip3 install djangorestframework
python3 -m pip install djangorestframework-jwt
python3 -m pip install django-cors-headers
python3 manage.py runserver
```
Then, in your browser, go to:

```url
http://127.0.0.1:8000/musicapp/
```

Run React Native in music-rating-app-react-native folder with: 

'''fish shell
npm start
'''
