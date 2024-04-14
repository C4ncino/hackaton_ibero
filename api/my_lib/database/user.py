from datetime import datetime as dt
from sqlalchemy import Column, Integer, String, TIMESTAMP, Date
from .base import Base


class User(Base):
    """
    User Model
    """

    __tablename__ = 'users'

    Id = Column(Integer(), primary_key=True)
    Name = Column(String(20), nullable=False)
    LastName = Column(String(30), nullable=False)
    BirthDate = Column(Date(), nullable=False)
    UserType = Column(String(1), nullable=False)
    Email = Column(String(40), nullable=False, unique=True)
    Password = Column(String(32), nullable=False)
    PhoneNumber = Column(String(10), nullable=False, default="")
    CreatedDate = Column(TIMESTAMP(), nullable=False, default=dt.now())

    def serialize(self):
        """
        Serialize the data

        Returns:
            dict: The serialized data
        """

        return {
            "Id": self.Id,
            "Name": self.Name,
            "LastName": self.LastName,
            "Email": self.Email,
            "BirthDate": self.BirthDate.strftime('%d-%m-%Y'),
            "UserType": self.UserType,
            "PhoneNumber": self.PhoneNumber,
        }
