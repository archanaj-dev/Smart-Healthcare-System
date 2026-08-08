from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

print("STEP 1")

DATABASE_URL = "mysql+pymysql://root:@127.0.0.1:3306/smart_healthcare"

print("STEP 2")

engine = create_engine(DATABASE_URL)

print("STEP 3")

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

print("STEP 4")