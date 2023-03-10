from flask import Blueprint, jsonify, request, redirect
from app.models import Question, db, User
from flask_login import current_user
from ..forms import QuestionForm, FilterQuestionForm, UpvoteForm, DownvoteForm
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages

question_routes = Blueprint('questions', __name__)


@question_routes.route('/', methods=['GET', 'PUT'])
def questions():

    form = FilterQuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        questions = Question.query.all()
        questions = list(filter(lambda question: form.data['filter'].lower() in question.title.lower() ,questions))
        return {"questions": [question.to_dict() for question in questions]}, 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        question.title = form.data['title']
        question.question = form.data['question']
        db.session.commit()
        return question.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@question_routes.route('/<int:id>', methods=['DELETE'])
def delete_question(id):
    question = Question.query.get(id)

    db.session.delete(question)
    db.session.commit()
    return 'Successfully deleted'

@question_routes.route('/<int:id>/upvote', methods=['POST'])
def add_upvote(id):
   question = Question.query.get(id)

   form = UpvoteForm()
   form['csrf_token'].data = request.cookies['csrf_token']
   
   if form.validate_on_submit():
    userId = form.data['userId']
    user = User.query.get(userId)

    question.user_upvotes.append(user)
    db.session.commit()
    
    return question.to_dict(), 201
   return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@question_routes.route('/<int:id>/downvote', methods=['POST'])
def add_downvote(id):
   question = Question.query.get(id)

   form = DownvoteForm()
   form['csrf_token'].data = request.cookies['csrf_token']
  
   if form.validate_on_submit():
    userId = form.data['userId']
    user = User.query.get(userId)

    question.user_downvotes.append(user)
    db.session.commit()
    return question.to_dict(), 201
   print()
   return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@question_routes.route('/<int:id>/upvote', methods=['DELETE'])
def remove_upvote(id):
    question = Question.query.get(id)
    userIds = [user.id for user in question.user_upvotes]

    form = UpvoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        index = userIds.index(form.data['userId'])
        del question.user_upvotes[index]

        db.session.commit()
        return question.to_dict(), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@question_routes.route('/<int:id>/downvote', methods=['DELETE'])
def remove_downvote(id):
    question = Question.query.get(id)
    userIds = [user.id for user in question.user_downvotes]

    form = DownvoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        index = userIds.index(form.data['userId'])
        del question.user_downvotes[index]

        db.session.commit()
        return question .to_dict(), 201
        
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401