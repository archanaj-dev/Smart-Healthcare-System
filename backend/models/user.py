from sqlalchemy import Column, Integer, String
from database.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100))
    email = Column(String(100), unique=True)
    phone = Column(String(20))
    dob = Column(String(20))
    gender = Column(String(20))
    password = Column(String(100))

    address = Column(String(255))
    blood_group = Column(String(20))