from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr


user_answer_upvotes = db.Table(
    
    "user_answer_upvotes",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        primary_key=True
    ),
    db.Column(
        "answer_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('answers.id')),
        primary_key=True
    ),
    schema = SCHEMA if environment == "production" else ''
)

user_answer_downvotes = db.Table(
    "user_answer_downvotes",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        primary_key=True
    ),
    db.Column(
        "answer_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('answers.id')),
        primary_key=True
    ),
    schema = SCHEMA if environment == "production" else ''
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(40))
    title = db.Column(db.String(40))
    about_me = db.Column(db.String(255))
    website_url = db.Column(db.String(40))
    twitter_url = db.Column(db.String(40))
    github_url = db.Column(db.String(40))
    questions = db.relationship('Question', back_populates='user')
    answers = db.relationship('Answer', back_populates='user')

    answer_upvotes = db.relationship(
        "Answer",
        secondary=user_answer_upvotes,
        back_populates="user_upvotes"
    )

    answer_downvotes = db.relationship(
        "Answer",
        secondary=user_answer_downvotes,
        back_populates="user_downvotes"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'location': self.location,
            'title': self.title,
            'about_me': self.about_me,
            'website_url': self.website_url,
            'twitter_url': self.twitter_url,
            'github_url': self.github_url,
            "answers": [answer.answer for answer in self.answers],
            "answer_upvotes": [answer.id for answer in self.answer_upvotes],
            "answer_downvotes": [answer.id for answer in self.answer_downvotes]
        }


class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship('User', back_populates='questions')
    answers = db.relationship(
        'Answer', back_populates='question', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "question": self.question,
            "userId": self.userId,
            "answers": [answer.to_dict() for answer in self.answers],
            "user": self.user.to_dict(),
            "title": self.title
        }


class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String, nullable=False)
    questionId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('questions.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship('User', back_populates='answers')
    question = db.relationship('Question', back_populates='answers')
    user_upvotes = db.relationship(
        "User",
        secondary=user_answer_upvotes,
        back_populates="answer_upvotes"
    )

    user_downvotes = db.relationship(
        "User",
        secondary=user_answer_downvotes,
        back_populates="answer_downvotes"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "answer": self.answer,
            "questionId": self.questionId,
            "user": self.user.to_dict(),
            "userUpvotes": [user.id for user in self.user_upvotes],
            "userDownvotes": [user.id for user in self.user_downvotes]
        }
