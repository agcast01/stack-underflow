from flask import Blueprint, jsonify, request, redirect
from app.models import Question, db
from flask_login import current_user
from ..forms import QuestionForm
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages

question_routes = Blueprint('questions', __name__)


@question_routes.route('/')
def questions():
    questions = Question.query.all()
    return {"questions": [question.to_dict() for question in questions]}, 200


@question_routes.route('/<int:id>')
def question(id):
    question = Question.query.get(id)
    return question.to_dict(), 200


@question_routes.route('/new', methods=['POST'])
@login_required
def create_question():
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_question = Question()
        form.populate_obj(new_question)

        db.session.add(new_question)
        db.session.commit()
        return new_question.to_dict(), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@question_routes.route('/<int:id>', methods=['PUT'])
def edit_question(id):
    question = Question.query.get(id)
    form = QuestionForm()

    if form.validate_on_submit():
        question.question = form.data['question']

        db.session.add(question)
        db.session.commit()
        return question.to_dict(), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@question_routes.route('/<int:id>', methods=['DELETE'])
def delete_question(id):
    question = Question.query.get(id)

    db.session.delete(question)
    db.session.commit()
    return 'Successfully deleted'
