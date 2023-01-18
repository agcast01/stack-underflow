from flask_wtf import FlaskForm
from wtforms import StringField
from app.models import db


class UpdateProfile(FlaskForm):
    location = StringField("Location")
    title = StringField("Title")
    about_me = StringField("About Me")
    website_url = StringField("Website Url")
    twitter_url = StringField("Twitter Url")
    github_url = StringField("Github Url")
