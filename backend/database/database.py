import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

print("STEP 1")

DATABASE_URL = os.getenv("DATABASE_URL")

print("STEP 2")

engine = create_engine(DATABASE_URL)

print("STEP 3")

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

print("STEP 4")