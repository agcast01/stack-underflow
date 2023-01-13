from app.models import db, User, environment, SCHEMA, Question, Answer

# Adds a demo user, you can add other users here if you want
def seed_users():
    """
    Function to seed all data not just users.
    """
    #User Seed Data
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

    #Question Seed Data
    question1 = Question(
        question='What color is the sky?', userId=1
    )
    question2 = Question(
        question='How bright is the sun?', userId=2
    )
    question3 = Question(
        question='How heavy are clouds?', userId=3
    )

    db.session.add(question1)
    db.session.add(question2)
    db.session.add(question3)
    db.session.commit()

    #Answer Seed Data
    answer1 = Answer(
        answer='Blue', questionId=1, userId=2
    )
    demo = db.query.get(1)
    answer1.user_upvotes.append(demo)
    answer2 = Answer(
        answer='Really bright', questionId=2, userId=3
    )
    answer3 = Answer(
        answer='Heavy', questionId=3, userId=1
    )
    db.session.add(answer1)
    db.session.add(answer2)
    db.session.add(answer3)
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
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()