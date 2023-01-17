from flask_wtf import FlaskForm
from wtforms import StringField



class FilterQuestionForm(FlaskForm):
    filter = StringField("Filter")

