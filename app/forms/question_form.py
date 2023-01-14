from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import db, User, Question


class QuestionForm(FlaskForm):
    question = StringField("Question", validators=[DataRequired()])
    userId = IntegerField("userId", validators=[DataRequired()])
