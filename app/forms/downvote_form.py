from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class DownvoteForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
