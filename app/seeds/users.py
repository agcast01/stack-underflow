from app.models import db, User, environment, SCHEMA, Question, Answer
from random import randint

# Adds a demo user, you can add other users here if you want
def seed_users():
    """
    Function to seed all data not just users.
    """
    #User Seed Data
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='Marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='Mobbie', email='bobbie@aa.io', password='password')
    gus = User(
        username="Gus", email='gus@aa.io', password='password')
    dane = User(
        username="Dane", email='dane@aa.io', password='password')
    for i in range(10):
        user = User(
            username=f'user{i + 1}', email=f'user{i}@aa.io', password='password' 
        )
        db.session.add(user)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(gus)
    db.session.add(dane)
    db.session.commit()

    #Question Seed Data
    question1 = Question(
        question='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ipsum ligula, iaculis eu dapibus at, sollicitudin sed nunc. Nulla rutrum ac lectus vitae fringilla. Sed feugiat quis erat ut lacinia. Donec tincidunt vel est vitae consectetur. Proin a odio sit amet erat porta volutpat sit amet at dolor. Praesent varius fermentum nibh eu rutrum. Quisque auctor risus aliquam, vehicula lorem sed, dictum libero. Aliquam vestibulum massa purus, vel tincidunt quam maximus in.?', userId=1, title="Just put giant red text all over this dude's screen"
    )
    question2 = Question(
        question='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ipsum ligula, iaculis eu dapibus at, sollicitudin sed nunc. Nulla rutrum ac lectus vitae fringilla. Sed feugiat quis erat ut lacinia. Donec tincidunt vel est vitae consectetur. Proin a odio sit amet erat porta volutpat sit amet at dolor. Praesent varius fermentum nibh eu rutrum. Quisque auctor risus aliquam, vehicula lorem sed, dictum libero. Aliquam vestibulum massa purus, vel tincidunt quam maximus in.?', userId=2, title=' HELP!! Giant red text all over my screen!'
    )
    question3 = Question(
        question='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ipsum ligula, iaculis eu dapibus at, sollicitudin sed nunc. Nulla rutrum ac lectus vitae fringilla. Sed feugiat quis erat ut lacinia. Donec tincidunt vel est vitae consectetur. Proin a odio sit amet erat porta volutpat sit amet at dolor. Praesent varius fermentum nibh eu rutrum. Quisque auctor risus aliquam, vehicula lorem sed, dictum libero. Aliquam vestibulum massa purus, vel tincidunt quam maximus in.', userId=3, title='Huge Lorem Ipsum fan, unable to read it'
    )
    question4 = Question(
        question='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ipsum ligula, iaculis eu dapibus at, sollicitudin sed nunc. Nulla rutrum ac lectus vitae fringilla. Sed feugiat quis erat ut lacinia. Donec tincidunt vel est vitae consectetur. Proin a odio sit amet erat porta volutpat sit amet at dolor. Praesent varius fermentum nibh eu rutrum. Quisque auctor risus aliquam, vehicula lorem sed, dictum libero. Aliquam vestibulum massa purus, vel tincidunt quam maximus in.', userId=4, title='What does this paragraph mean?'
    )
    question5 = Question(
        question='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ipsum ligula, iaculis eu dapibus at, sollicitudin sed nunc. Nulla rutrum ac lectus vitae fringilla. Sed feugiat quis erat ut lacinia. Donec tincidunt vel est vitae consectetur. Proin a odio sit amet erat porta volutpat sit amet at dolor. Praesent varius fermentum nibh eu rutrum. Quisque auctor risus aliquam, vehicula lorem sed, dictum libero. Aliquam vestibulum massa purus, vel tincidunt quam maximus in.', userId=5, title='How could I make a real bug, like a scorpion, out of computer bugs?'
    )

   

    db.session.add(question1)
    db.session.add(question2)
    db.session.add(question3)
    db.session.add(question4)
    db.session.add(question5)
    for i in range(10):
        question = Question(
            question='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ipsum ligula, iaculis eu dapibus at, sollicitudin sed nunc. Nulla rutrum ac lectus vitae fringilla. Sed feugiat quis erat ut lacinia. Donec tincidunt vel est vitae consectetur. Proin a odio sit amet erat porta volutpat sit amet at dolor. Praesent varius fermentum nibh eu rutrum. Quisque auctor risus aliquam, vehicula lorem sed, dictum libero. Aliquam vestibulum massa purus, vel tincidunt quam maximus in.?', userId=i + 6, title=f'Sample Question #{i + 1}'
        )
        db.session.add(question)
    db.session.commit()

    #Answer Seed Data
    answer1 = Answer(
        answer='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ipsum ligula, iaculis eu dapibus at, sollicitudin sed nunc. Nulla rutrum ac lectus vitae fringilla. Sed feugiat quis erat ut lacinia. Donec tincidunt vel est vitae consectetur. Proin a odio sit amet erat porta volutpat sit amet at dolor. Praesent varius fermentum nibh eu rutrum. Quisque auctor risus aliquam, vehicula lorem sed, dictum libero. Aliquam vestibulum massa purus, vel tincidunt quam maximus in.', questionId=1, userId=2
    )
    demo = User.query.get(1)
    answer1.user_upvotes.append(demo)
    bobbie = User.query.get(3)
    answer1.user_upvotes.append(bobbie)
    answer2 = Answer(
        answer='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ipsum ligula, iaculis eu dapibus at, sollicitudin sed nunc. Nulla rutrum ac lectus vitae fringilla. Sed feugiat quis erat ut lacinia. Donec tincidunt vel est vitae consectetur. Proin a odio sit amet erat porta volutpat sit amet at dolor. Praesent varius fermentum nibh eu rutrum. Quisque auctor risus aliquam, vehicula lorem sed, dictum libero. Aliquam vestibulum massa purus, vel tincidunt quam maximus in.', questionId=2, userId=3
    )
    marnie = User.query.get(2)
    answer2.user_upvotes.append(marnie)
    answer3 = Answer(
        answer='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ipsum ligula, iaculis eu dapibus at, sollicitudin sed nunc. Nulla rutrum ac lectus vitae fringilla. Sed feugiat quis erat ut lacinia. Donec tincidunt vel est vitae consectetur. Proin a odio sit amet erat porta volutpat sit amet at dolor. Praesent varius fermentum nibh eu rutrum. Quisque auctor risus aliquam, vehicula lorem sed, dictum libero. Aliquam vestibulum massa purus, vel tincidunt quam maximus in.', questionId=3, userId=1
    )
    db.session.add(answer1)
    db.session.add(answer2)
    db.session.add(answer3)
    for i in range(15):
        for j in range(3):
            answer = Answer(
                answer='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ipsum ligula, iaculis eu dapibus at, sollicitudin sed nunc. Nulla rutrum ac lectus vitae fringilla. Sed feugiat quis erat ut lacinia. Donec tincidunt vel est vitae consectetur. Proin a odio sit amet erat porta volutpat sit amet at dolor. Praesent varius fermentum nibh eu rutrum. Quisque auctor risus aliquam, vehicula lorem sed, dictum libero. Aliquam vestibulum massa purus, vel tincidunt quam maximus in.', questionId=i + 1, userId=(i + 1 + j if i < 12 else 1 + j)
            )
            db.session.add(answer)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_answer_upvotes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_answer_downvotes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_question_upvotes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_question_downvotes RESTART IDENTITY CASCADE;")


    else:
        db.session.execute("DELETE FROM users")
        db.session.execute("DELETE FROM questions")
        db.session.execute("DELETE FROM answers")
        db.session.execute("DELETE FROM user_answer_upvotes")
        db.session.execute("DELETE FROM user_answer_downvotes")
        db.session.execute("DELETE FROM user_question_upvotes")
        db.session.execute("DELETE FROM user_question_downvotes")




    db.session.commit()
