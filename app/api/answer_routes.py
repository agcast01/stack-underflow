from flask import Blueprint, jsonify, request, redirect
from app.models import Answer, db
from flask_login import current_user
from ..forms import AnswerForm
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages

answer_routes = Blueprint('answers', __name__)


@answer_routes.route('/')
def answers():
    answers = Answer.query.all()
    return {"answers": [answer.to_dict() for answer in answers]}, 200


@answer_routes.route('/<int:id>')
def answer(id):
    answer = Answer.query.get(id)
    return answer.to_dict(), 200


@answer_routes.route('/new', methods=['POST'])
@login_required
def create_answer():
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_answer = Answer()
        form.populate_obj(new_answer)

        db.session.add(new_answer)
        db.session.commit()
        return new_answer.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@answer_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_answer(id):
    answer = Answer.query.get(id)
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        answer.answer = form.data['answer']

        db.session.commit()
        return answer.to_dict(), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@answer_routes.route('/<int:id>', methods=['DELETE'])
def delete_answer(id):
    answer = Answer.query.get(id)

    db.session.delete(answer)
    db.session.commit()
    return 'Successfully deleted'
