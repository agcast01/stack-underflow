from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired
from app.models import db


class UpvoteForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
