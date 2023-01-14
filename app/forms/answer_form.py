from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import db, Answer


class AnswerForm(FlaskForm):
    answer = StringField("Answer", validators=[DataRequired()])
    userId = IntegerField("userId", validators=[DataRequired()])
    questionId = IntegerField("questionId", validators=[DataRequired()])
